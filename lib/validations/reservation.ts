// lib/validations/reservation.ts
import { z } from 'zod';

export const reservationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().trim().email('Invalid email address').max(255),
  phone: z.string().trim().min(7, 'Phone number is too short').max(20, 'Phone number is too long'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  guests: z.number().int().min(1, 'At least 1 guest required').max(50, 'Maximum 50 guests per online booking'),
  notes: z.string().trim().max(1000, 'Notes must be 1000 characters or less').optional().or(z.literal('')),
  honeypot: z.string().max(200).optional(),
});

export type ReservationInput = z.infer<typeof reservationSchema>;