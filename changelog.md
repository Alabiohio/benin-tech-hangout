# Changelog

All notable changes to this project will be documented in this file.

## [2026-08-27] - Ticket & Registration System Overhaul

### Added
- Dedicated `ticket_registrations` database table with unique `ticket_id` values for each purchased ticket
- `app/lib/tickets.ts` — ticket table schema, `generateTicketId()`, and `insertTickets()` helper
- `app/lib/registration.ts` — `generateRegistrationId()` for unified registration codes
- `app/lib/paystackWebhook.ts` — secure Paystack webhook handler with HMAC signature verification, amount/currency validation, and idempotent processing
- Quantity support on the buy-ticket flow with server-side amount validation (`expectedAmount = tierAmount × quantity`)
- Advisory locks (`pg_advisory_xact_lock`) to prevent duplicate payment processing
- `sendTicketConfirmationEmail()` — new branded HTML email sent on successful ticket purchase with ticket details, total paid, and registration ID
- Duplicate-email detection on registration: returns existing `registrationId` instead of creating a duplicate record
- New registration form fields: `whatsapp`, `company`, `role`, `location`, `interests`, `heardFrom`, `eventPass`
- Loading overlay with rotating phrases during email validation on the buy-ticket page
- Payment verification overlay after Paystack payment before showing success

### Changed
- Rebuilt `app/api/submissions/ticket/route.ts` to use the new ticket table, drop legacy fields (`phone`, `country`, `nationality`, `community`), and return `registrationId` + `ticketIds`
- Rebuilt `app/api/submissions/registration/route.ts` with expanded schema, duplicate-email guard, and `registration_id` constraint
- `app/api/registration/badge/route.ts` now looks up tickets by `ticket_id` and surfaces `ticketId` on badge responses
- Badge download page and badge page accept string IDs and display Ticket ID when available
- Email sender changed from `info@email.benintechfest.com.ng` to `noreply@info.oheo.site`
- Redesigned transactional emails (registration, speaker brief, exhibitor brief, ticket confirmation) with new HTML templates, footer logo, and structured "What next?" sections
- Registration email now includes the generated `registrationId` and WhatsApp community link
- Hero tagline updated to "A Convergence Of EDO Tech Professionals"
- Page titles and OpenGraph metadata updated to match new tagline
- Standard pass merch line updated from "hoodie + cap" to "t-shirt + cap"
- All WhatsApp links updated from old channel URL to new group chat URL
- Removed "VICTOR UWAIFO CREATIVE HUB" line from ticket, register, and former free-pass page headers
- `ConfirmationModal` now uses local `/logo/logo-icon.png` instead of external Figma asset URLs
- Buy-ticket page email validation moved to debounced `useEffect`, removed inline `onBlur` handler
- Unregistered-email error on buy-ticket page now links directly to `/register`

### Removed
- `app/free-pass/page.tsx` — standalone free-pass page removed
