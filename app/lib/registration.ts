export function generateRegistrationId(): string {
  const randomPart = `${Math.random().toString(36).slice(2, 7).toUpperCase()}${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
  return `BTF-${randomPart}`;
}
