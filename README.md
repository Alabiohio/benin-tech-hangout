# Benin Tech Fest 2.0

Benin Tech Fest 2.0 is the official web experience for a community-led technology festival in Benin City. The project combines a high-impact marketing website with a lightweight participation platform, allowing visitors to learn about the event, register their interest, and engage with the festival through multiple pathways.

This repository contains the complete frontend and backend logic for the site, including animated presentation pages, dedicated registration routes, server-side form handling, database persistence, and email notifications.

---

## What This Site Does

The site is not just a static landing page. It is a full event platform with three core purposes:

1. Promote the event and its mission
2. Guide visitors toward meaningful participation options
3. Collect submissions for attendees, speakers, exhibitors, sponsors, and volunteers

It is designed to feel polished, modern, and community-focused while remaining practical for event operations.

---

## Event Context

Benin Tech Fest 2.0 is positioned as a flagship gathering for the Benin City tech ecosystem. The experience is built around the idea of strengthening collaboration across founders, developers, students, creatives, organizations, and partners.

The site reflects that through sections focused on:

- community growth
- ecosystem connection
- talent visibility
- event participation
- partnership opportunities

---

## Main User Journeys

### 1. Visitor journey
A first-time visitor can quickly understand:

- what the event is about
- why it matters
- who should attend
- how to participate

### 2. Registration journey
Visitors can choose from several participation paths through the registration modal and dedicated pages:

- Get Tickets
- Become a Volunteer
- Become an Exhibitor
- Become a Speaker
- Become a Sponsor

### 3. Submission journey
When a form is submitted, the system stores the data in PostgreSQL and sends an email notification using Resend.

---

## Core Features

### Marketing and storytelling
- Hero section with strong event messaging and CTA buttons
- Highlights and value proposition sections
- About and mission content
- Countdown and event timeline sections
- Partner and sponsorship emphasis
- FAQ and legacy sections

### Participation and conversion flows
- Registration modal for quick navigation
- Dedicated routes for tickets, speakers, exhibitors, sponsors, and volunteers
- Role-based submission experiences for different audiences

### Backend and operations
- Next.js API routes for submissions
- PostgreSQL persistence for form data
- Rate limiting for form submissions
- Email confirmation and notification delivery
- Graceful error handling for failed submissions

---

## App Structure

The project uses the Next.js App Router structure.

### Main directories
- app/ — application pages, layouts, components, and API routes
- app/components/ — reusable UI sections for the homepage and form experiences
- app/api/submissions/ — backend endpoints responsible for storing form submissions
- app/lib/ — shared helper logic for emails and rate limiting
- public/ — static assets such as images, logos, and partner graphics

### Key routes
- / — homepage
- /tickets — ticket/attendance information page
- /volunteer — volunteer registration experience
- /exhibitor — exhibitor registration experience
- /speaker-registration — speaker submission experience
- /sponsor — sponsor inquiry experience
- /privacy-policy — privacy notice page

---

## Key Components

The landing page is assembled from several reusable components, including:

- Navbar
- Hero
- Highlights
- About
- Countdown
- WhatToExpect
- ExhibitionCTA
- Partners
- Tickets
- Showcase/Legacy sections
- WhyAttend
- FAQ
- Footer
- RegisterModal

These components are composed in the homepage entry point at app/page.tsx.

---

## Backend Flow

The submission workflow is handled through API routes under app/api/submissions/.

### Supported submission types
- General registration
- Speaker nominations
- Exhibitor registrations
- Sponsor registrations
- Volunteer registrations

### What happens when a form is submitted
1. The request is received by a Next.js API route.
2. Required fields are validated.
3. The submission is inserted into a PostgreSQL table.
4. A confirmation email is queued and sent via Resend.
5. The client receives a success or error response.

### Database behavior
The project creates tables automatically when submissions are first received. The current tables include:

- registration_submissions
- speaker_registrations
- exhibitor_registrations
- sponsor_registrations
- volunteer_registrations

