# Discount Coupon System Plan

## Overview
A comprehensive coupon system that allows customers to apply discount codes when purchasing tickets, with full validation, tracking, and admin control.

## System Architecture

### 1. Database Schema

#### `coupons` Table
```sql
CREATE TABLE coupons (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  discount_type ENUM('PERCENTAGE', 'FIXED_AMOUNT') NOT NULL,
  discount_value DECIMAL(10, 2) NOT NULL,
  -- PERCENTAGE: 10 means 10%
  -- FIXED_AMOUNT: 5000 means ₦5,000
  
  -- Scope (all pass types)
  applicable_to_all_passes BOOLEAN DEFAULT true,
  
  -- Validation
  valid_from TIMESTAMP,
  valid_until TIMESTAMP,
  max_total_redemptions INT,
  current_redemptions INT DEFAULT 0,
  max_redemptions_per_user INT DEFAULT 1,
  
  -- Requirements
  requires_registration BOOLEAN DEFAULT true,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(coupon_id, email, ticket_id)
);
```

---

## Workflow

### Step 1: Ticket Purchase Form
```
User fills in: Email, Name, Number of Tickets
                         ↓
User clicks "Buy Tickets" → Navigates to coupon application page
```

### Step 2: Email & Registration Check
```
Email input
    ↓
API Check: `/api/auth/check-registration?email=...`
    ├─ If NOT registered → Show message "Register first at /register"
    └─ If registered → Proceed to ticket selection
```

### Step 3: Coupon Application
```
User enters coupon code (optional)
    ↓
Frontend validation:
    ├─ Check if code exists
    ├─ Check if code is active
    └─ Check if code hasn't expired
    ↓
Backend validation via `/api/coupons/validate`:
    ├─ Verify code exists & is active
    ├─ Check expiry dates (valid_from, valid_until)
    ├─ Check user hasn't exceeded max redemptions
    ├─ Check global redemption limit not exceeded
    ├─ Check email is registered (if required)
    └─ Calculate discount & return final prices
    ↓
Display updated prices with discount breakdown
```

### Step 4: Payment Processing
```
User clicks "Pay with Paystack"
    ↓
Create order with:
    ├─ Email
    ├─ Name
    ├─ Ticket type & quantity
    ├─ Coupon code (if applied)
    ├─ Original price
    ├─ Discount amount
    └─ Final price (what Paystack charges)
    ↓
Initialize Paystack payment
    ↓
On successful payment:
    └─ Record coupon redemption in DB
        └─ Increment coupon's `current_redemptions`
```

---

## API Endpoints

### 1. Validate Coupon
**POST** `/api/coupons/validate`
```json
{
  "code": "TECH20",
  "email": "user@example.com",
  "pass_type": "Standard",
  "quantity": 2,
  "original_price": 20000
}
```

**Response:**
```json
{
  "valid": true,
  "coupon": {
    "code": "TECH20",
    "discount_type": "PERCENTAGE",
    "discount_value": 20,
    "description": "20% off for tech community"
  },
  "discount_amount": 4000,
  "final_price": 16000,
  "final_price_total": 32000,
  "message": "Coupon applied successfully!"
}
```

### 2. Get Active Coupons (Optional - for displaying available discounts)
**GET** `/api/coupons/active`

**Response:**
```json
{
  "coupons": [
    {
      "code": "EARLY50",
      "description": "Early bird - ₦5,000 off",
      "discount_type": "FIXED_AMOUNT",
      "discount_value": 5000
    }
  ]
}
```

### 3. Record Coupon Redemption
**POST** `/api/coupons/redeem` (called after successful payment)
```json
{
  "coupon_code": "TECH20",
  "email": "user@example.com",
  "ticket_id": "TKT_123456",
  "pass_type": "Standard",
  "quantity": 2,
  "discount_amount": 4000,
  "original_price": 20000,
  "final_price": 16000
}
```

---

## Frontend Components

### 1. Coupon Input Component
- Text input for coupon code
- "Apply Coupon" button
- Loading state while validating
- Error/success messages
- Display discount breakdown

### 2. Price Display Component
- Original price (struck through if discount applied)
- Discount amount & percentage
- Final price (bold/highlighted)
- Clear visual hierarchy

