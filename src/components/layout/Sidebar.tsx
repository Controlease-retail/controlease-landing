import React from 'react';
import { cn } from '../../utils/cn';
import { HomeIcon, DocumentTextIcon, BookOpenIcon, CloudArrowUpIcon, UserIcon, BellIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

export const Sidebar = () => {
  return (
    <div className={cn(
      "w-16 flex-shrink-0 flex flex-col items-center justify-between py-6 rounded-xl overflow-hidden shadow-2xl mx-3 my-3",
      "bg-[#1A1625] text-white"
    )}>
      <div className="flex flex-col items-center w-full">
        {/* Logo */}
        <div className="mb-10 mt-2">
          <img src="/main_logo.svg" alt="Corbital Tech Logo" className="h-8 w-auto" />
        </div>

        {/* Main Nav Items */}
        <nav className="w-full flex flex-col items-center">
          <SidebarItem icon={<HomeIcon className="h-6 w-6" />} label="Home" />
          <SidebarItem icon={<DocumentTextIcon className="h-6 w-6" />} label="Leases" active />
          <SidebarItem icon={<BookOpenIcon className="h-6 w-6" />} label="Contracts" />
          <SidebarItem icon={<CloudArrowUpIcon className="h-6 w-6" />} label="Upload" />
        </nav>
      </div>

      {/* Bottom Nav Items */}
      <div className="flex flex-col items-center w-full">
        <div className="text-center mb-2">
          <p className="text-[9px] font-bold text-white tracking-wider">YOUR<br/>SCOPE</p>
          <span className="inline-block px-2 py-0.5 mt-1.5 text-[8px] font-bold rounded-full bg-[#4c3a69] text-[#e0d4f5] leading-none">Superuser</span>
        </div>
        
        <SidebarItem icon={<BriefcaseIcon className="h-6 w-6" />} label="Assets" />
        
        <div className="relative">
          <SidebarItem icon={<BellIcon className="h-6 w-6" />} label="Alerts" />
          <div className="absolute top-0.5 right-0.5 w-4 h-4 bg-[#FF4444] rounded-full text-[8px] flex items-center justify-center font-bold border-2 border-[#1A1625] text-white">
            2
          </div>
        </div>
        
        <SidebarItem icon={<UserIcon className="h-6 w-6" />} label="Profile" />
      </div>
    </div>
  );
};

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, active }: SidebarItemProps) => {
  return (
    <button 
      className={cn(
        "relative flex flex-col items-center justify-center w-12 h-12 rounded-xl group transition-all duration-200",
        active
          ? "text-[#FF4444]"
          : "text-white/70 hover:text-white"
      )}
      aria-label={label}
    >
      {/* Icon */}
      <div className={cn("transition-transform duration-200", active && "scale-110")}>
        {icon}
      </div>
      
      {/* Label (Tooltip style on hover) */}
      <span className={cn(
        "absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none",
        active ? "text-[#FF4444]" : "text-white"
      )}>
        {label}
      </span>
    </button>
  );
};
