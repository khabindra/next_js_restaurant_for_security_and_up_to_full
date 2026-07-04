
import { ContactMessage } from "@/types/contact";

export async function getContacts(): Promise<ContactMessage[]> {
  const res = await fetch('/api/contacts');
  if (!res.ok) throw new Error('Failed to fetch contacts');
  return res.json();
}

export async function createContact(data: Omit<ContactMessage, 'id' | 'createdAt'>) {
  const res = await fetch('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create contact');
  return res.json() as Promise<ContactMessage>;
}