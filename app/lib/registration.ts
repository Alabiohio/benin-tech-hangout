export function generateRegistrationId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const monthDay = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const randomPart = `${Math.random().toString(36).slice(2, 7).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  return `BTF-${year}-${monthDay}-${randomPart}`;
}
