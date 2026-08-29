# IVORY SILK COLLECTIVE

## Production Blueprint v2.0

> **Luxury Digital Marketplace**
> **“Digital Crowns For Creative Minds.”**

**Status:** Production Build Blueprint
**Architecture:** Guest-First / Server-Driven / Supabase
**Primary Market:** Nigeria + International

---

# 1. PRODUCT VISION

Ivory Silk Collective is a premium digital marketplace for discovering and purchasing beautifully designed digital products.

The marketplace sells:

* Canva Templates
* Notion Templates
* Lightroom Presets
* LUTs
* Fonts
* E-books
* Branding Kits
* UI Kits
* Mockups
* Social Media Templates
* Website Templates
* Figma Files
* Digital Courses
* Digital Assets
* Bundles

The experience should feel:

**Luxury · Editorial · Minimal · Calm · Intelligent · Premium**

It should never feel like a generic template marketplace.

The design language should feel closer to a luxury fashion/editorial publication than a conventional SaaS dashboard.

---

# 2. CORE PRODUCT PRINCIPLE

## Guest First

Customers do **not** need an account to purchase.

The primary flow is:

```text
Discover
   ↓
Product
   ↓
Add to Cart
   ↓
Checkout
   ↓
Enter Email + Customer Details
   ↓
Pay
   ↓
Payment Verification
   ↓
Order Created
   ↓
Secure Download
   ↓
Receipt + Download Email
```

No:

* forced registration
* login wall
* password creation
* customer dashboard
* customer authentication system

The customer simply provides the information required to complete the purchase.

---

# 3. CUSTOMER MODEL

Customers are created automatically from successful checkout information.

Example:

```text
Customer
├── id
├── email
├── firstName
├── lastName
├── phone
├── country
├── totalOrders
├── totalSpent
├── firstPurchaseAt
├── lastPurchaseAt
├── createdAt
└── updatedAt
```

The customer does **not** authenticate.

The admin dashboard becomes the source of truth for customer history.

### Customer identity

Primary identifier:

```text
email
```

Secondary identifiers:

```text
phone
name
```

If an existing email purchases again, associate the new order with the existing customer record.

---

# 4. CUSTOMER EXPERIENCE

Customers should have access to:

### Before purchase

* Browse products
* Search
* Filter
* Sort
* Wishlist
* Cart
* Product previews
* Reviews
* Collections
* Creator information

### During purchase

* Guest checkout
* Minimal checkout form
* Paystack payment
* Order summary
* Coupon
* Terms acceptance

### After purchase

* Order confirmation
* Secure download
* Download email
* Receipt
* Order reference
* Download access page

There is **no customer account dashboard**.

---

# 5. ORDER ACCESS WITHOUT ACCOUNTS

Because there are no customer accounts, order access must use secure tokenized URLs.

Example:

```text
/order/success/[orderReference]

/downloads/[secureToken]

/order/[secureOrderToken]
```

Tokens must:

* be cryptographically random
* never expose database IDs
* expire where appropriate
* be revocable
* be rate limited

Customers can access their purchase from:

1. The post-payment success page
2. Their email receipt
3. Their secure download email

---

# 6. DESIGN SYSTEM

## Brand Colors

### Primary

```text
Ivory
#F9F6F2
```

### Primary Dark

```text
Deep Black
#171717
```

### Accent

```text
Luxury Gold
#B68C45
```

### Neutrals

```text
#FFFFFF
#F5F5F5
#ECECEC
#A0A0A0
```

---

# 7. TYPOGRAPHY

## Display

Preferred:

```text
Canela
```

Fallback:

```text
Cormorant Garamond
Playfair Display
```

## Body

Preferred:

```text
Inter
```

Alternative:

```text
Manrope
```

Typography should emphasize:

* editorial hierarchy
* generous whitespace
* large display headings
* restrained body text
* elegant contrast between serif and sans-serif

---

# 8. UI SYSTEM

## Mandatory

**shadcn/ui**

Use shadcn as the foundation for interactive UI components.

Components should include:

* Button
* Input
* Label
* Select
* Checkbox
* Dialog
* Sheet
* Drawer
* Dropdown Menu
* Tooltip
* Tabs
* Accordion
* Alert
* Badge
* Card
* Separator
* Skeleton
* Toast
* Sonner
* Command
* Pagination
* Breadcrumb
* Form

Do not build duplicate primitive components unnecessarily.

Customize shadcn components to match the Ivory Silk design system.

The final UI should **not look like default shadcn**.

