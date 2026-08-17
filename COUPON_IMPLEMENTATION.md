# Coupon System Implementation Guide

## ✅ What's Been Implemented

### 1. **API Endpoints**

#### `/api/coupons/validate` (POST)
Validates a coupon code and calculates the discount
- Checks if code exists and is active
- Validates date ranges (valid_from, valid_until)
- Checks per-user redemption limit
- Checks global redemption limit
- Verifies registration requirement
- Calculates and returns discount amount

**Request:**
```json
{
  "code": "TECH20",
  "email": "user@example.com",
  "quantity": 2,
  "original_price": 10000
}
```

**Response (Success):**
```json
{
  "valid": true,
  "coupon": {
    "code": "TECH20",
    "discount_type": "PERCENTAGE",
    "discount_value": 20,
    "description": "20% off for tech community"
  },
  "discount_amount": 2000,
  "final_price": 8000,
  "final_price_total": 16000,
  "message": "Coupon applied successfully! You saved ₦2000"
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "discount_amount": 0,
  "final_price": 10000,
  "final_price_total": 20000,
  "message": "Coupon has expired",
  "error": "This coupon is no longer valid"
}
```

---

#### `/api/coupons/redeem` (POST)
Records a coupon redemption after successful payment
- Verifies coupon exists
- Checks for duplicate redemptions
- Records redemption in database
- Increments coupon's redemption counter

**Request:**
```json
{
  "coupon_code": "TECH20",
  "email": "user@example.com",
  "ticket_id": "TKT_1234567890",
  "pass_type": "Standard",
  "quantity": 2,
  "discount_amount": 2000,
  "original_price": 20000,
  "final_price": 18000
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Coupon successfully redeemed",
  "redemption_id": 42
}
```

---

#### `/api/auth/check-registration` (GET)
Checks if an email is registered in the system
- Queries the btf-registration table
- Returns user info if found

**Request:**
```
GET /api/auth/check-registration?email=user@example.com
```

**Response (Registered):**
```json
{
  "registered": true,
  "user": {
    "name": "John Doe",
    "email": "user@example.com"
  },
  "message": "Email is registered"
}
```

**Response (Not Registered):**
```json
{
  "registered": false,
  "message": "Email is not registered"
}
```

---

### 2. **Database Schema**

#### `coupons` Table
```sql
CREATE TABLE coupons (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    discount_type VARCHAR(20) CHECK (discount_type IN ('PERCENTAGE', 'FIXED_AMOUNT')),
    discount_value DECIMAL(10, 2),
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    max_total_redemptions INT,
    current_redemptions INT DEFAULT 0,
    max_redemptions_per_user INT DEFAULT 1,
    requires_registration BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `coupon_redemptions` Table
```sql
CREATE TABLE coupon_redemptions (
    id SERIAL PRIMARY KEY,
    coupon_id INT REFERENCES coupons(id),
    email VARCHAR(255) NOT NULL,
    ticket_id VARCHAR(255),
    discount_amount DECIMAL(10, 2),
    original_price DECIMAL(10, 2),
    final_price DECIMAL(10, 2),
    pass_type VARCHAR(50),
    quantity INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(coupon_id, email, ticket_id)
);
```

---

### 3. **Frontend Components**

#### `TicketPurchaseForm.tsx`
A modal form component that handles:
- Email validation with registration check
- Ticket quantity selection
- Coupon code application
- Price breakdown display
- Paystack payment initialization
- Coupon redemption after payment

**Props:**
```typescript
interface TicketPurchaseFormProps {
  passName: string;           // e.g., "Standard"
  passPrice: number;          // e.g., 10000 (in naira)
  onClose: () => void;        // Called when form closes
  onPaymentSuccess?: (ticketId: string) => void;  // Called on payment success
}
```

#### Updated `Tickets.tsx`
- Tracks selected pass state
- Opens `TicketPurchaseForm` when "GET PASS" button is clicked
- Passes both pass name and price to the form

---

### 4. **Utility Functions** (`lib/coupons.ts`)

```typescript
// Check if email is registered
await checkRegistration(email: string): RegistrationCheckResult

// Validate coupon code
await validateCoupon(code: string, email: string, quantity: number, price: number): CouponValidationResult

// Record coupon redemption after payment
await redeemCoupon(...): CouponRedemptionResult

// Format discount message
formatDiscountMessage(coupon: CouponData, discountAmount: number): string

