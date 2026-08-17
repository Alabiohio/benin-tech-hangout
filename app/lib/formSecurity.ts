import { NextResponse } from 'next/server';

const MAX_BODY_BYTES = 12_000;
const MAX_FIELD_LENGTH = 1_000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

type FormRecord = Record<string, unknown>;

export function rejectOversizedBody(request: Request, maxBytes = MAX_BODY_BYTES) {
  const contentLength = Number(request.headers.get('content-length') || 0);
  return Number.isFinite(contentLength) && contentLength > maxBytes
    ? NextResponse.json({ error: 'Request is too large.' }, { status: 413 })
    : null;
}

export async function readFormBody(request: Request): Promise<FormRecord | null> {
  try {
    const body: unknown = await request.json();
    return body && typeof body === 'object' && !Array.isArray(body) ? body as FormRecord : null;
  } catch {
    return null;
  }
}

export function cleanText(value: unknown, maxLength = MAX_FIELD_LENGTH): string | null {
  if (typeof value !== 'string') return null;
  const cleaned = value.trim().replace(/[\u0000-\u001F\u007F]/g, '');
  return cleaned.length <= maxLength ? cleaned : null;
}

export function requiredText(value: unknown, maxLength = 255): string | null {
  const cleaned = cleanText(value, maxLength);
  return cleaned && cleaned.length > 0 ? cleaned : null;
}

export function email(value: unknown): string | null {
  const cleaned = requiredText(value, 254)?.toLowerCase();
  return cleaned && EMAIL_PATTERN.test(cleaned) ? cleaned : null;
}

export function phone(value: unknown, required = true): string | null {
  const cleaned = required ? requiredText(value, 20) : cleanText(value, 20);
  if (!cleaned && !required) return '';
  return cleaned && PHONE_PATTERN.test(cleaned) ? cleaned : null;
}

export function invalidFormResponse() {
  return NextResponse.json({ error: 'Please provide valid form details.' }, { status: 400 });
}

export function hasSafeTextFields(data: FormRecord): boolean {
  return Object.values(data).every((value) => {
    if (typeof value === 'string') return cleanText(value) !== null;
    if (typeof value === 'boolean') return true;
    if (typeof value === 'number') return Number.isFinite(value);
    if (Array.isArray(value)) {
      return value.every((item) => typeof item === 'string' && cleanText(item) !== null);
    }
    return false;
  });
}