---

# 9. DESIGN SKILLS

The implementation should use three complementary design/code philosophies.

## Taste

Responsible for:

* visual hierarchy
* typography
* spacing
* composition
* proportion
* color
* premium aesthetics
* editorial quality
* visual consistency

---

## Impeccable

Responsible for:

* architecture
* maintainability
* accessibility
* semantic HTML
* responsive behavior
* performance
* code quality
* error handling
* edge cases
* production readiness

---

## Emil Kowalski

Responsible for:

* interaction quality
* micro-interactions
* motion
* hover states
* transitions
* spring animations
* elegant feedback
* interaction choreography

Motion should remain:

**subtle · intentional · smooth · restrained**

Never animate everything.

---

# 10. FIGMA IMPLEMENTATION STRATEGY

The Figma design is the **visual reference**, not a command to blindly reproduce every pixel.

Before coding:

### Step 1

Analyze the Figma design.

Identify:

* layout
* spacing
* typography
* colors
* components
* grids
* imagery
* responsive behavior
* interaction patterns

### Step 2

Create a component map.

Example:

```text
Header
├── AnnouncementBar
├── Logo
├── Navigation
├── Search
├── Wishlist
└── Cart

Hero
├── Eyebrow
├── Heading
├── Description
├── CTA
└── Visual

ProductCard
├── Image
├── Badge
├── Title
├── Creator
├── Price
└── QuickAdd
```

### Step 3

Build the design system.

### Step 4

Build reusable components.

### Step 5

Build pages from those components.

### Step 6

Apply motion.

### Step 7

Perform a responsive and accessibility pass.

---

# 11. TECH STACK

## Frontend

```text
Next.js 15
React 19
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
GSAP
React Hook Form
Zod
Embla Carousel
```

GSAP should only be introduced when Framer Motion cannot reasonably achieve the required interaction.

---

# 12. BACKEND

Use:

```text
Next.js Route Handlers
Server Actions where appropriate
Supabase
```

Do **not** use Prisma.

Do **not** introduce a second ORM.

Supabase PostgreSQL is the application's database.

---

# 13. DATABASE

## Core Tables

```text
customers
products
product_variants
categories
collections
orders
order_items
payments
downloads
coupons
coupon_redemptions
wishlists
reviews
newsletter_subscribers
blog_posts
blog_categories
homepage_sections
faqs
announcements
support_tickets
audit_logs
admin_users
settings
```

---

# 14. CUSTOMER TABLE

```text
customers

id
email
first_name
last_name
phone
country
total_orders
total_spent
first_purchase_at
last_purchase_at
created_at
updated_at
```

Email should have an appropriate uniqueness strategy.

Customers are automatically created/updated during successful order processing.

---

# 15. PRODUCT MODEL

Products should support multiple digital product types.

```text
product_type

DIGITAL_DOWNLOAD
BUNDLE
COURSE
FREE_DOWNLOAD
LIMITED_EDITION
```

Product fields:

```text
id
slug
name
short_description
description
price
compare_at_price
currency
product_type
category_id
creator_id
status
featured
best_seller
new_arrival
rating
review_count
created_at
updated_at
```

---

# 16. DIGITAL ASSETS

Never expose private downloadable files publicly.

Marketing/preview assets:

```text
Cloudinary
```

Private downloadable assets:

```text
Supabase Storage
Private Bucket
```

Example:

```text
products/private/
    product-file.zip
    bonus-file.pdf
```

Customers should never receive the raw storage URL.

---

# 17. SECURE DOWNLOAD SYSTEM

Flow:

```text
Payment Confirmed
        ↓
Order Created
        ↓
Order Items Created
        ↓
Download Records Created
        ↓
Secure Download Token Generated
        ↓
Customer Receives Download Link
```

Download record:

```text
id
order_id
order_item_id
token
expires_at
download_limit
download_count
revoked
created_at
```

Example configuration:

```text
Maximum downloads: 5
Link expiration: configurable
```

Admins can:

* regenerate links
* revoke access
* increase download limit
* resend download email

---

# 18. PAYMENT ARCHITECTURE

## Paystack

Supported payment methods should depend on what Paystack currently enables for the account/country.

Primary flow:

```text
Checkout
   ↓
Initialize Payment
   ↓
Paystack
   ↓
Payment Callback
   ↓
Server Verification
   ↓
Webhook Verification
   ↓
Confirm Transaction
   ↓
Create/Update Customer
   ↓
Create Order
   ↓
Create Downloads
   ↓
Send Email
```

