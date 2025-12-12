import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftRightIcon, XMarkIcon, ChevronDownIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { DocumentTextIcon, ChartBarIcon, EyeIcon } from '@heroicons/react/24/solid';
import { cn } from '../../utils/cn';
import { LeaseFormSkeleton } from './LeaseFormSkeleton';
import { Sidebar } from '../layout/Sidebar';
import { StatusBadge } from '../ui/StatusBadge';
import { AlertBox } from '../ui/AlertBox';
import { Tabs } from '../ui/Tabs';

export const InteractiveLeaseOverview = () => {
  const [activeSidebar, setActiveSidebar] = useState<'projection' | 'pdf' | null>(null);
  const [showTextExtraction, setShowTextExtraction] = useState(false);
  const [activeProjectionTab, setActiveProjectionTab] = useState<'overview' | 'financials' | 'trends' | 'projections'>('overview');

  const toggleSidebar = (sidebar: 'projection' | 'pdf') => {
    setActiveSidebar(prev => prev === sidebar ? null : sidebar);
  };

  const closeSidebar = () => setActiveSidebar(null);

  const toggleTextExtraction = () => {
    setShowTextExtraction(prev => !prev);
  };

  return (
    <section className="py-32 px-6 relative bg-[color:var(--color-bg)]">
      <div className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-bold text-[color:var(--color-text)] tracking-tight">Interactive Lease Overview</h2>
        <p className="text-xl text-[color:var(--color-text-muted)]">This section provides a dynamic representation of your lease, offering powerful interactions and detailed insights into your contract.</p>
      </div>
      <div className="max-w-7xl mx-auto flex shadow-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] relative">
        {/* Mocked Sidebar */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 p-6 pr-16 relative">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-[color:var(--color-text)]">Retail Store A</h3>
              <StatusBadge status="lapsed">Lapsed</StatusBadge>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-md text-sm font-medium hover:bg-accent-dark transition-colors">
              View Renewal <span className="ml-2">→</span>
            </button>
          </div>
          
          <AlertBox />
          <Tabs />
          <div className="absolute bottom-6 right-6 flex flex-col gap-3 z-40">
            {/* Lease Projection Bubble (Priority 3 - Top) */}
            <button 
              className={cn(
                "relative w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-transform hover:scale-110",
                activeSidebar === 'projection' && "ring-2 ring-white ring-offset-2 ring-offset-accent"
              )} 
              title="View Lease Projections"
              onClick={() => toggleSidebar('projection')}
            >
              <ChartBarIcon className="h-5 w-5" />
              <EyeIcon className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-white p-0.5 text-accent" />
            </button>

            {/* PDF Viewer Bubble (Priority 2 - Middle) */}
            <button 
              className={cn(
                "relative w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-transform hover:scale-110",
                activeSidebar === 'pdf' && "ring-2 ring-white ring-offset-2 ring-offset-accent"
              )} 
              title="View Contract"
              onClick={() => toggleSidebar('pdf')}
            >
              <DocumentTextIcon className="h-5 w-5" />
              <EyeIcon className="absolute bottom-2 right-2 h-3.5 w-3.5 rounded-full bg-white p-0.5 text-accent" />
            </button>

            {/* ChatBot Bubble (Priority 1 - Bottom) */}
            <button className={cn(
              "w-12 h-12 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:bg-accent-dark transition-colors"
            )} title="Chat Assistant">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
            </button>
          </div>
          
          <LeaseFormSkeleton />

          {/* Simulated Sidebars Overlay */}
          <AnimatePresence>
            {activeSidebar && (
              <motion.div 
                key="sidebar-overlay"
                className="absolute inset-0 z-40 flex justify-end p-6"
              >
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="absolute inset-0 bg-black/20 backdrop-blur-sm" 
                  onClick={closeSidebar}
                />
                
                {/* Sidebar Content */}
                <motion.div
                  key="sidebar-content"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
                  className={cn(
                    "relative w-[550px] h-full bg-[color:var(--color-surface)] border-[color:var(--color-border)] shadow-2xl flex flex-col rounded-xl"
                  )}
                >
                  {/* Sidebar Header */}
                  <div className="flex flex-col items-center justify-between p-4 border-b border-[color:var(--color-border)] rounded-t-xl">
                    {activeSidebar === 'projection' ? (
                      <div className="flex flex-col w-full">
                        <div className="flex justify-between w-full mb-4">
                          <h3 className="text-lg font-semibold text-[color:var(--color-text)]">Lease Projections</h3>
                          <button 
                            onClick={closeSidebar}
                            className="p-1 rounded-full hover:bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                        <div className="flex border-b border-[color:var(--color-border)]">
                          <button 
                            onClick={() => setActiveProjectionTab('overview')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'overview'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            Overview
                          </button>
                          <button 
                            onClick={() => setActiveProjectionTab('financials')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'financials'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            Financials
                          </button>
                          <button 
                            onClick={() => setActiveProjectionTab('trends')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'trends'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            Trends
                          </button>
                          <button 
                            onClick={() => setActiveProjectionTab('projections')}
                            className={cn(
                              "px-4 py-2 text-sm font-medium transition-colors",
                              activeProjectionTab === 'projections'
                                ? "text-accent border-b-2 border-accent"
                                : "text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)]"
                            )}
                          >
                            Projections
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col w-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="relative">
                            <select className="pr-8 appearance-none bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 pl-3 text-sm font-medium text-[color:var(--color-text)]">
                              <option>Contract Document</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[color:var(--color-text-muted)]">
                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </div>
                          <div className="relative">
                            <select className="pr-8 appearance-none bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 pl-3 text-sm font-medium text-[color:var(--color-text)]">
                              <option>Locate Information</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[color:var(--color-text-muted)]">
                              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input type="text" value="1 / 203" readOnly className="w-20 text-center bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md py-2 text-sm font-medium text-[color:var(--color-text)]" />
                            <button className="p-2 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"><MinusIcon className="h-4 w-4" /></button>
                            <button className="p-2 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-md text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"><PlusIcon className="h-4 w-4" /></button>
                            <div className="relative">
                              <button
                                onClick={toggleTextExtraction}
                                className={cn(
                                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                  showTextExtraction
                                    ? "bg-accent text-white hover:bg-accent-dark"
                                    : "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-bg-alt)]"
                                )}
                              >
                                Format
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={closeSidebar}
                            className="p-1 rounded-full hover:bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] transition-colors"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar Body */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[color:var(--color-bg-alt)] rounded-b-xl">
                    {activeSidebar === 'projection' ? (
                      <div className="space-y-4">
                        {activeProjectionTab === 'overview' && (
                          <>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">Projected Rent (5Y)</h4>
                              <div className="h-40 flex items-end justify-between gap-2 px-2">
                                {[40, 55, 45, 70, 65].map((h, i) => (
                                  <div key={i} className="w-full bg-primary/20 hover:bg-primary/30 rounded-t-sm transition-colors relative group">
                                    <div style={{ height: `${h}%` }} className="absolute bottom-0 w-full bg-primary rounded-t-sm"></div>
                                  </div>
                                ))}
                              </div>
                              <div className="flex justify-between mt-2 text-xs text-[color:var(--color-text-muted)]">
                                <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span>
                              </div>
                            </div>
                            <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                              <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-2">Key Metrics</h4>
                              <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">CAGR</span>
                                  <span className="font-mono text-sm font-bold text-success">+4.2%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm">Total Value</span>
                                  <span className="font-mono text-sm font-bold text-[color:var(--color-text)]">€1.2M</span>
                                </div>
                              </div>
                            </div>
                          </>
                        )}

                        {activeProjectionTab === 'financials' && (
                          <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                            <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">Financial Overview (Annual)</h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-sm text-[color:var(--color-text)]">
                                <thead>
                                  <tr className="border-b border-[color:var(--color-border)]">
                                    <th className="py-2 pr-2">Year</th>
                                    <th className="py-2 pr-2">Income</th>
                                    <th className="py-2 pr-2">Expenses</th>
                                    <th className="py-2 pr-2">NOI</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-b border-[color:var(--color-border)]">
                                    <td className="py-2 pr-2">2024</td>
                                    <td className="py-2 pr-2">€54,000</td>
                                    <td className="py-2 pr-2">€12,000</td>
                                    <td className="py-2 pr-2 font-bold text-success">€42,000</td>
                                  </tr>
                                  <tr className="border-b border-[color:var(--color-border)]">
                                    <td className="py-2 pr-2">2025</td>
                                    <td className="py-2 pr-2">€56,200</td>
                                    <td className="py-2 pr-2">€12,500</td>
                                    <td className="py-2 pr-2 font-bold text-success">€43,700</td>
                                  </tr>
                                  <tr>
                                    <td className="py-2 pr-2">2026</td>
                                    <td className="py-2 pr-2">€58,500</td>
                                    <td className="py-2 pr-2">€13,000</td>
                                    <td className="py-2 pr-2 font-bold text-success">€45,500</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}

                        {activeProjectionTab === 'trends' && (
                          <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                            <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">Rent Growth Trend</h4>
                            <div className="h-40 relative">
                              {/* Simple Line Chart Mock */}
                              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <polyline fill="none" stroke="var(--color-primary)" strokeWidth="1" points="0,80 25,60 50,75 75,50 100,65" />
                                <circle cx="0" cy="80" r="2" fill="var(--color-primary)" />
                                <circle cx="25" cy="60" r="2" fill="var(--color-primary)" />
                                <circle cx="50" cy="75" r="2" fill="var(--color-primary)" />
                                <circle cx="75" cy="50" r="2" fill="var(--color-primary)" />
                                <circle cx="100" cy="65" r="2" fill="var(--color-primary)" />
                              </svg>
                              <div className="flex justify-between text-xs text-[color:var(--color-text-muted)] mt-2">
                                <span>2024</span><span>2025</span><span>2026</span><span>2027</span><span>2028</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {activeProjectionTab === 'projections' && (
                          <div className="bg-[color:var(--color-surface)] p-4 rounded-lg shadow-sm border border-[color:var(--color-border)]">
                            <h4 className="text-sm font-medium text-[color:var(--color-text-muted)] mb-3">Long-Term Projections</h4>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Projected Value (10Y)</span>
                                <span className="font-mono text-sm font-bold text-[color:var(--color-text)]">€1.8M</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Capitalization Rate</span>
                                <span className="font-mono text-sm font-bold text-[color:var(--color-text)]">6.5%</span>
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm">Vacancy Rate</span>
                                <span className="font-mono text-sm font-bold text-[color:var(--color-text)]">3.0%</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="h-full flex flex-col gap-4 relative">
                        <div className="bg-white p-8 shadow-sm min-h-[500px] text-gray-800 text-xs font-mono border border-gray-200 relative">
                          <div className="flex justify-between mb-8 border-b pb-4">
                            <h1 className="text-xl font-serif font-bold">CONTRACT TITLE</h1>
                            <span className="text-gray-500">Ref: [Contract Ref]</span>
                          </div>
                          <p className="mb-4"><strong>PARTIES:</strong></p>
                          <p className="mb-4">This Document (the "Agreement") is entered into as of [Start Date], by and between:</p>
                          <p className="mb-4 pl-4">LANDLORD: [Landlord Name]<br/>TENANT: [Tenant Name]</p>
                          <p className="mb-4"><strong>PREMISES:</strong></p>
                          <p className="mb-4">The Landlord leases to the Tenant the premises located at [Property Address] (the "Premises").</p>
                          <p className="mb-4"><strong>TERM:</strong></p>
                          <p className="mb-4">The initial term of this Agreement shall be for a period of [Term Length] years, commencing on [Start Date] and ending on [End Date].</p>
                          <p className="mb-4"><strong>RENT:</strong></p>
                          <p className="mb-4">The Tenant agrees to pay base rent in the amount of [Rent Amount] per month...</p>
                          <div className="mt-8 pt-4 border-t border-dashed border-gray-300">
                            <p className="italic text-center text-gray-400">--- End of Preview ---</p>
                          </div>

                          {showTextExtraction && (
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-8 text-gray-800 text-xs font-mono overflow-y-auto">
                              <h2 className="text-lg font-bold mb-4">Extracted Raw Text:</h2>
                              <pre className="block whitespace-pre-wrap text-sm leading-relaxed">
CONTRACT TITLE
Ref: [Contract Ref]

PARTIES:
This Document (the "Agreement") is entered into as of [Start Date], by and between:
LANDLORD: [Landlord Name]
TENANT: [Tenant Name]

PREMISES:
The Landlord leases to the Tenant the premises located at [Property Address] (the "Premises").

TERM:
The initial term of this Agreement shall be for a period of [Term Length] years, commencing on [Start Date] and ending on [End Date].

RENT:
The Tenant agrees to pay base rent in the amount of [Rent Amount] per month...
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
