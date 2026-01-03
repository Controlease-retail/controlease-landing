import { useState } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../i18n';

type ContactFormProps = {
  onSubmit?: (data: { name: string; email: string; company: string; phone: string; messageType: string; message: string }) => void;
};

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const { dictionary } = useI18n();
  const t = dictionary.contactPage.form.fields;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    messageType: 'general',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      messageType: 'general',
      message: '',
    });
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
        <select
          id="messageType"
          value={formData.messageType}
          onChange={(e) => setFormData({ ...formData, messageType: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-bg-alt)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="general">{t.options.general}</option>
          <option value="sales">{t.options.sales}</option>
          <option value="support">{t.options.support}</option>
          <option value="partnership">{t.options.partnership}</option>
        </select>
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
        className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        {t.submit}
      </button>
    </motion.form>
  );
};