Never fulfill an order solely because the frontend says payment succeeded.

---

# 19. PAYMENT SECURITY

The server must verify:

* transaction reference
* payment status
* amount
* currency
* order/customer relationship
* webhook signature
* transaction uniqueness

Webhook processing must be idempotent.

A payment event must never create duplicate orders.

---

# 20. CHECKOUT

Checkout should be extremely fast.

## Step 1 — Customer Information

Required:

```text
First name
Last name
Email
Country
```

Optional:

```text
Phone
```

No account creation.

No password.

No unnecessary address fields for purely digital products.

---

## Step 2 — Order Summary

Display:

* products
* quantity
* subtotal
* discount
* tax where applicable
* total

---

## Step 3 — Payment

Paystack.

---

## Step 4 — Confirmation

Display:

```text
Payment Successful
Order Reference
Download Your Products
```

---

# 21. CART

Cart should work for guests.

Storage strategy:

```text
localStorage
```

Cart contents:

```text
productId
variantId
quantity
```

The server must revalidate:

* product existence
* product status
* price
* availability
* discount
* currency

Never trust prices coming from localStorage.

---

# 22. WISHLIST

Wishlist is guest-only.

Store locally:

```text
localStorage
```

Features:

* Add to wishlist
* Remove
* Move to cart
* Share wishlist

No account synchronization.

---

# 23. SEARCH

Use:

```text
Algolia
```

Features:

* instant search
* autocomplete
* typo tolerance
* categories
* collections
* creator
* product type
* price
* popularity

Search should feel instant.

---

# 24. SHOP

Features:

* Product grid
* Search
* Category filter
* Collection filter
* Product type
* Price
* Rating
* Newest
* Best selling
* Alphabetical
* Grid/List toggle

Use URL search parameters so filters are:

* shareable
* bookmarkable
* SEO-friendly

---

# 25. PRODUCT PAGE

Structure:

```text
Product Gallery
        ↓
Product Information
        ↓
Price
        ↓
Add to Cart / Buy Now
        ↓
What's Included
        ↓
Product Description
        ↓
Features
        ↓
License
        ↓
Creator
        ↓
Reviews
        ↓
FAQ
        ↓
Related Products
```

Include:

* high-quality previews
* zoom
* product video where appropriate
* creator
* license information
* compatibility information
* file formats
* what's included
* file size
* reviews

---

# 26. HOMEPAGE

## Hero

Editorial luxury hero.

Include:

* strong headline
* concise supporting copy
* primary CTA
* secondary CTA
* premium visual

---

## New Arrivals

Curated product selection.

---

## Featured Collections

Large editorial cards.

---

## Editor's Picks

Curated products.

---

## Trending

Popular products.

---

## Creator Spotlight

Highlight creators and their work.

---

## Categories

Visual category navigation.

---

## Benefits

Example:

```text
Instant Access
Secure Checkout
Curated Quality
Lifetime Access
```

---

## Testimonials

Customer social proof.

---

## Editorial / Journal

Content and creator stories.

---

## Newsletter

Minimal premium signup.

---

# 27. COLLECTIONS

Initial collections:

```text
Branding
Templates
Business
Productivity
Photography
Social Media
Marketing
Design
Fonts
Bundles
```

Collections should be CMS-controlled.

---

# 28. ADMIN DASHBOARD

The admin dashboard becomes the operational center of the business.

## Dashboard

* Revenue
* Orders
* Customers
* Downloads
* Products
* Conversion rate
* Average order value
* Best sellers
* Recent orders
* Failed payments
* Refunds

---

# 29. ADMIN CUSTOMERS

Because there are no customer accounts, this section becomes especially important.

Admin can view:

```text
Customer
Email
Phone
Country
Orders
Total Spent
First Purchase
Last Purchase
Downloads
```

Customer detail page:

```text
Customer Information
        ↓
Order History
        ↓
Purchased Products
        ↓
Download History
        ↓
Total Revenue
        ↓
Support History
```

Admin can:

* view customer
* search customer
* view orders
* resend receipts
* resend downloads
* revoke downloads
* restore download access
* add internal notes

---

# 30. ADMIN ORDERS

Order statuses:

```text
PENDING
PAID
PROCESSING
FULFILLED
REFUNDED
PARTIALLY_REFUNDED
CANCELLED
FAILED
```

Admin can:

* view order
* inspect payment
* resend receipt
* resend download
* revoke download
* refund
* view customer
* view transaction reference

