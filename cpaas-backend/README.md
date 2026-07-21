## CPAAS Backend (CPAAS_BE)

This folder contains the **Node.js / Express backend** for the CPAAS project. The React frontend lives in `CPAAS_FE`.

---

## Quick Start for Backend Developers

1. **Install dependencies**
   - `cd CPAAS_BE`
   - `npm install`
2. **Configure environment**
   - Copy `.env.example` to `.env`: `cp .env.example .env`
   - Edit `.env` and fill in your actual values:
     - `CONNECTION` – MongoDB connection string (ask your team/client for dev database access)
     - `PORT` – Express port (default: `4000`)
     - `TOKEN_SECRET`, `REFRESH_TOKEN_SECRET` – Strong random strings for JWT signing
     - `JWT_EXPIRES_IN`, `REFRESH_TOKEN_EXPIRES_IN` – Token expiry times
     - AWS S3 credentials (if using file uploads)
     - OTP configuration
   - See `.env.example` for all required variables with descriptions
3. **Run the backend**
   - `npm start`
   - Backend will boot from `app.js` and mount all `/api/*` routes.

---

## Architecture (High Level)

- `app.js` – Express app setup + MongoDB connect + route mounting.
- `src/routes` – Route definitions (URL structure, attaches controllers and middlewares).
- `src/controllers` – Business logic and request handling.
- `src/schemas` – Mongoose models for MongoDB collections.
- `src/helpers` – Auth/user/OTP/S3 and other shared helpers.
- `src/middlewares` – JWT auth middleware (`verifyAuthToken`, `verifyRefreshToken`).
- `src/utils` – Standardized success/error responses and response generators.

Authentication is JWT-based and uses a token store (`user_tokens`) to track valid access/refresh tokens. All controllers respond via the shared `sendResponse` utility using `rid` codes.

---

## Detailed Backend Documentation

For a full onboarding guide (data models, auth flows, modules, and how to extend the backend), see:

- `BACKEND_DEVELOPER_GUIDE.md`

This is the primary document to use during training for any new backend developer.

