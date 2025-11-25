import { Outlet } from 'react-router-dom';
import { CommandBar } from '../components/layout/CommandBar';
import { FooterSection } from '../components/layout/FooterSection';

export const RootLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[color:var(--color-text)] overflow-x-hidden transition-colors">
      {/* Global noise overlay */}
      <div className="noise-overlay" />
      
      <CommandBar />
      
      <Outlet />
      
      <FooterSection />
    </div>
  );
};