---

# 31. ADMIN PRODUCTS

Admin can:

* create
* edit
* duplicate
* archive
* delete
* upload preview images
* upload downloadable files
* set pricing
* assign category
* assign collections
* manage creators
* configure license
* configure download limits
* configure featured status

---

# 32. ADMIN CONTENT MANAGEMENT

CMS:

```text
Homepage
Hero
Collections
Featured Products
Announcements
Blog
FAQ
About
Policies
Newsletter
```

Homepage sections should be reorderable.

---

# 33. REVIEWS

Only customers associated with completed orders can submit reviews.

Review:

```text
rating
title
body
images
customer
product
order
status
created_at
```

Admin moderation:

```text
Pending
Approved
Rejected
```

---

# 34. COUPONS

Support:

```text
Percentage discount
Fixed discount
Product-specific
Category-specific
Collection-specific
Minimum order value
Maximum usage
Expiration
Start date
```

Coupon validation must happen server-side.

---

# 35. EMAIL SYSTEM

Use:

```text
Resend
```

Transactional emails:

```text
Order Confirmation
Payment Confirmation
Download Ready
Download Link
Refund Confirmation
Support Reply
```

Marketing:

```text
Newsletter
Promotional Campaigns
Abandoned Cart
```

Emails should be beautifully branded.

---

# 36. ABANDONED CART

Because customers are guests, abandoned-cart recovery should use the email captured during checkout.

Only send recovery emails when the customer has voluntarily provided their email and the applicable consent/legal requirements are satisfied.

---

# 37. ANALYTICS

Integrate:

```text
Google Analytics
Microsoft Clarity
Meta Pixel
TikTok Pixel
```

Track:

```text
product_view
search
add_to_cart
begin_checkout
payment_started
purchase
download
wishlist_add
coupon_used
```

Admin analytics:

```text
Revenue
Orders
Conversion Rate
Average Order Value
Top Products
Top Categories
Top Collections
Traffic Sources
Abandoned Checkout
Download Activity
```

---

# 38. SEO

Implement:

* Metadata API
* Dynamic metadata
* OpenGraph
* Twitter/X cards
* sitemap
* robots
* canonical URLs
* Schema.org
* Product schema
* Breadcrumb schema
* Article schema
* Organization schema

Product pages must be indexable.

---

# 39. PERFORMANCE

Use:

```text
React Server Components
Next.js Image
Lazy loading
Dynamic imports
Streaming
Suspense
Caching
ISR where appropriate
Prefetching
Optimistic UI
Skeleton states
```

Avoid unnecessary client components.

Use client-side React only where interactivity actually requires it.

---

# 40. ACCESSIBILITY

Target:

**WCAG 2.2 AA**

Requirements:

* keyboard navigation
* visible focus states
* semantic HTML
* accessible forms
* labels
* ARIA only when necessary
* sufficient contrast
* reduced-motion support
* screen-reader compatibility

---

# 41. SECURITY

Implement:

* Supabase Row Level Security
* server-side authorization
* rate limiting
* input validation
* Zod validation
* XSS protection
* CSRF protection where applicable
* secure cookies where applicable
* webhook verification
* signed download URLs
* private storage buckets
* environment validation
* audit logging

Never expose:

```text
Supabase service role key
Paystack secret key
private storage credentials
admin secrets
```

to the client.

---

# 42. ADMIN AUTHENTICATION

Customer authentication is removed.

Admin authentication remains mandatory.

Admin roles:

```text
SUPER_ADMIN
ADMIN
EDITOR
SUPPORT
```

Permissions should be role-based.

---

# 43. DATABASE ARCHITECTURE

Supabase PostgreSQL is the single database.

No Prisma.

No separate ORM.

No duplicated database abstraction.

Application:

```text
Next.js
      ↓
Server Actions / Route Handlers
      ↓
Supabase
      ↓
PostgreSQL
```

Storage:

```text
Cloudinary → public/preview/media
Supabase Storage → private/downloadable files
```

---

# 44. APPLICATION ARCHITECTURE

Recommended:

