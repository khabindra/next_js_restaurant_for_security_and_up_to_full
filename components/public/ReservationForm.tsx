// components/public/ReservationForm.tsx
'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { isEmail, isPhone } from '@/lib/validations';
import { createReservationAction } from '@/app/(admin)/actions/reservation/actions';

type FormErrors = {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
  guests?: string;
};

export default function ReservationForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    notes: '',
    honeypot: '', // ⚡ Added honeypot to state
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null); // ⚡ Added server error state
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = 'Please provide your name';
    if (!isEmail(form.email)) e.email = 'A valid email is required';
    if (!isPhone(form.phone)) e.phone = 'A valid phone number is required';
    if (!form.date) e.date = 'Please select a date';
    if (!form.time) e.time = 'Please select a time';
    if (!form.guests || form.guests < 1) e.guests = 'At least 1 guest is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Pass the entire form state, including the honeypot
    const result = await createReservationAction(form);
    
    setIsSubmitting(false);

    if (result.success) {
      setSuccess(true);
    } else {
      // Capture ratelimit or server errors to show to the user
      setServerError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-14 w-14 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200/60 mb-8">
          <svg className="h-6 w-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-medium text-neutral-900 tracking-tight">Booking Confirmed</h3>
        <p className="mt-4 max-w-sm text-sm text-neutral-500 font-light leading-relaxed">
          A confirmation summary has been sent to <span className="text-neutral-700 font-normal">{form.email}</span>. We look forward to welcoming you.
        </p>
        <button 
          onClick={() => {
            setSuccess(false);
            setForm({ name: '', email: '', phone: '', date: '', time: '', guests: 2, notes: '', honeypot: '' });
          }}
          className="mt-10 text-xs font-medium uppercase tracking-[0.15em] text-neutral-400 hover:text-amber-600 transition-colors duration-300"
        >
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 md:space-y-8">
      
      {/* ⚡ Display server/rate-limit errors gracefully */}
      {serverError && (
        <div className="p-4 rounded-md bg-red-50 border border-red-100 text-sm text-red-600">
          {serverError}
        </div>
      )}

      {/* ⚡ HONEYPOT FIELD (Hidden from real users, visible to bots) */}
      <div 
        className="absolute left-[-9999px] top-[-9999px]" 
        aria-hidden="true"
        style={{ opacity: 0, position: 'absolute', zIndex: -1 }}
      >
        <label htmlFor="reservation-hp">Leave this field blank</label>
        <input
          id="reservation-hp"
          type="text"
          name="honeypot"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        />
      </div>

      <Input
        id="name"
        label="Full Name"
        placeholder="e.g. John Doe"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        error={errors.name}
      />
      <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email}
        />
        <Input
          id="phone"
          label="Contact Number"
          placeholder="+977-9876543210"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone}
        />
      </div>
      <div className="grid gap-6 md:gap-8 grid-cols-2 sm:grid-cols-3">
        <Input
          id="date"
          label="Date"
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          error={errors.date}
        />
        <Input
          id="time"
          label="Time"
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
          error={errors.time}
        />
        <Input
          id="guests"
          label="Party Size"
          type="number"
          min={1}
          max={50}
          value={form.guests}
          onChange={(e) => setForm({ ...form, guests: parseInt(e.target.value, 10) || 1 })}
          error={errors.guests}
        />
      </div>
      <TextArea
        id="notes"
        label="Special Requests"
        placeholder="Dietary requirements, celebrations, or seating preferences..."
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
      />
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full rounded-full py-4 text-xs font-semibold uppercase tracking-[0.2em] bg-neutral-900 text-white"
        >
          {isSubmitting ? 'Securing Table...' : 'Complete Reservation'}
        </Button>
      </div>
    </form>
  );
}