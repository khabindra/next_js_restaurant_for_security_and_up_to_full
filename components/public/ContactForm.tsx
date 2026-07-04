// components/public/ContactForm.tsx
'use client';

import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import { createContact } from '@/services/contactService';

type Errors = { name?: string; email?: string; message?: string };

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [honeypot, setHoneypot] = useState(''); 
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const validate = () => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setStatus('submitting');
    try {
      await createContact({ ...form, honeypot });
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setHoneypot('');
      setErrors({});
    } catch (err: any) {
      setServerError(err.message || 'An error occurred. Please try again.');
      setStatus('error');
    }
  };

  const requiredFieldStyle = "[&_label]:after:content-['_*'] [&_label]:after:text-rose-500 [&_label]:after:ml-0.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      
      {/* Camouflaged Honeypot Area - Pushed securely out of the viewport bounds */}
      <div 
        style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} 
        aria-hidden="true"
      >
        <label htmlFor="user_website_verification">Do not type in this field</label>
        <input
          id="user_website_verification"
          type="text"
          name="user_website_verification"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
        <div className={requiredFieldStyle}>
          <Input id="name" label="Full Name" placeholder="Jane Smith" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} disabled={status === 'submitting'} />
        </div>
        <div className={requiredFieldStyle}>
          <Input id="email" label="Email Address" type="email" placeholder="jane@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} disabled={status === 'submitting'} />
        </div>
      </div>

      <Input id="subject" label="Subject (Optional)" placeholder="Private event inquiry" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} disabled={status === 'submitting'} />

      <div className={requiredFieldStyle}>
        <TextArea id="message" label="Message" placeholder="How can we assist you?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} rows={5} disabled={status === 'submitting'} />
      </div>

      <div className="pt-2">
        <Button type="submit" className="w-full rounded-full py-4 text-xs font-semibold uppercase tracking-[0.15em]" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Sending Inquiry...' : 'Send Inquiry'}
        </Button>
      </div>

      {status === 'success' && (
        <div className="p-4 rounded-xl bg-green-50 border border-green-100 text-center animate-in fade-in duration-200">
          <p className="text-sm italic text-green-800">Thank you. Your message has been received successfully.</p>
        </div>
      )}

      {status === 'error' && serverError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-center animate-in fade-in duration-200">
          <p className="text-sm font-medium text-rose-800">{serverError}</p>
        </div>
      )}
    </form>
  );
}