import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Modal } from '../ui/Modal';

interface JobApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle?: string;
}

export const JobApplicationModal = ({ isOpen, onClose, jobTitle }: JobApplicationModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Run validation on initial render and whenever formData changes
  useEffect(() => {
    if (isOpen) {
      const initialErrors = validate();
      setErrors(initialErrors);
    }
  }, [formData, isOpen]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Simulate API call
      console.log('Submitting application:', formData);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 3000); // Close after 3 seconds
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={jobTitle ? `Apply for ${jobTitle}` : 'Apply for a Position'}>
      {!isSubmitted ? (
        <div className="space-y-6">
          <p className="text-[color:var(--color-text-muted)] mt-2">
            Fill out the form below to submit your application.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-[color:var(--color-text)]">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-[color:var(--color-text)]">
                Email *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-[color:var(--color-text)]">
                Phone (Optional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium text-[color:var(--color-text)]">
                Cover Letter / Message (Optional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface-muted)] px-4 py-2 text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={Object.keys(errors).length > 0}
              className="w-full rounded-lg bg-[color:var(--color-accent)] py-3 font-semibold text-[color:var(--color-inverted-text)] transition-colors hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Application
            </button>
          </form>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircleIcon className="h-8 w-8" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-[color:var(--color-text)]">Thank You!</h3>
          <p className="text-[color:var(--color-text-muted)]">
            Your application for {jobTitle || 'the position'} has been received.
            We'll be in touch shortly.
          </p>
        </motion.div>
      )}
    </Modal>
  );
};
