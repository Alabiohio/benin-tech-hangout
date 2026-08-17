# Benin-Tech-Fest Database Setup

## Neon Project Details

**Project Name:** Benin-Tech-Fest  
**Project ID:** holy-cloud-94027225  
**Database:** neondb  
**Organization:** org-silent-heart-94545493  

## Connection String

```
postgresql://neondb_owner:npg_Hu37agCqlMwp@ep-twilight-sea-aj75uc6s-pooler.c-3.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
```

This is stored in `.env.local` as `DATABASE_URL`

## Database Tables Created

The following tables are created automatically when forms are submitted:

### 1. speaker_registrations
- id (Primary Key)
- application_type (self/suggest)
- name
- email
- phone
- speaker_name (optional, for suggestions)
- topic
- why_speak
- created_at

### 2. exhibitor_registrations
- id (Primary Key)
- name
- email
- phone
- company
- website (optional)
- description (optional)
- created_at

### 3. sponsor_registrations
- id (Primary Key)
- company_name
- contact_person
- email
- phone
- sponsorship_tier (optional)
- interests (optional)
- created_at

### 4. volunteer_registrations
- id (Primary Key)
- name
- email
- phone
- skills (optional)
- availability (optional)
- motivation (optional)
- created_at

### 5. registration_exhibition (NEW)
- id (Primary Key)
- first_name
- last_name
- email
- phone
- message (optional)
- company_name
- website (optional)
- exhibition_package
- immediate_payment
- logo_url (stored in Cloudflare R2)
- created_at

## API Endpoints

- **Speaker Registration:** `POST /api/submissions/speaker`
- **Exhibitor Registration:** `POST /api/submissions/exhibitor`
- **Sponsor Registration:** `POST /api/submissions/sponsor`
- **Volunteer Registration:** `POST /api/submissions/volunteer`
- **Exhibition Registration:** `POST /api/submissions/exhibition` (with file upload)

## Setup Steps Completed

1. ✅ Created Neon project "Benin-Tech-Fest"
2. ✅ Added database connection to `.env.local`
3. ✅ Created API routes for all forms
4. ✅ Updated speaker-registration form to submit to database
5. ✅ Added `pg` package to dependencies

## Next Steps

1. Run `npm install` to install the `pg` package
2. Update exhibitor, sponsor, and volunteer forms to use the API routes
3. Test form submissions
4. View submissions in Neon console at https://console.neon.tech

## Environment Variables

Make sure `.env.local` contains:
```
DATABASE_URL=postgresql://neondb_owner:npg_Hu37agCqlMwp@ep-twilight-sea-aj75uc6s-pooler.c-3.us-east-2.aws.neon.tech/neondb?channel_binding=require&sslmode=require
NEXT_PUBLIC_PROJECT_ID=holy-cloud-94027225
```