### 3. Integration Points
- **Ticket Selection Form**: Add coupon input section
- **Order Summary**: Show price breakdown before payment
- **Paystack Integration**: Pass `final_price` (discounted) to payment

---

## Coupon Types & Examples

### Example 1: Early Bird (Fixed Amount)
```
code: "EARLY50"
discount_type: FIXED_AMOUNT
discount_value: 5000
valid_until: 2024-09-15
max_total_redemptions: 100
description: "₦5,000 off any ticket"
```

### Example 2: Community Discount (Percentage)
```
code: "TECH20"
discount_type: PERCENTAGE
discount_value: 20
valid_from: 2024-08-01
valid_until: 2024-12-31
max_total_redemptions: 500
max_redemptions_per_user: 3
description: "20% off for tech community members"
```

### Example 3: Free Ticket (Special)
```
code: "SPONSOR10"
discount_type: FIXED_AMOUNT
discount_value: 35000  (covers Regular ₦3,500 × 10)
max_total_redemptions: 10
max_redemptions_per_user: 1
description: "Free tickets for sponsors"
```

---

## Security & Validation Checks

### Frontend (UX only - not secure)
- ✓ Format validation (alphanumeric, length)
- ✓ Real-time feedback

### Backend (REQUIRED - security)
- ✓ Verify code exists & is active
- ✓ Check valid date range
- ✓ Check total redemption limit
- ✓ Check per-user redemption limit (query DB for user's redemptions)
- ✓ Verify email is registered (call to registration check)
- ✓ Prevent duplicate redemptions (UNIQUE constraint)
- ✓ Prevent price manipulation (recalculate server-side)
- ✓ Rate limit coupon validation endpoint
- ✓ Log all coupon usage for audit trail

---

## Admin Management (Optional Phase 2)

Future dashboard features:
- Create/edit/delete coupons
- View redemption analytics
- Deactivate coupons mid-campaign
- Export coupon usage reports

---

## Implementation Phases

### Phase 1: Core System
1. ✓ Database schema setup
2. ✓ API endpoint: `/api/coupons/validate`
3. ✓ API endpoint: `/api/coupons/redeem`
4. ✓ Frontend coupon input component
5. ✓ Integrate with existing ticket form

### Phase 2: UI & UX
1. Price breakdown display
2. Coupon suggestions/hints
3. Success/error animations

### Phase 3: Admin (Optional)
1. Admin dashboard to manage coupons
2. Analytics & reports

---

## Data Flow Diagram

```
┌─────────────────┐
│  User Email     │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────┐
│ Check: Registered?              │ → DB: registrations table
│ `/api/auth/check-registration`  │
└────────┬────────────────────────┘
         │
    YES  │  NO
    ┌────┴───────────────────┐
    │                        │
    ▼                        ▼
┌─────────────┐         ┌──────────────┐
│ Proceed     │         │ Show Error:  │
│ to Tickets  │         │ Register 1st │
└────┬────────┘         └──────────────┘
     │
     ▼
┌──────────────────────┐
│ User enters Coupon   │
│ Code (Optional)      │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ API: /api/coupons/validate       │ → DB: coupons table
│ ├─ Check existence               │ → DB: coupon_redemptions table
│ ├─ Check active & dates          │
│ ├─ Check redemption limits       │
│ └─ Calculate discount            │
└──────┬───────────────────────────┘
       │
       ▼
┌──────────────────────┐
│ Display Results:     │
│ - Original Price     │
│ - Discount Amount    │
│ - Final Price        │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│ User Pays (Paystack) │
│ Amount: Final Price  │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ On Success:                      │
│ POST /api/coupons/redeem         │ → DB: coupon_redemptions insert
│ ├─ Record redemption             │ → DB: coupons.current_redemptions++
│ └─ Update coupon counter         │
└──────────────────────────────────┘
```

---

## Next Steps

1. **Confirm this plan** - Any changes to requirements?
2. **Set up database** - Create tables in your DB
3. **Create API endpoints** - Build validation & redemption logic
4. **Update ticket form** - Add coupon input component
5. **Test end-to-end** - Create test coupons & validate flow
