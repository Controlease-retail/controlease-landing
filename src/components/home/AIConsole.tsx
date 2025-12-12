import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useI18n } from '../../i18n';
import { MetricCard } from '../ui/MetricCard';
import { PaperClipIcon, ArrowUpCircleIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';

// --- Types ---

type MessageRole = 'user' | 'assistant';
type WidgetType = 'results-list' | 'rent-analysis' | 'doc-snippet' | 'action-card' | 'occupancy-gauge';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  widget?: WidgetType;
}

type ScenarioStep = 
  | { type: 'user_type'; text: string }
  | { type: 'user_send' }
  | { type: 'ai_think'; duration: number }
  | { type: 'ai_message'; text: string; widget?: WidgetType }
  | { type: 'wait'; duration: number }
  | { type: 'clear' };

// --- Widgets ---

const ResultsListWidget = () => (
  <div className="mt-3 bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 w-full max-w-sm shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Results Found</span>
      <span className="text-sm font-bold text-primary">12 leases</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Location</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Madrid</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-zinc-500">Expiring</span>
        <span className="font-medium text-zinc-900 dark:text-zinc-100">Q4 2024</span>
      </div>
    </div>
  </div>
);

const RentAnalysisWidget = () => (
  <div className="mt-3 w-full max-w-sm">
    <div className="flex gap-3 mb-3">
      <MetricCard label="Avg Rent" value="€45.20" trend="+5.2%" trendUp={true} className="flex-1 bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm" />
      <MetricCard label="Vs Market" value="+12%" trend="-2.1%" trendUp={false} className="flex-1 bg-white dark:bg-zinc-800 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-sm" />
    </div>
    <div className="h-24 flex items-end justify-between gap-2 px-2 pt-4 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 p-4">
      {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
        <div key={i} className="w-full bg-primary/10 rounded-t-sm relative group h-full flex items-end">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full bg-primary rounded-t-sm"
          />
        </div>
      ))}
    </div>
  </div>
);

const DocSnippetWidget = () => (
  <div className="mt-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 font-mono text-xs relative overflow-hidden group shadow-sm">
    <div className="absolute top-0 right-0 p-1 bg-zinc-100 dark:bg-zinc-900 border-b border-l border-zinc-200 dark:border-zinc-700 rounded-bl text-[10px] text-zinc-500">
      LEASE-MAD-001
    </div>
    <div className="opacity-50 text-zinc-500 mb-2">...Section 14.2 Termination</div>
    <div className="bg-yellow-500/10 -mx-2 px-2 py-1 rounded border-l-2 border-yellow-500 text-zinc-800 dark:text-zinc-200 leading-relaxed">
      The Tenant must provide written notice of non-renewal at least <span className="font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">6 months prior</span> to the Renewal Date.
    </div>
    <div className="opacity-50 text-zinc-500 mt-2">Failure to provide such notice...</div>
  </div>
);

const ActionCardWidget = () => (
  <div className="mt-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </div>
      <div>
        <div className="font-medium text-zinc-900 dark:text-zinc-100">Team Management</div>
        <div className="text-zinc-500 text-xs mt-0.5">Invite users & assign roles</div>
      </div>
    </div>
    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</div>
  </div>
);

const OccupancyGaugeWidget = () => (
  <div className="mt-3 bg-white dark:bg-zinc-800 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700 w-full max-w-sm flex items-center gap-5 shadow-sm">
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path className="text-zinc-100 dark:text-zinc-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
        <motion.path 
          className="text-success" 
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 0.94 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          strokeDasharray="100, 100"
          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="4" 
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-zinc-900 dark:text-zinc-100">
        94%
      </div>
    </div>
    <div>
      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">Portfolio Occupancy</div>
      <div className="text-xs text-success font-medium flex items-center gap-1 mt-1">
        <span>↑</span> 2% vs last quarter
      </div>
      <div className="text-xs text-zinc-400 mt-1">382 / 405 Units Leased</div>
    </div>
  </div>
);

// --- Main Component ---

