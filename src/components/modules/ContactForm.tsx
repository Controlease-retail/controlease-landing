import { useState } from 'react';
import { motion } from 'framer-motion';

type ContactFormProps = {
  onSubmit?: (data: { name: string; email: string; company: string; phone: string; messageType: string; message: string }) => void;
};

export const ContactForm = ({ onSubmit }: ContactFormProps) => {
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
            Name *
          </label>
          <input
            type="text"
            id="name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="messageType" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
          Inquiry Type
        </label>
        <select
          id="messageType"
          value={formData.messageType}
          onChange={(e) => setFormData({ ...formData, messageType: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
        >
          <option value="general">General Inquiry</option>
          <option value="sales">Sales & Demo</option>
          <option value="support">Technical Support</option>
          <option value="partnership">Partnership</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-[color:var(--color-text)] mb-2">
          Message *
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] text-[color:var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)] resize-none"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3 bg-[color:var(--color-primary)] text-[color:var(--color-inverted-text)] rounded-lg font-semibold hover:opacity-90 transition-opacity"
      >
        Send Message
      </button>
    </motion.form>
  );
};

