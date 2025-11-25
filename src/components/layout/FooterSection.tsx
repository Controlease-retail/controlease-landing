import { NavLink } from 'react-router-dom';
import { useI18n } from '../../i18n';

export const FooterSection = () => {
  const { dictionary } = useI18n();
  const footer = dictionary.landing.footer;

  return (
    <footer className="border-t border-[color:var(--color-border)] bg-[var(--color-bg-alt)] px-6 py-16 text-sm transition-colors">
      <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
         <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 font-bold text-text text-lg tracking-tight mb-4">
              <img src="/main_logo.svg" alt={footer.brand} className="h-7 w-auto" />
              {footer.brand}
            </div>
            <p className="text-text-muted leading-relaxed">
               {footer.summary}
            </p>
         </div>
         
         {footer.columns.map((column) => (
           <div key={column.title}>
             <h4 className="font-semibold text-[color:var(--color-text)] mb-4">{column.title}</h4>
             <ul className="space-y-2 text-text-muted">
               {column.links.map((link) => (
                 <li key={link.label}>
                   {'to' in link ? (
                     <NavLink to={link.to} className="hover:text-primary transition-colors">
                       {link.label}
                     </NavLink>
                   ) : (
                     <a href={link.href} className="hover:text-primary transition-colors">
                       {link.label}
                     </a>
                   )}
                 </li>
               ))}
             </ul>
           </div>
         ))}
      </div>
      
      <div className="mx-auto max-w-6xl border-t border-[color:var(--color-border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-muted">
         <p>{footer.rights}</p>
         <div className="flex gap-6">
            {footer.legal.map((link: any) => (
              'to' in link ? (
                <NavLink key={link.label} to={link.to} className="hover:text-[color:var(--color-text)]">
                  {link.label}
                </NavLink>
              ) : (
                <a key={link.label} href={link.href} className="hover:text-[color:var(--color-text)]">
                  {link.label}
                </a>
              )
            ))}
         </div>
      </div>
    </footer>
  );
};