// Format price display
formatPrice(price: number): string
```

---

## 🧪 Testing the System

### Step 1: Seed Test Coupons
Run this command to insert test coupons into your database:
```bash
npm run seed:coupons
```

Or add this script to your `package.json`:
```json
{
  "scripts": {
    "seed:coupons": "ts-node --project tsconfig.json app/scripts/seed-coupons.ts"
  }
}
```

### Step 2: Test Coupons Available

| Code | Discount | Type | Max Uses | Per User | Expires |
|------|----------|------|----------|----------|---------|
| `EARLYBIRD50` | ₦5,000 off | Fixed | 100 | 1 | 30 days |
| `TECH20` | 20% off | Percentage | 500 | 3 | 60 days |
| `SPONSOR10` | ₦85,000 off (VIP free) | Fixed | 10 | 1 | 90 days |
| `FRIEND15` | 15% off | Percentage | 300 | 2 | 45 days |

### Step 3: Manual Testing Flow

1. **Register First**
   - Go to `/register`
   - Submit the registration form with your test email
   - This creates a record in `btf-registration` table

2. **Buy a Ticket**
   - Go to `/tickets`
   - Click "GET PASS" on any ticket
   - Enter your registered email
   - The form should show "✓ Email is registered"

3. **Apply a Coupon**
   - Enter a test coupon code (e.g., `TECH20`)
   - Click "Apply"
   - The form should show the discount breakdown
   - Price should update to reflect the discount

4. **Complete Payment**
   - Fill in name and quantity
   - Click "Pay with Paystack"
   - Complete the payment flow
   - On success:
     - Coupon redemption is recorded
     - `current_redemptions` count increases
     - Modal closes

### Step 4: Verify Database

Check that data was inserted correctly:

```sql
-- View all coupons
SELECT * FROM coupons;

-- View specific coupon
SELECT * FROM coupons WHERE code = 'TECH20';

-- View redemptions
SELECT * FROM coupon_redemptions;

-- Check current usage of a coupon
SELECT 
    c.code,
    c.current_redemptions,
    c.max_total_redemptions,
    COUNT(cr.id) as verified_count
FROM coupons c
LEFT JOIN coupon_redemptions cr ON c.id = cr.coupon_id
GROUP BY c.id;
```

---

## 🔒 Security Features

✅ **Backend Validation**
- All validations happen on server (not trusting frontend)
- Coupon code is case-insensitive but stored uppercase
- Price is recalculated server-side (client can't manipulate)

✅ **Rate Limiting**
- All endpoints use existing rate limit middleware
- Prevents coupon code guessing/brute force

✅ **Database Constraints**
- Unique coupon codes
- UNIQUE constraint on redemptions (coupon_id + email + ticket_id)
- Foreign key relationships ensure referential integrity

✅ **Email Verification**
- Coupons requiring registration check user is in btf-registration table
- Prevents unauthorized coupon usage

---

## 📊 Admin Management (Future Enhancement)

To add admin coupon management later:

```typescript
// Create coupon
POST /api/admin/coupons
{
  "code": "NEW100",
  "discount_type": "FIXED_AMOUNT",
  "discount_value": 100,
  "valid_until": "2024-12-31T23:59:59Z",
  "max_total_redemptions": 50
}

// Update coupon
PATCH /api/admin/coupons/:id
{ "is_active": false }  // Deactivate coupon

// Get coupon stats
GET /api/admin/coupons/:id/stats
{
  "code": "TECH20",
  "total_redemptions": 45,
  "max_total_redemptions": 500,
  "revenue_discount": 45000,
  "last_redeemed": "2024-08-17T10:30:00Z"
}
```

---

## 🐛 Troubleshooting

**Problem:** "Email not registered" error
- **Solution:** User needs to register at `/register` first

**Problem:** Coupon code not found
- **Solution:** Check code is exactly correct (case-insensitive on frontend, but verify in DB)

**Problem:** Discount not applying
- **Solution:** Check:
  - Is coupon active? (`is_active = true`)
  - Is coupon expired? (check `valid_until` date)
  - Has user exceeded per-user limit? (query `coupon_redemptions` table)
  - Has global limit been reached? (check `current_redemptions >= max_total_redemptions`)

**Problem:** Payment initializes but Paystack shows wrong amount
- **Solution:** Ensure `/api/payments/initialize` receives the discounted `total_price`

---

## 📁 File Structure

```
app/
├── api/
│   ├── auth/
│   │   └── check-registration/
│   │       └── route.ts          # ✅ NEW
│   ├── coupons/
│   │   ├── validate/
│   │   │   └── route.ts          # ✅ NEW
│   │   └── redeem/
│   │       └── route.ts          # ✅ NEW
│   └── payments/
│       └── initialize/
│           └── route.ts          # (already exists)
├── components/
│   ├── Tickets.tsx               # ✅ UPDATED
│   └── TicketPurchaseForm.tsx     # ✅ NEW
├── lib/
│   └── coupons.ts                # ✅ NEW
└── scripts/
    └── seed-coupons.ts           # ✅ NEW
```

---

## ✨ Next Steps

1. ✅ Run `npm run seed:coupons` to add test data
2. ✅ Go to `/register` and register a test email
3. ✅ Go to `/tickets` and click "GET PASS"
4. ✅ Test the coupon flow with test coupons
5. ⭐ Create admin panel for coupon management (optional)
6. ⭐ Add coupon code suggestions/display (optional)
7. ⭐ Add email notifications on coupon application (optional)
