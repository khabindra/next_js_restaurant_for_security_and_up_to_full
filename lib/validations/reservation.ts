// lib/validations/reservation.ts
import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(7, 'Phone number is too short').max(20, 'Phone number is too long'),
  date: z.string().min(1, 'Date is required').refine((val) => {
    // Check if it's a valid date
    const parsed = new Date(val + 'T00:00:00');
    return !isNaN(parsed.getTime());
  }, { message: 'Invalid date format' }).refine((val) => {
    // Check if date is in the past
    const parsed = new Date(val + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parsed >= today;
  }, { message: 'Reservations cannot be made in the past' }),
  time: z.string().min(1, 'Time is required').refine((val) => {
    // Check if time is valid HH:mm format
    return /^([01]\d|2[0-3]):([0-5]\d)$/.test(val);
  }, { message: 'Invalid time format' }),
  guests: z.number().int().min(1, 'At least 1 guest required').max(50, 'Maximum 50 guests per online booking'),
  notes: z.string().trim().max(1000, 'Notes must be 1000 characters or less').optional().default(''),
  honeypot: z.string().max(200).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;