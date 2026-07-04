export function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export function isPhone(s: string) {
  return /^\+?[\d\s-]{7,15}$/.test(s);
}

export function isValidDate(s: string) {
  return !isNaN(Date.parse(s));
}