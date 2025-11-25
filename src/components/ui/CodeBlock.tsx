// import React from 'react';
import { cn } from '../../utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, className }) => {
  // Simple syntax highlighting simulator for JSON-like structures
  const highlight = (text: string) => {
    return text.split('\n').map((line, i) => {
      // Keys (e.g., "key":)
      const keyMatch = line.match(/^(\s*"[^"]+":)/);
      // Values (strings, numbers, booleans)
      const valuePart = line.replace(/^(\s*"[^"]+":)/, '');
      
      return (
        <div key={i} className="leading-relaxed">
          {keyMatch && <span className="text-[color:var(--color-text)]">{keyMatch[0]}</span>}
          {valuePart && (
            <span className={cn(
              valuePart.includes('"') ? 'text-primary' : 
              valuePart.includes('true') || valuePart.includes('false') ? 'text-accent' :
              !isNaN(Number(valuePart.trim().replace(',', ''))) ? 'text-primary' : 'text-[color:var(--color-text-muted)]'
            )}>
              {valuePart}
            </span>
          )}
          {!keyMatch && <span className="text-[color:var(--color-text-muted)]">{line}</span>}
        </div>
      );
    });
  };

  return (
    <div className={cn("font-mono text-xs sm:text-sm bg-[color:var(--color-bg)] p-4 rounded-lg border border-[color:var(--color-border)] overflow-x-auto group", className)}>
      <div className="flex flex-col">
        {highlight(code)}
        <span className="inline-block w-2 h-4 bg-primary opacity-0 group-hover:opacity-100 animate-pulse mt-1" />
      </div>
    </div>
  );
};
