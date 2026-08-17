# Coupon System - Quick Start Guide

## ✅ Implementation Complete

All coupon system components have been implemented and are ready to use!

### Files Created/Modified

**API Endpoints:**
- ✅ `app/api/coupons/validate/route.ts` - Validate coupon codes
- ✅ `app/api/coupons/redeem/route.ts` - Record coupon redemptions
- ✅ `app/api/auth/check-registration/route.ts` - Check email registration

**Frontend Components:**
- ✅ `app/components/TicketPurchaseForm.tsx` - Modal form for ticket purchase
- ✅ `app/components/Tickets.tsx` - Updated to open purchase form

**Utilities:**
- ✅ `app/lib/coupons.ts` - Helper functions for coupon operations

**Database Script:**
- ✅ `app/scripts/seed-coupons.ts` - Script to populate test coupons

**Documentation:**
- ✅ `COUPON_SYSTEM_PLAN.md` - Architecture and planning doc
- ✅ `COUPON_IMPLEMENTATION.md` - Complete implementation guide
- ✅ `COUPON_QUICKSTART.md` - This file

---

## 🚀 Getting Started (3 Steps)

### Step 1: Verify Database Tables
The tables will auto-create on first API call, but you can verify manually:

In Neon console (https://console.neon.tech), run:
```sql
-- Verify tables exist
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('coupons', 'coupon_redemptions');
```

### Step 2: Seed Test Coupons
Add this to your `package.json`:
```json
{
  "scripts": {
    "seed:coupons": "ts-node --project tsconfig.json app/scripts/seed-coupons.ts"
  }
}
```

Then run:
```bash
npm run seed:coupons
```

This will create 4 test coupons:
- **EARLYBIRD50** - ₦5,000 off (Fixed)
- **TECH20** - 20% off (Percentage)
- **SPONSOR10** - ₦85,000 off (Free VIP ticket)
- **FRIEND15** - 15% off (Percentage)

### Step 3: Test the Flow

1. Register a test email at `/register`
2. Go to `/tickets` page
3. Click "GET PASS" on any ticket
4. Enter your registered email
5. Try coupon code: `TECH20`
6. See the discount applied!

---

## 📋 System Flow

```
User clicks "GET PASS"
        ↓
Form appears (TicketPurchaseForm)
        ↓
User enters email
        ↓
API: /api/auth/check-registration
        ├─ NOT registered → Error message
        └─ registered → Enable coupon input
        ↓
User enters coupon code
        ↓
Click "Apply"
        ↓
API: /api/coupons/validate
        ├─ Invalid → Show error
        └─ Valid → Show discounted price
        ↓
Click "Pay with Paystack"
        ↓
Payment successful
        ↓
API: /api/coupons/redeem
        └─ Records redemption
        ↓
Form closes, ticket purchased
```

---

## 🔑 Key Features

✅ **Email Registration Check** - Ensures user is registered before using coupons  
✅ **Price Validation** - Discounts calculated on backend (secure)  
✅ **Usage Limits** - Global & per-user redemption limits  
✅ **Expiry Support** - Time-based coupon validity  
✅ **Duplicate Prevention** - Each coupon-email-ticket combo is unique  
✅ **Two Discount Types** - Percentage and fixed amount  
✅ **Real-time Feedback** - Visual confirmation when coupon applies  
✅ **Rate Limiting** - Protection against abuse  

---

## 🔍 Verify Implementation

Check files exist:
```bash
# API Endpoints
test -f app/api/coupons/validate/route.ts && echo "✓ Validate endpoint exists"
test -f app/api/coupons/redeem/route.ts && echo "✓ Redeem endpoint exists"
test -f app/api/auth/check-registration/route.ts && echo "✓ Check registration endpoint exists"

# Components
test -f app/components/TicketPurchaseForm.tsx && echo "✓ Purchase form exists"

# Utilities
test -f app/lib/coupons.ts && echo "✓ Coupon utilities exist"

# Scripts
test -f app/scripts/seed-coupons.ts && echo "✓ Seed script exists"
```

---

## 📊 Database Schema Quick Ref

### `coupons` Table
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL PK | Auto-increment |
| code | VARCHAR(50) UNIQUE | e.g., "TECH20" |
| description | TEXT | "20% off for tech community" |
| discount_type | VARCHAR(20) | PERCENTAGE or FIXED_AMOUNT |
| discount_value | DECIMAL(10,2) | 20 (%) or 5000 (₦) |
| valid_until | TIMESTAMPTZ | Expiry date |
| max_total_redemptions | INT | Global limit |
| current_redemptions | INT | Current usage count |
| max_redemptions_per_user | INT | Per-email limit |
| requires_registration | BOOLEAN | Must be registered? |
| is_active | BOOLEAN | Enabled? |

### `coupon_redemptions` Table
| Column | Type | Notes |
|--------|------|-------|
| id | SERIAL PK | Auto-increment |
| coupon_id | INT FK | References coupons.id |
| email | VARCHAR(255) | User email |
| ticket_id | VARCHAR(255) | Ticket reference |
| discount_amount | DECIMAL(10,2) | Amount saved |
| original_price | DECIMAL(10,2) | Before discount |
| final_price | DECIMAL(10,2) | After discount |
| pass_type | VARCHAR(50) | Regular/Standard/Business/VIP |
| quantity | INT | Number of tickets |
| created_at | TIMESTAMPTZ | Redemption time |

---

## 🧪 Test Queries

Run these in Neon console to verify everything works:

```sql
-- See all coupons
SELECT code, discount_type, discount_value, is_active, current_redemptions 
FROM coupons;

-- See redemptions for a specific coupon
SELECT cr.*, c.code 
FROM coupon_redemptions cr
JOIN coupons c ON cr.coupon_id = c.id
ORDER BY cr.created_at DESC;

-- Count redemptions per coupon
SELECT c.code, COUNT(cr.id) as redemptions
FROM coupons c
LEFT JOIN coupon_redemptions cr ON c.id = cr.coupon_id
GROUP BY c.id;

-- Check if user has used a coupon
SELECT * FROM coupon_redemptions 
WHERE email = 'test@example.com' 
AND coupon_id = (SELECT id FROM coupons WHERE code = 'TECH20');
```

---

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Email not registered" | Register at `/register` first |
| Coupon not found | Check exact code (case matters in DB) |
| Discount not showing | Verify coupon `is_active = true` and not expired |
| Payment fails | Ensure Paystack key is set in `.env.local` |
| Duplicate redemption error | User already redeemed this coupon-ticket combo |

---

## 📚 Documentation

- **`COUPON_SYSTEM_PLAN.md`** - System architecture & planning
- **`COUPON_IMPLEMENTATION.md`** - Detailed API & component docs
- **`COUPON_QUICKSTART.md`** - This quick start guide

---

## ✨ Next Features (Optional)

- [ ] Admin dashboard to create/manage coupons
- [ ] Coupon code suggestions in form
- [ ] Email notifications on coupon usage
- [ ] Coupon analytics/reporting
- [ ] Bulk coupon code generation
- [ ] QR code for coupon sharing

---

## 💡 Testing Checklist

- [ ] Registered test email at `/register`
- [ ] Opened `/tickets` page
- [ ] Clicked "GET PASS" button
- [ ] Email validation worked (checked registration)
- [ ] Applied test coupon `TECH20`
- [ ] Discount calculated correctly
- [ ] Payment initialized with discounted amount
- [ ] Coupon recorded in database after payment
- [ ] Tried to reuse same coupon (should fail)

---

## 🎉 You're All Set!

The coupon system is fully implemented and ready to use. Start by testing with the seed coupons!

**Questions?** Check the detailed docs:
- Implementation details → `COUPON_IMPLEMENTATION.md`
- System design → `COUPON_SYSTEM_PLAN.md`
