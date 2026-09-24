# WritoShop Test

Front-end prototype for the redesigned WritoShop storefront, authentication flow and role-based dashboards.

## Current front-end scope

### Storefront
- Editorial animated home page
- Search, categories and sorting
- Book detail pages
- Cart UI
- Admin-managed catalogue stored in localStorage
- Admin add/delete book controls
- Stock editing reflected across the storefront

### Authentication prototype
- Email/password demo login
- Google Identity Services OAuth handoff
- Persisted browser session
- User/admin role separation
- Protected routes

### User dashboard
- Basic account details
- Past and placed orders
- Order status
- Payment status
- Refund status

### Admin dashboard
- Sales summary
- Pending orders
- Approve/advance orders
- Payment controls
- Refund controls
- Stock management
- Add/delete books
- Storefront catalogue control

## Prototype credentials

User:
- Email: `user@writoshop.com`
- Password: `User@123`

Admin:
- Email: `admin@writoshop.com`
- Password: `Admin@123`

These credentials are intentionally client-side for the test build only. They are **not secure authentication** and must be replaced by backend auth before production.

## Google sign-in

1. Create a Google OAuth 2.0 Web Client in Google Cloud Console.
2. Add your Vercel deployment domain under **Authorized JavaScript origins**.
3. In Vercel add:
   - `VITE_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com`
4. Optional admin mapping for Google accounts:
   - `VITE_ADMIN_EMAILS=admin@example.com,another-admin@example.com`
5. Redeploy.

Google credentials are decoded client-side only for the prototype. Production must verify the credential server-side and issue a secure session.

## Architecture prepared for backend phase

The front end is intentionally split into replaceable contexts:
- `AuthContext` → replace local session logic with authentication API/session cookies
- `CommerceContext` → replace local order state with orders/payments/refunds API
- `CatalogContext` → replace local catalogue/stock state with database-backed book APIs

That lets the UI and route structure remain mostly intact when the backend and database are introduced.

## Vercel

- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Router: HashRouter


## UPI QR configuration

Add these Vercel environment variables before accepting real payments:

- `VITE_UPI_ID=your-real-merchant-upi-id`
- `VITE_UPI_PAYEE_NAME=WritoShop`

If `VITE_UPI_ID` is missing, the test build clearly shows that it is using a demo payment address.

The QR is generated locally in the browser with `qrcode.react`. It includes the payee, exact amount and order reference. The current prototype does not automatically verify bank settlement; the customer submits the UTR and the admin confirms it in the admin dashboard. Backend-side payment verification/reconciliation comes in the next phase.