```text
app/
├── (store)/
│   ├── page.tsx
│   ├── shop/
│   ├── collections/
│   ├── category/
│   ├── product/
│   ├── cart/
│   ├── checkout/
│   ├── wishlist/
│   ├── search/
│   ├── about/
│   ├── blog/
│   ├── faq/
│   └── contact/
│
├── order/
│   ├── success/
│   └── [token]/
│
├── downloads/
│   └── [token]/
│
├── admin/
│   ├── dashboard/
│   ├── orders/
│   ├── products/
│   ├── customers/
│   ├── categories/
│   ├── collections/
│   ├── coupons/
│   ├── reviews/
│   ├── downloads/
│   ├── analytics/
│   ├── content/
│   ├── support/
│   └── settings/
│
├── api/
│   ├── payments/
│   ├── webhooks/
│   ├── downloads/
│   ├── search/
│   └── checkout/
│
└── ...
```

---

# 45. COMPONENT ARCHITECTURE

```text
components/
├── ui/
│   └── shadcn components
│
├── layout/
│   ├── Header
│   ├── Footer
│   ├── MobileNav
│   └── AnnouncementBar
│
├── commerce/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── ProductGallery
│   ├── Price
│   ├── CartDrawer
│   ├── WishlistButton
│   └── AddToCart
│
├── checkout/
│   ├── CheckoutForm
│   ├── OrderSummary
│   ├── PaymentSection
│   └── CheckoutSuccess
│
├── editorial/
│   ├── Hero
│   ├── CollectionCard
│   ├── CreatorSpotlight
│   └── EditorialSection
│
└── admin/
    ├── DataTable
    ├── StatCard
    ├── OrderStatus
    └── CustomerPanel
```

---

# 46. FEATURE ARCHITECTURE

Use feature-oriented organization where appropriate:

```text
features/
├── products/
├── cart/
├── checkout/
├── payments/
├── downloads/
├── customers/
├── orders/
├── wishlist/
├── reviews/
├── coupons/
├── search/
├── analytics/
└── admin/
```

Each feature should contain its relevant:

```text
components
actions
queries
mutations
schemas
types
utils
```

---

# 47. SERVER / CLIENT RULE

Default:

```text
Server Component
```

Use Client Components only for:

* cart interactions
* wishlist
* animations requiring client state
* search interaction
* filters
* checkout form
* Paystack integration
* interactive UI

Do not turn entire pages into Client Components unnecessarily.

---

# 48. ERROR HANDLING

Every critical flow requires:

```text
loading
success
empty
error
retry
```

Especially:

* checkout
* payment
* downloads
* search
* product loading
* admin operations

Use:

```text
error.tsx
loading.tsx
not-found.tsx
Suspense
Skeleton
Toast/Sonner
```

---

# 49. PAYMENT IDEMPOTENCY

Critical rule:

A customer refreshing the payment callback must **never create another order**.

The backend must check:

```text
transaction reference
payment record
order status
webhook event
```

before fulfillment.

---

# 50. DOWNLOAD FULFILLMENT

A product is downloadable only when:

```text
payment_verified = true
```

Then:

```text
Create Order
Create Order Items
Create Download Records
Generate Secure Access
Send Download Email
```

Refund:

```text
Refund confirmed
      ↓
Revoke download access
```

---

# 51. ADMIN AUDIT LOG

Track important actions:

```text
Admin
Action
Resource
Resource ID
Previous Value
New Value
IP
Timestamp
```

Examples:

```text
Product price changed
Order refunded
Download revoked
Customer updated
Coupon created
Admin role changed
```

---

# 52. RESPONSIVE DESIGN

Design for:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Do not simply shrink desktop layouts.

Mobile should have its own intentional composition.

Pay particular attention to:

* navigation
* product grids
* checkout
* product galleries
* typography
* drawers
* filters
* sticky CTAs

---

# 53. MOTION SYSTEM

Use Framer Motion as the default.

Motion examples:

```text
Page reveal
Image reveal
Product hover
Card elevation
Button feedback
Modal transitions
Cart drawer
Wishlist feedback
Scroll reveal
Collection transitions
```

GSAP only for:

```text
Complex timelines
Advanced parallax
Scroll choreography
Special editorial effects
```

Respect:

```text
prefers-reduced-motion
```

---

# 54. NO UNNECESSARY FEATURES

For v1, explicitly remove:

```text
Customer Accounts
Customer Login
Customer Registration
Customer Passwords
Customer Dashboard
Customer Addresses
Account Notifications
Password Reset
Google Login
Email Login
Account Wishlist Sync
```

This keeps the product significantly simpler.

---

# 55. V1 CUSTOMER FLOW

The ideal customer experience:

```text
HOME
 ↓
SHOP
 ↓
PRODUCT
 ↓
BUY NOW
 ↓
CHECKOUT
 ↓
PAYSTACK
 ↓
PAYMENT VERIFIED
 ↓
ORDER CREATED
 ↓
DOWNLOAD
 ↓
EMAIL RECEIPT
```

