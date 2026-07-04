// services/contactService.ts

import { ContactInput } from '@/lib/validations/contact';

export async function createContact(data: ContactInput) {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  const result = await res.json();
  
  if (!res.ok) {
    throw new Error(result.error || 'Failed to submit contact card');
  }
  
  return result as { success: boolean };
}