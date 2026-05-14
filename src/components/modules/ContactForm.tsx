import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';
import { Dropdown } from '../ui/Dropdown';

type ContactFormProps = {
  onSubmit?: (data: { name: string; email: string; company: string; phone: string; messageType: string; message: string }) => Promise<void>;
  defaultMessageType?: string;
};

export const ContactForm = ({ onSubmit, defaultMessageType }: ContactFormProps) => {
  const { dictionary } = useI18n();
  const t = dictionary.contactPage.form.fields;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    messageType: defaultMessageType || 'general',
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onSubmit) return;
    setLoading(true);
    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        messageType: defaultMessageType || 'general',
        message: '',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            {t.name} *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            {t.email} *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            {t.company}
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="messageType" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
          {t.inquiryType}
        </label>
        <Dropdown
          id="messageType"
          value={formData.messageType}
          onChange={(val) => setFormData({ ...formData, messageType: val })}
          options={[
            { value: 'general', label: t.options.general },
            { value: 'sales', label: t.options.sales },
            { value: 'support', label: t.options.support },
            { value: 'partnership', label: t.options.partnership },
            { value: 'careers', label: t.options.careers },
          ]}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
          {t.message} *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && (
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {t.submit}
      </button>
    </motion.form>
  );
};