Target:

**Purchase in as few steps as reasonably possible.**

---

# 56. V1 ADMIN FLOW

```text
ADMIN LOGIN
      ↓
DASHBOARD
      ↓
ORDERS
      ↓
CUSTOMERS
      ↓
PRODUCTS
      ↓
DOWNLOADS
      ↓
CONTENT
      ↓
ANALYTICS
```

---

# 57. DEPLOYMENT

Frontend/backend:

```text
Vercel
```

Database:

```text
Supabase PostgreSQL
```

Storage:

```text
Supabase Storage
Cloudinary
```

Email:

```text
Resend
```

Payments:

```text
Paystack
```

Search:

```text
Algolia
```

---

# 58. ENVIRONMENT VARIABLES

Use environment validation.

Example:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY

SUPABASE_SERVICE_ROLE_KEY

PAYSTACK_SECRET_KEY
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY

RESEND_API_KEY

ALGOLIA_APP_ID
ALGOLIA_SEARCH_KEY
ALGOLIA_ADMIN_KEY

CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Never expose server-only secrets through `NEXT_PUBLIC_*`.

---

# 59. PRODUCTION QUALITY GATES

Before launch:

```text
TypeScript
✓ Zero errors

ESLint
✓ Zero errors

Build
✓ Successful

Database
✓ Migrations verified

RLS
✓ Tested

Payments
✓ Test transactions verified

Webhooks
✓ Verified

Downloads
✓ Secure

Emails
✓ Delivered

Mobile
✓ Tested

Accessibility
✓ WCAG AA review

SEO
✓ Verified

Performance
✓ Optimized

Security
✓ Audited
```

---

# 60. DEFINITION OF DONE

### Product

✓ Guest-first marketplace
✓ No customer accounts
✓ Customer records automatically created
✓ Admin customer management
✓ Digital products
✓ Bundles
✓ Secure downloads
✓ Reviews
✓ Wishlist
✓ Coupons
✓ Search
✓ Collections
✓ CMS

### Checkout

✓ Fast guest checkout
✓ Paystack
✓ Server verification
✓ Webhook verification
✓ Idempotent payment processing
✓ Automatic fulfillment
✓ Email receipt
✓ Secure download

### Admin

✓ Dashboard
✓ Products
✓ Orders
✓ Customers
✓ Downloads
✓ Reviews
✓ Coupons
✓ CMS
✓ Analytics
✓ Support
✓ Audit logs

### Engineering

✓ Next.js 15
✓ React 19
✓ TypeScript
✓ Tailwind
✓ shadcn/ui
✓ Supabase
✓ No Prisma
✓ Server-first architecture
✓ Zod validation
✓ Secure APIs
✓ Responsive
✓ Accessible
✓ SEO optimized
✓ High performance

### Design

✓ Figma-inspired implementation
✓ Taste design refinement
✓ Impeccable engineering pass
✓ Emil Kowalski interaction principles
✓ Editorial luxury aesthetic
✓ Subtle motion
✓ Premium typography
✓ Consistent spacing
✓ High-quality responsive design

---

# 61. FINAL ARCHITECTURE

The final system should essentially be:

```text
                    IVORY SILK COLLECTIVE
                              │
             ┌────────────────┴────────────────┐
             │                                 │
         STOREFRONT                         ADMIN
             │                                 │
      ┌──────┼──────┐                    ┌─────┼─────┐
      │      │      │                    │     │     │
    Shop  Product  Cart                Orders Products Customers
      │      │      │                    │     │     │
      └──────┴──────┴──────┐             └─────┴─────┘
                            │
                       GUEST CHECKOUT
                            │
                       PAYSTACK
                            │
                    SERVER VERIFICATION
                            │
                        WEBHOOK
                            │
                    ┌───────┴───────┐
                    │               │
                 CUSTOMER          ORDER
                    │               │
                    └───────┬───────┘
                            │
                     DIGITAL DELIVERY
                            │
                     SECURE DOWNLOAD
                            │
                         RESEND
```

### The key architectural decision

**No Prisma. No customer authentication. No customer dashboard. No unnecessary account system.**

Supabase handles the database and storage, Next.js handles the application/server layer, Paystack handles payments, Resend handles transactional email, and the admin panel owns the customer/order history.

That is a much cleaner architecture for a **guest-first digital marketplace** and will also give your AI IDE substantially less unnecessary code to maintain.
