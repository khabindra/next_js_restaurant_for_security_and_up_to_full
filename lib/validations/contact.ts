// lib/validations/contact.ts
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
  email: z.string().trim().email('Invalid email address').max(255),
  subject: z.string().trim().max(150, 'Subject must be 150 characters or less').optional().or(z.literal('')),
  message: z.string().trim().min(1, 'Message is required').max(2000, 'Message must be 2000 characters or less'),
  honeypot: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;