export const AIConsole = () => {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRentInquiryTab, setShowRentInquiryTab] = useState(true); // New state for Rent Inquiry tab visibility
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const hasRunRef = useRef(false);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, inputValue]);

  useEffect(() => {
    isMountedRef.current = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const runScenario = async () => {
      if (hasRunRef.current) return; // Prevent re-running if already completed
      hasRunRef.current = true; // Mark as run

      let lastTypedText = '';
      const scenario: ScenarioStep[] = [
        { type: 'wait', duration: 1000 },
        // 1. Filtering
        { type: 'user_type', text: t('landing.architecture.aiAssistant.userPrompt') || "Show me all leases expiring in Q4 2024 in Madrid." },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1500 },
        { type: 'ai_message', text: "Scanning portfolio...", widget: 'results-list' },
        { type: 'wait', duration: 3000 },
        
        // 2. Report Generation
        { type: 'user_type', text: "Generate a rent analysis report." },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1800 },
        { type: 'ai_message', text: "Here is the rent analysis for Q3 vs Q4.", widget: 'rent-analysis' },
        { type: 'wait', duration: 3500 },

        // 3. Talk with your lease
        { type: 'user_type', text: "What is the notice period for the flagship store?" },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1200 },
        { type: 'ai_message', text: "Scanning contract LEASE-MAD-001...", widget: 'doc-snippet' },
        { type: 'ai_message', text: "The notice period is 6 months prior to the renewal date." },
        { type: 'wait', duration: 3000 },

        // 4. General Questions
        { type: 'user_type', text: "How do I invite a new property manager?" },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1000 },
        { type: 'ai_message', text: "You can manage team access in Settings. Here's a direct link.", widget: 'action-card' },
        { type: 'wait', duration: 2500 },

        // 5. Platform Knowledge
        { type: 'user_type', text: "What's our current portfolio occupancy?" },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1000 },
        { type: 'ai_message', text: "Current portfolio occupancy is healthy at 94%.", widget: 'occupancy-gauge' },
        { type: 'wait', duration: 3000 },

        // 6. Conclusion
        { type: 'ai_message', text: "And much more! I'm the growing heart of your OS." },
        { type: 'wait', duration: 5000 },
      ];

      // Infinite Loop
      // while (isMountedRef.current) {
        for (const step of scenario) {
          if (!isMountedRef.current) break;

          switch (step.type) {
            case 'wait':
              await new Promise(r => setTimeout(r, step.duration));
              break;
            case 'user_type':
              lastTypedText = step.text;
              // Simulate typing character by character
              for (let i = 0; i <= step.text.length; i++) {
                if (!isMountedRef.current) break;
                setInputValue(step.text.slice(0, i));
                await new Promise(r => setTimeout(r, 30 + Math.random() * 20)); // Faster, more natural typing
              }
              await new Promise(r => setTimeout(r, 400));
              break;
            case 'user_send':
              setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role: 'user', content: lastTypedText }]); 
              setInputValue('');
              break;
            case 'ai_think':
              setIsTyping(true);
              await new Promise(r => setTimeout(r, step.duration));
              setIsTyping(false);
              break;
            case 'ai_message':
              setMessages(prev => [...prev, { 
                id: `${Date.now()}-${Math.random()}`, 
                role: 'assistant', 
                content: step.text,
                widget: step.widget 
              }]);
              await new Promise(r => setTimeout(r, 800)); // Small pause between multiple AI messages
              break;
            case 'clear':
              setMessages([]);
              break;
          }
        }
      // }
    };

    runScenario();

    return () => {
      isMountedRef.current = false;
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []); // Changed dependency from [t] to []

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-0">
      <div className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-2xl h-[650px] flex flex-col">
        
        {/* Header */}
        <div className="p-2 border-b border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-between z-10">
          <div className="flex flex-nowrap overflow-x-auto custom-scrollbar">
            {/* Active Chat Tab */}
            <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm font-medium border border-primary/20 mr-2 flex-shrink-0">
              <span>Lease Analysis</span>
              <XMarkIcon 
                className="w-4 h-4 cursor-pointer hover:text-primary-dark transition-colors"
                onClick={() => {
                  setMessages([]);
                  hasRunRef.current = false; // Reset the scenario so it can run again
                  console.log('Closed Lease Analysis chat');
                }}
              />
            </div>

            {/* Inactive Chat Tab */}
            {showRentInquiryTab && (
              <motion.div
                initial={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 mr-2 flex-shrink-0"
              >
                <span>Rent Inquiry</span>
                <XMarkIcon 
                  className="w-4 h-4 cursor-pointer hover:text-zinc-500 transition-colors"
                  onClick={() => {
                    setShowRentInquiryTab(false);
                    console.log('Closed Rent Inquiry chat');
                  }}
                />
              </motion.div>
            )}

            {/* New Chat Button */}
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg text-sm font-medium border border-zinc-200 dark:border-zinc-700 cursor-not-allowed opacity-70 flex-shrink-0">
              <PlusIcon className="w-4 h-4" />
              <span>New Chat</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth bg-zinc-50/50 dark:bg-black/20"
        >
          {messages.length === 0 && !isTyping && (
             <div className="h-full flex flex-col items-center justify-center opacity-30 select-none">
                <div className="w-16 h-16 rounded-2xl bg-zinc-200 dark:bg-zinc-800 mb-4 animate-pulse" />
                <div className="w-48 h-4 rounded bg-zinc-200 dark:bg-zinc-800 mb-2 animate-pulse" />
                <div className="w-32 h-4 rounded bg-zinc-200 dark:bg-zinc-800 animate-pulse" />
             </div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                layout
                className={cn(
                  "flex gap-4 max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* Avatar */}
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-1 shadow-sm",
                  msg.role === 'user' 
                    ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    : "bg-primary/10 text-primary border border-primary/20"
                )}>
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user'
                      ? "bg-primary text-white rounded-tr-sm"
                      : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 rounded-tl-sm"
                  )}>
                    {msg.content}
                  </div>
                  
                  {/* Rich Widget */}
                  {msg.widget && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {msg.widget === 'results-list' && <ResultsListWidget />}
                      {msg.widget === 'rent-analysis' && <RentAnalysisWidget />}
                      {msg.widget === 'doc-snippet' && <DocSnippetWidget />}
                      {msg.widget === 'action-card' && <ActionCardWidget />}
                      {msg.widget === 'occupancy-gauge' && <OccupancyGaugeWidget />}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9 }}
               className="flex gap-4 max-w-[80%]"
             >
               <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs flex-shrink-0 border border-primary/20 mt-1">AI</div>
               <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[46px]">
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-primary/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
               </div>
             </motion.div>
          )}

          {/* Spacer for bottom */}
          <div className="h-4" /> 
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
          <div className="relative flex items-end gap-2 p-2 bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-200 dark:border-zinc-800 rounded-xl focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-inner">
            <div className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors cursor-not-allowed">
              <PaperClipIcon className="w-5 h-5" />
            </div>
            
            <input 
              type="text" 
              readOnly
              value={inputValue}
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none py-2 text-sm focus:outline-none text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
            />
            
            <div className={cn(
              "p-2 rounded-lg transition-all duration-300",
              inputValue.length > 0 ? "bg-primary text-white" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
            )}>
              <ArrowUpCircleIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
