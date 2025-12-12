import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPinIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';
import { JobApplicationModal } from './JobApplicationModal';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Remote';
}

const JOBS: Job[] = [
  { id: '1', title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote (US/EU)', type: 'Full-time' },
  { id: '2', title: 'Product Manager', department: 'Product', location: 'London, UK', type: 'Full-time' },
  { id: '3', title: 'Enterprise Account Executive', department: 'Sales', location: 'New York, NY', type: 'Full-time' },
  { id: '4', title: 'DevOps Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time' },
  { id: '5', title: 'Customer Success Manager', department: 'Customer Success', location: 'Singapore', type: 'Full-time' },
  { id: '6', title: 'UI/UX Designer', department: 'Product', location: 'Remote', type: 'Contract' },
];

const DEPARTMENTS = ['All', 'Engineering', 'Product', 'Sales', 'Customer Success'];

export const JobBoard = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState<string | undefined>(undefined);

  const openModal = (jobTitle: string) => {
    setSelectedJobTitle(jobTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJobTitle(undefined);
  };

  const filteredJobs = useMemo(() => {
    return JOBS.filter(job => {
      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            job.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDept && matchesSearch;
    });
  }, [selectedDept, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center bg-[color:var(--color-surface)] p-4 rounded-xl border border-[color:var(--color-border)]">
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                selectedDept === dept
                  ? "bg-[color:var(--color-primary)] text-white"
                  : "bg-[color:var(--color-surface-muted)] text-[color:var(--color-text-muted)] hover:bg-[color:var(--color-border)]"
              )}
            >
              {dept}
            </button>
          ))}
        </div>
        <div className="w-full md:w-64">
          <input
            type="text"
            placeholder="Search roles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-[color:var(--color-surface-muted)] border border-[color:var(--color-border)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] placeholder-[color:var(--color-text-muted)]"
          />
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <motion.div
                key={job.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="group flex flex-col md:flex-row items-center justify-between p-6 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-primary)] transition-colors cursor-pointer"
              >
                <div className="space-y-2 text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-lg font-bold text-[color:var(--color-text)] group-hover:text-[color:var(--color-primary)] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-[color:var(--color-text-muted)]">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-[color:var(--color-primary)]" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => openModal(job.title)}
                  className="px-6 py-2 rounded-lg border border-[color:var(--color-border)] text-[color:var(--color-text)] font-medium group-hover:bg-[color:var(--color-primary)] group-hover:text-white group-hover:border-transparent transition-all flex items-center gap-2">
                  Apply Now
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-[color:var(--color-text-muted)]">
              No positions found matching your criteria.
            </div>
          )}
        </AnimatePresence>
      </div>
      <JobApplicationModal isOpen={isModalOpen} onClose={closeModal} jobTitle={selectedJobTitle} />
    </div>
  );
};

