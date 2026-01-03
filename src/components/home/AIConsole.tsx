import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '../../utils/cn';
import { MetricCard } from '../ui/MetricCard';
import { PaperClipIcon, ArrowUpCircleIcon, XMarkIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useI18n } from '../../i18n';

// --- Types ---

type MessageRole = 'user' | 'assistant';
type WidgetType = 'results-list' | 'rent-analysis' | 'doc-snippet' | 'action-card' | 'occupancy-gauge' | 'expiration-timeline' | 'alert-card' | 'scenario-chart' | 'extraction-preview';

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
  <div className="mt-3 bg-[color:var(--color-surface)] rounded-xl p-3 sm:p-4 border border-[color:var(--color-border)] w-full sm:max-w-sm shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">Results Found</span>
      <span className="text-sm font-bold text-accent">12 leases</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[color:var(--color-text-muted)]">Location</span>
        <span className="font-medium text-[color:var(--color-text)]">Madrid</span>
      </div>
      <div className="flex justify-between text-sm">
        <span className="text-[color:var(--color-text-muted)]">Expiring</span>
        <span className="font-medium text-[color:var(--color-text)]">Q4 2024</span>
      </div>
    </div>
  </div>
);

const RentAnalysisWidget = () => (
  <div className="mt-3 w-full sm:max-w-sm">
    <div className="flex gap-3 mb-3">
      <MetricCard label="Avg Rent" value="€45.20" trend="+5.2%" trendUp={true} className="flex-1 bg-[color:var(--color-surface)] p-3 rounded-xl border border-[color:var(--color-border)] shadow-sm" />
      <MetricCard label="Vs Market" value="+12%" trend="-2.1%" trendUp={false} className="flex-1 bg-[color:var(--color-surface)] p-3 rounded-xl border border-[color:var(--color-border)] shadow-sm" />
    </div>
    <div className="h-24 flex items-end justify-between gap-2 px-2 pt-4 bg-[color:var(--color-surface)] rounded-xl border border-[color:var(--color-border)] p-4">
      {[40, 65, 45, 80, 55, 70, 60].map((h, i) => (
        <div key={i} className="w-full bg-accent/10 rounded-t-sm relative group h-full flex items-end">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="w-full bg-accent rounded-t-sm"
          />
        </div>
      ))}
    </div>
  </div>
);

const DocSnippetWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl p-4 font-mono text-xs relative overflow-hidden group shadow-sm">
    <div className="absolute top-0 right-0 p-1 bg-[color:var(--color-bg-alt)] border-b border-l border-[color:var(--color-border)] rounded-bl text-[10px] text-[color:var(--color-text-muted)]">
      LEASE-MAD-001
    </div>
    <div className="opacity-50 text-[color:var(--color-text-muted)] mb-2">...Section 14.2 Termination</div>
    <div className="bg-yellow-500/10 -mx-2 px-2 py-1 rounded border-l-2 border-yellow-500 text-[color:var(--color-text)] leading-relaxed">
      The Tenant must provide written notice of non-renewal at least <span className="font-bold text-yellow-600 dark:text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded">6 months prior</span> to the Renewal Date.
    </div>
    <div className="opacity-50 text-[color:var(--color-text-muted)] mt-2">Failure to provide such notice...</div>
  </div>
);

const ActionCardWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-xl p-4 flex items-center justify-between group cursor-pointer hover:border-accent/50 hover:shadow-md transition-all">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
      </div>
      <div>
        <div className="font-medium text-[color:var(--color-text)]">Team Management</div>
        <div className="text-[color:var(--color-text-muted)] text-xs mt-0.5">Invite users & assign roles</div>
      </div>
    </div>
    <div className="text-accent opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0 duration-300">→</div>
  </div>
);

const OccupancyGaugeWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] rounded-xl p-3 sm:p-4 border border-[color:var(--color-border)] w-full sm:max-w-sm flex items-center gap-3 sm:gap-5 shadow-sm">
    <div className="relative w-16 h-16 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
        <path className="text-[color:var(--color-border)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
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
      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-[color:var(--color-text)]">
        94%
      </div>
    </div>
    <div>
      <div className="text-sm font-bold text-[color:var(--color-text)]">Portfolio Occupancy</div>
      <div className="text-xs text-success font-medium flex items-center gap-1 mt-1">
        <span>↑</span> 2% vs last quarter
      </div>
      <div className="text-xs text-[color:var(--color-text-muted)] mt-1">382 / 405 Units Leased</div>
    </div>
  </div>
);

const ExpirationTimelineWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] rounded-xl p-3 sm:p-4 border border-[color:var(--color-border)] w-full sm:max-w-md shadow-sm">
    <div className="flex items-center justify-between mb-3">
      <span className="text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">Expiration Timeline</span>
      <span className="text-xs text-[color:var(--color-text-muted)]">Next 12 months</span>
    </div>
    <div className="space-y-2">
      {[
        { quarter: 'Q1 2025', count: 8, color: 'bg-emerald-500', width: '30%' },
        { quarter: 'Q2 2025', count: 15, color: 'bg-amber-500', width: '55%' },
        { quarter: 'Q3 2025', count: 23, color: 'bg-red-500', width: '85%' },
        { quarter: 'Q4 2025', count: 12, color: 'bg-accent', width: '45%' },
      ].map((item, i) => (
        <motion.div
          key={item.quarter}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="text-xs text-[color:var(--color-text-muted)] w-16">{item.quarter}</span>
          <div className="flex-1 h-5 bg-[color:var(--color-bg-alt)] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: item.width }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`h-full ${item.color} rounded-full`}
            />
          </div>
          <span className="text-xs font-medium text-[color:var(--color-text)] w-8">{item.count}</span>
        </motion.div>
      ))}
    </div>
  </div>
);

const AlertCardWidget = () => (
  <div className="mt-3 space-y-2 w-full sm:max-w-sm">
    {[
      { type: 'urgent', title: 'Break Option', desc: 'Store #142 Madrid - 15 days left', icon: '⚠️' },
      { type: 'warning', title: 'Renewal Due', desc: 'Store #089 Barcelona - 30 days', icon: '📅' },
      { type: 'info', title: 'Rent Review', desc: 'IPC adjustment pending - 3 leases', icon: '📊' },
    ].map((alert, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.15 }}
        className={cn(
          "flex items-center gap-3 p-3 rounded-lg border",
          alert.type === 'urgent' && "bg-red-500/10 border-red-500/30",
          alert.type === 'warning' && "bg-amber-500/10 border-amber-500/30",
          alert.type === 'info' && "bg-blue-500/10 border-blue-500/30",
        )}
      >
        <span className="text-lg">{alert.icon}</span>
        <div className="flex-1">
          <div className="text-sm font-medium text-[color:var(--color-text)]">{alert.title}</div>
          <div className="text-xs text-[color:var(--color-text-muted)]">{alert.desc}</div>
        </div>
      </motion.div>
    ))}
  </div>
);

const ScenarioChartWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] rounded-xl p-3 sm:p-4 border border-[color:var(--color-border)] w-full sm:max-w-md shadow-sm">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
      <span className="text-xs font-semibold text-[color:var(--color-text-muted)] uppercase tracking-wider">5-Year Rent Projection</span>
      <div className="flex gap-3 text-[10px] text-[color:var(--color-text-muted)]">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span>Worst</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-accent"></span>Expected</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span>Best</span>
      </div>
    </div>
    <div className="h-24 sm:h-28 flex items-end justify-between gap-1 pl-7 sm:pl-8">
      {[
        { year: '2025', worst: 35, expected: 42, best: 48 },
        { year: '2026', worst: 38, expected: 46, best: 54 },
        { year: '2027', worst: 40, expected: 50, best: 62 },
        { year: '2028', worst: 42, expected: 55, best: 70 },
        { year: '2029', worst: 44, expected: 60, best: 78 },
      ].map((data, i) => (
        <div key={data.year} className="flex-1 flex flex-col items-center gap-1">
          <div className="w-full flex items-end justify-center gap-[2px] h-16 sm:h-20">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${data.worst}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="w-1.5 sm:w-2 bg-red-400 rounded-t"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${data.expected}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.05 }}
              className="w-1.5 sm:w-2 bg-accent rounded-t"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${data.best}%` }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.1 }}
              className="w-1.5 sm:w-2 bg-emerald-400 rounded-t"
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-[color:var(--color-text-muted)]">{data.year}</span>
        </div>
      ))}
    </div>
    <div className="mt-3 pt-3 border-t border-[color:var(--color-border)] flex justify-between text-xs">
      <span className="text-[color:var(--color-text-muted)]">Expected CAGR</span>
      <span className="font-semibold text-accent">+8.2%</span>
    </div>
  </div>
);

const ExtractionPreviewWidget = () => (
  <div className="mt-3 bg-[color:var(--color-surface)] rounded-xl border border-[color:var(--color-border)] overflow-hidden w-full sm:max-w-sm shadow-sm">
    <div className="bg-[color:var(--color-bg-alt)] px-4 py-2 border-b border-[color:var(--color-border)] flex items-center justify-between">
      <span className="text-xs font-medium text-[color:var(--color-text-muted)]">Extracted from PDF</span>
      <span className="text-[10px] bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full">99% accuracy</span>
    </div>
    <div className="p-4 space-y-2">
      {[
        { field: 'Tenant', value: 'Retail Corp S.L.', confidence: 'high' },
        { field: 'Start Date', value: '01/03/2024', confidence: 'high' },
        { field: 'Monthly Rent', value: '€4,250.00', confidence: 'high' },
        { field: 'Deposit', value: '€12,750.00', confidence: 'medium' },
        { field: 'Break Option', value: 'Year 3, 6-month notice', confidence: 'high' },
      ].map((item, i) => (
        <motion.div
          key={item.field}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex justify-between items-center text-sm"
        >
          <span className="text-[color:var(--color-text-muted)]">{item.field}</span>
          <div className="flex items-center gap-2">
            <span className="font-medium text-[color:var(--color-text)]">{item.value}</span>
            <span className={cn(
              "w-1.5 h-1.5 rounded-full",
              item.confidence === 'high' ? "bg-emerald-500" : "bg-amber-500"
            )} />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

// --- Main Component ---

export const AIConsole = () => {
  const { dictionary } = useI18n();
  const t = dictionary.home.aiConsole;

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showRentInquiryTab, setShowRentInquiryTab] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isMountedRef = useRef(true);
  const hasRunRef = useRef(false);
  const isUserScrolledUp = useRef(false);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Track if user has scrolled up
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      isUserScrolledUp.current = !isAtBottom;
    }
  };

  // Auto-scroll to bottom only if user hasn't scrolled up
  useEffect(() => {
    if (scrollRef.current && !isUserScrolledUp.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, inputValue]);

  useEffect(() => {
    if (!isInView) return;

    isMountedRef.current = true;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const runScenario = async () => {
      if (hasRunRef.current) return; // Prevent re-running if already completed
      hasRunRef.current = true; // Mark as run

      const msgs = dictionary.home.aiScenario.messages;

      let lastTypedText = '';
      const scenario: ScenarioStep[] = [
        { type: 'wait', duration: 800 },

        // 1. Portfolio Overview
        { type: 'user_type', text: msgs.expiring },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1200 },
        { type: 'ai_message', text: msgs.expiringResponse, widget: 'expiration-timeline' },
        { type: 'wait', duration: 3000 },

        // 2. Urgent Alerts
        { type: 'user_type', text: msgs.deadlines },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1000 },
        { type: 'ai_message', text: msgs.deadlinesResponse, widget: 'alert-card' },
        { type: 'wait', duration: 3000 },

        // 3. Document Intelligence
        { type: 'user_type', text: msgs.extract },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1800 },
        { type: 'ai_message', text: msgs.extractResponse, widget: 'extraction-preview' },
        { type: 'wait', duration: 3000 },

        // 4. Contract Q&A
        { type: 'user_type', text: msgs.breakClause },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1200 },
        { type: 'ai_message', text: msgs.breakClauseResponse, widget: 'doc-snippet' },
        { type: 'wait', duration: 2500 },

        // 5. Financial Projections
        { type: 'user_type', text: msgs.projection },
        { type: 'user_send' },
        { type: 'ai_think', duration: 1500 },
        { type: 'ai_message', text: msgs.projectionResponse, widget: 'scenario-chart' },
        { type: 'wait', duration: 3000 },

        // 6. KPI Check
        { type: 'user_type', text: msgs.occupancy },
        { type: 'user_send' },
        { type: 'ai_think', duration: 800 },
        { type: 'ai_message', text: msgs.occupancyResponse, widget: 'occupancy-gauge' },
        { type: 'wait', duration: 2500 },

        // 7. Conclusion
        { type: 'ai_message', text: msgs.conclusion },
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
  }, [isInView, dictionary]); // Start when in view

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto px-0 sm:px-0 md:p-0">
      <div className="relative bg-[color:var(--color-surface)] border border-[color:var(--color-border)] rounded-2xl overflow-hidden shadow-2xl h-[500px] sm:h-[600px] md:h-[650px] flex flex-col">
        
        {/* Header */}
        <div className="p-2 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)] flex items-center justify-between z-10">
          <div className="flex flex-nowrap overflow-x-auto custom-scrollbar">
            {/* Active Chat Tab */}
            <div className="flex items-center gap-2 px-3 py-2 bg-accent/10 text-accent rounded-lg text-sm font-medium border border-[color:var(--color-border)] mr-2 flex-shrink-0">
              <span>{dictionary.home.aiScenario.tabs.leaseAnalysis}</span>
              <XMarkIcon
                className="w-4 h-4 cursor-not-allowed opacity-50"
              />
            </div>

            {/* Inactive Chat Tab */}
            {showRentInquiryTab && (
              <motion.div
                initial={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0, marginRight: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 px-3 py-2 bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] rounded-lg text-sm font-medium border border-[color:var(--color-border)] mr-2 flex-shrink-0"
              >
                <span>{dictionary.home.aiScenario.tabs.rentInquiry}</span>
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
            <div className="flex items-center gap-2 px-3 py-2 bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] rounded-lg text-sm font-medium border border-[color:var(--color-border)] cursor-not-allowed opacity-70 flex-shrink-0">
              <PlusIcon className="w-4 h-4" />
              <span>{dictionary.home.aiScenario.tabs.newChat}</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto p-6 space-y-8 bg-[color:var(--color-bg-alt)]"
        >
          {messages.length === 0 && !isTyping && (
             <div className="h-full flex flex-col items-center justify-center opacity-30 select-none">
                <div className="w-16 h-16 rounded-2xl bg-[color:var(--color-surface-hover)] mb-4 animate-pulse" />
                <div className="w-48 h-4 rounded bg-[color:var(--color-surface-hover)] mb-2 animate-pulse" />
                <div className="w-32 h-4 rounded bg-[color:var(--color-surface-hover)] animate-pulse" />
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
                  "flex gap-2 sm:gap-4 max-w-full sm:max-w-[85%]",
                  msg.role === 'user' ? "ml-auto flex-row-reverse" : ""
                )}
              >
                {/* Avatar - hidden on mobile */}
                <div className={cn(
                  "hidden sm:flex w-8 h-8 rounded-full items-center justify-center text-xs flex-shrink-0 mt-1 shadow-sm",
                  msg.role === 'user'
                    ? "bg-[color:var(--color-bg-alt)] text-[color:var(--color-text-muted)] border border-[color:var(--color-border)]"
                    : "bg-accent/10 text-accent border border-accent/20"
                )}>
                  {msg.role === 'user' ? 'You' : 'AI'}
                </div>

                {/* Message Bubble */}
                <div className="space-y-2">
                  <div className={cn(
                    "px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm",
                    msg.role === 'user'
                      ? "bg-accent text-white rounded-tr-sm"
                      : "bg-[color:var(--color-surface)] border border-[color:var(--color-border)] text-[color:var(--color-text)] rounded-tl-sm"
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
                      {msg.widget === 'expiration-timeline' && <ExpirationTimelineWidget />}
                      {msg.widget === 'alert-card' && <AlertCardWidget />}
                      {msg.widget === 'scenario-chart' && <ScenarioChartWidget />}
                      {msg.widget === 'extraction-preview' && <ExtractionPreviewWidget />}
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
               className="flex gap-2 sm:gap-4 max-w-full sm:max-w-[80%]"
             >
               <div className="hidden sm:flex w-8 h-8 rounded-full bg-accent/10 items-center justify-center text-xs flex-shrink-0 border border-accent/20 mt-1">AI</div>
               <div className="bg-[color:var(--color-surface)] border border-[color:var(--color-border)] px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[46px]">
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-accent/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-accent/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                 <motion.div className="w-1.5 h-1.5 rounded-full bg-accent/60" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
               </div>
             </motion.div>
          )}

          {/* Spacer for bottom */}
          <div className="h-4" /> 
        </div>

        {/* Input Area */}
        <div className="p-4 bg-[color:var(--color-surface)] border-t border-[color:var(--color-border)]">
          <div className="relative flex items-end gap-2 p-2 bg-[color:var(--color-bg-alt)] border border-[color:var(--color-border)] rounded-xl focus-within:ring-2 focus-within:ring-accent/20 focus-within:border-accent/50 transition-all shadow-inner">
            <div className="p-2 text-[color:var(--color-text-muted)] hover:text-[color:var(--color-text)] transition-colors cursor-not-allowed">
              <PaperClipIcon className="w-5 h-5" />
            </div>
            
            <input
              type="text"
              readOnly
              value={inputValue}
              placeholder={t.placeholder}
              className="flex-1 bg-transparent border-none py-2 text-sm focus:outline-none text-[color:var(--color-text)] placeholder:text-[color:var(--color-text-muted)]"
            />

            <div className={cn(
              "p-2 rounded-lg transition-all duration-300",
              inputValue.length > 0 ? "bg-accent text-white" : "bg-[color:var(--color-surface-hover)] text-[color:var(--color-text-muted)]"
            )}>
              <ArrowUpCircleIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
