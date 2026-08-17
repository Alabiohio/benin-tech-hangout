# Cloudflare R2 Setup for Exhibition Logo Storage

## Overview
This guide will help you set up Cloudflare R2 storage to handle logo uploads for the exhibition registration form.

## Prerequisites
- Cloudflare account (free tier available)
- Access to your Cloudflare dashboard

## Step 1: Create an R2 Bucket

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. In the left sidebar, navigate to **R2** under "Storage"
3. Click **Create bucket**
4. Enter bucket name: `benin-tech-fest-logos`
5. Choose region: **Auto (Geo-redundant)**
6. Click **Create bucket**

## Step 2: Create API Credentials

1. In the Cloudflare dashboard, go to **My Profile** → **API Tokens**
2. Click **Create Token**
3. Select "Create Custom Token"
4. Set token name: `benin-tech-fest-r2-upload`
5. Permissions:
   - **Account** → **Cloudflare R2** → **Edit**
   - **Zone** → **Zone** → (optional for public access)
6. IP Whitelist: (optional, for security)
7. TTL: Set as needed (e.g., 1 year)
8. Click **Continue to summary** and **Create Token**
9. **Copy the token** and save it securely

## Step 3: Create R2 API Token (Recommended for S3-compatible access)

For S3-compatible access (more reliable):

1. Go to your **R2** settings
2. Click **API Tokens** (in R2 section)
3. Click **Create API Token**
4. Set name: `benin-tech-fest-s3-token`
5. Generate new credentials
6. You'll receive:
   - `Access Key ID`
   - `Secret Access Key`
   - `Account ID` (visible in R2 bucket URL)

## Step 4: Get Your Account ID

1. Go to R2 in your Cloudflare dashboard
2. Click your bucket name `benin-tech-fest-logos`
3. In the **S3 API** section, copy your **Account ID** from the URL format
4. It looks like: `c718115e08bd4291a1f2818463646722`

## Step 5: Configure Environment Variables

Add these to your `.env.local` file:

```env
# Cloudflare R2 Configuration
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_ACCESS_KEY_ID=your_access_key_id_here
CLOUDFLARE_SECRET_ACCESS_KEY=your_secret_access_key_here
CLOUDFLARE_R2_BUCKET_NAME=benin-tech-fest-logos
CLOUDFLARE_R2_PUBLIC_URL=pub-your_bucket_id.r2.dev  # Optional for custom domain
```

## Step 6: (Optional) Set Up Custom Domain for Public Access

If you want a custom domain for public logo URLs:

1. Go to R2 bucket settings
2. Under **Subdomain**, set a subdomain like `logos-btf`
3. The public URL will be: `https://logos-btf.r2.dev/`

Or use your own custom domain:
1. Add CNAME record to your DNS pointing to your R2 bucket endpoint
2. Enable it in R2 settings under "Custom Domains"

## Step 7: Configure Public Access Policy (if needed)

To make uploaded logos publicly accessible:

1. Go to your R2 bucket
2. Click **Settings**
3. Under **Public access**, click **Allow public read access**
4. Apply a bucket policy to allow public reads:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::benin-tech-fest-logos/*"
    }
  ]
}
```

## Step 8: Test the Setup

1. Submit the exhibition registration form with a logo
2. Check your R2 bucket in the Cloudflare dashboard
3. Verify the logo file appears in the `logos/` folder
4. Check the database to verify the logo URL is stored correctly

## Environment Variables Summary

```env
# Neon Database (existing)
DATABASE_URL=postgresql://neondb_owner:npg_Hu37agCqlMwp@...

# Cloudflare R2 (new)
CLOUDFLARE_ACCOUNT_ID=
CLOUDFLARE_ACCESS_KEY_ID=
CLOUDFLARE_SECRET_ACCESS_KEY=
CLOUDFLARE_R2_BUCKET_NAME=benin-tech-fest-logos
CLOUDFLARE_R2_PUBLIC_URL=  # optional
```

## Database Schema

The `registration_exhibition` table has the following structure:

```sql
CREATE TABLE registration_exhibition (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    company_name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    exhibition_package VARCHAR(100) NOT NULL,
    immediate_payment VARCHAR(10),
    logo_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Troubleshooting

### Logo upload fails
- Check credentials in `.env.local`
- Verify R2 bucket name is correct
- Check file size (max recommended: 10MB)
- Ensure bucket has public read access if returning public URLs

### Database insert fails
- Verify `DATABASE_URL` in `.env.local`
- Check Neon dashboard for connection issues
- Ensure required fields are provided

### CORS Issues
If accessing from browser, add CORS headers in R2 settings or use a server-side upload (current implementation does this).

## Security Considerations

1. **Never commit credentials** to git - use `.env.local` (in `.gitignore`)
2. **Rotate API tokens** regularly
3. **Restrict file types** server-side (PNG, JPG, SVG only)
4. **Validate file sizes** to prevent abuse
5. **Scan uploads** for malware if handling sensitive data
6. **Use HTTPS only** for uploads
7. **Implement rate limiting** (already done in the API route)

## API Endpoint

Submit exhibitions to: `POST /api/submissions/exhibition`

FormData format:
```
firstName: string
lastName: string
email: string
phone: string
message: string (optional)
companyName: string
website: string (optional)
exhibitionPackage: string
immediatePayment: string
logo: File (optional)
```