A separate database setup guide is also included in DATABASE_SETUP.md.

---

## Security and Reliability Notes

The backend includes a few operational safeguards:

- basic validation for required input fields
- rate limiting to reduce abuse on submission endpoints
- safe error responses instead of exposing raw backend errors to users
- transactional email attempts that do not block the API response entirely

These are lightweight but useful for a community event website.

---

## Tech Stack

This project is built with modern web tooling and a small server-side layer.

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- AOS (Animate on Scroll)
- Three.js and React Three Fiber

### Backend
- Next.js API routes
- PostgreSQL via the pg package
- Resend for email delivery

---

## Environment Variables

This application expects environment variables for database access and email delivery.

Create a .env.local file with values similar to the following:

```env
DATABASE_URL=postgres://your-user:your-password@localhost:5432/your-database
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=Benin Tech Fest <noreply@yourdomain.com>
```

### Required variables
- DATABASE_URL — PostgreSQL connection string used by the submission APIs
- RESEND_API_KEY — API key for Resend
- RESEND_FROM_EMAIL — sender identity used in outgoing emails

> The project uses these values at runtime, so they must be available before you run the app or deploy it.

---

## Local Development Setup

### Prerequisites

- Node.js 18 or newer
- npm
- PostgreSQL database access
- Resend account for email sending

### Installation

1. Clone the repository
2. Install packages

```bash
npm install
```

3. Create your local environment file

```bash
cp .env.example .env.local
```

If there is no .env.example file, create .env.local manually and add the environment variables shown above.

4. Start the development server

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

---

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

### Script descriptions
- npm run dev — starts the local Next.js development server
- npm run build — creates a production build
- npm run start — serves the production build locally
- npm run lint — runs ESLint checks across the project

---

## Deployment Guide

The site is designed for deployment on Vercel or any hosting platform that supports Next.js.

Recommended deployment steps:

1. Push the repository to GitHub
2. Create a Vercel project from the repository
3. Configure the required environment variables in the hosting dashboard
4. Deploy the project

### Production environment checklist
- Database connection is available
- Resend API key is configured
- The sender email domain is valid and approved in Resend
- Images and metadata assets are available in the public folder

---

## Content and Design Notes

The UI is intentionally vibrant and event-focused. The site uses a blend of:

- strong headline messaging
- animated motion effects
- bold brand colors
- card-based content sections
- clear calls to action

The visual system is centered on putting the event identity and community energy first, while still making the participation paths easy to understand.

---

## Contribution Guide

Contributions are welcome if you want to improve the experience, add new sections, or fix bugs.

### Suggested workflow
1. Create a feature branch
2. Make your changes locally
3. Run the app and verify behavior
4. Check linting and build output
5. Open a pull request with a clear summary

### Good areas to contribute
- homepage copy and content updates
- new UI sections and improvements
- registration flow refinement
- form validation enhancements
- database and email workflow improvements
- accessibility updates

---

## Troubleshooting

### The app does not start
Check that:
- Node.js is installed and updated
- dependencies were installed successfully
- the local environment file is present

### Form submissions fail
Check that:
- DATABASE_URL is valid
- the database server is reachable
- the required table can be created
- the body of the form matches the expected request shape

### Emails are not sending
Check that:
- RESEND_API_KEY is configured
- RESEND_FROM_EMAIL is set correctly
- the Resend account has permission to send mail from the chosen sender

---

## Related Files

Useful files in this repository include:

- DATABASE_SETUP.md — database setup and table overview
- app/page.tsx — homepage composition
- app/components/RegisterModal.tsx — participation entry points
- app/api/submissions/* — submission endpoints
- app/lib/email.ts — email rendering and delivery logic
- app/lib/rateLimit.ts — request throttling helpers

---

## Contact

For event partnerships, sponsorships, or general inquiries, use the contact details shown on the site or the official event communication channels.

---

## Status

Active development for the Benin Tech Fest 2.0 website and event registration experience.

