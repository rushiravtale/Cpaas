## CPAAS Backend – Developer Onboarding Guide

This document is for backend developers joining the CPAAS project. It assumes you have basic experience with Node.js, Express, and MongoDB.

---

## 1. Tech Stack & Overview

- **Runtime**: Node.js (CommonJS modules)
- **Framework**: Express
- **Database**: MongoDB via Mongoose
- **Auth**: JWT-based access & refresh tokens
- **Validation & Utilities**: Joi, bcrypt, moment, multer, archiver, AWS SDK (for S3)

The backend exposes REST APIs under `/api/*` which are consumed by the React frontend in `CPAAS_FE`. MongoDB is the single source of truth for users, roles, trades, courses, performance data, etc.

---

## 2. Project Structure (Backend)

Top-level (inside `CPAAS_BE`):

- `app.js` – Express app bootstrap, MongoDB connection, and route mounting.
- `package.json` – Dependencies and scripts (`npm start` runs `node app.js`).
- `src/routes` – Route definitions (URL paths only, no business logic).
- `src/controllers` – Request handling and business logic.
- `src/schemas` – Mongoose models (MongoDB collections).
- `src/helpers` – Reusable domain helpers (auth, user, OTP, S3, etc.).
- `src/middlewares` – Express middlewares (e.g. JWT auth).
- `src/utils` – Response helpers and standardized success/error mappings.

Key entry flow:

1. `npm start` → `node app.js`
2. `app.js`:
   - Loads `.env` (`dotenv.config({ path: ".env" })`).
   - Connects to MongoDB using `process.env.CONNECTION`.
   - Calls `addRoutersInApp(app)` from `src/routes/index.js`.
3. `src/routes/index.js` mounts module routes under:
   - `/api/auth`
   - `/api/user`
   - `/api/master`
   - `/api/course`
   - `/api/agniveer`
   - `/api/physcialProficiency`
   - `/api/fortnightPerformance`
   - `/api/gunnerTechPhase`
   - `/api/driverTechPhase`
   - `/api/operatorTechPhase`
   - `/api/ofcTechPhase`
   - `/api/s3`

---

## 3. Environment & Configuration

The backend is configured via a `.env` file at the root of `CPAAS_BE`. At minimum you will need:

- `CONNECTION` – MongoDB connection string.
- `PORT` – Port on which Express will listen.
- `TOKEN_SECRET` – Secret for signing access JWTs.
- `REFRESH_TOKEN_SECRET` – Secret for signing refresh JWTs.
- `JWT_EXPIRES_IN` – Access token TTL (e.g. `1h`, `2d`).

There may be additional secrets for:

- AWS credentials (for S3 file handling).
- Any email/OTP providers (if configured externally).

Ask the project owner/client for the **official environment variable list** and **non-production connection strings** during onboarding. Do not hardcode secrets in code.

---

## 4. Data Model (Key Schemas)

All schemas live under `src/schemas`. Some of the most important ones:

- **User** (`user.schema.js`)

  - Fields: `name`, `userName` (unique), `password`, `email`, `phoneNo`, `status`, `roleIds`, `tradeId`, `permission`, `createdBy`.
  - Relations:
    - `roleIds` → `Role` (`mst_roles.collection`).
    - `tradeId` → `Trade` (`mst_trade.collection`).
    - `permission` → `Permission` (`mst_permissions.collection`).
  - Uses `mongoose-paginate-v2` for pagination.

- **Role** (`mst_roles.schema.js`)

  - Fields: `name`, `description`, `label`.
  - Collection: `mst_roles`.

- **Trade** (`mst_trade_schema.js`)

  - Fields: `name`, `label`, `index`.
  - Collection: `mst_trade`.

- **Permission** (`mst_permissions.schema.js`)

  - Fields: `name`, `trade`, `permission` (array of strings).
  - Collection: `mst_permissions`.

- **Course** (`course.schema.js`)

  - Fields: `courseName` (unique), `tradeId`, `startDate`, `endDate`.
  - Collection: `courses` (explicit third argument to `mongoose.model`).

- **User OTP / Tokens**
  - `user_otps.schema.js` – Stores OTPs for password resets / verification.
  - `user_tokens.schema.js` – Stores access + refresh tokens per user.

There are additional schemas for domain-specific modules such as:

- `agniveer.schema.js`
- `driverTechPhase.schema.js`
- `gunnerTechPhase.schema.js`
- `ofcTechPhase_schema.js`
- `operatorTechPhase_schema.js`
- `physcialProficiency_schema.js`
- `fortNight.schema.js`
- `file_master.schema.js`
- `download_request.schema.js`

These represent different assessment or performance-tracking modules. When working on a module, always inspect both its **schema** and **controller**.

---

## 5. Request Flow & Response Pattern

### 5.1. Typical Request Flow

1. **Route** (e.g. `src/routes/auth.routes.js`) defines the HTTP method and path:
   - Example: `router.post("/signin", controller.signin);`
2. **Middleware** (optional) runs before the controller:
   - Auth-protected routes usually use `verifyAuthToken` from `src/middlewares/auth.middleware.js`.
3. **Controller** executes business logic:
   - Example: `auth.controller.signin` orchestrates user lookup, password validation, token generation.
4. **Helper(s)** encapsulate reusable logic:
   - `auth.helper.js`, `user.helper.js`, `user.token.helper.js`, `otp.helper.js`, etc.
5. **Response Utility**:
   - Controllers call `sendResponse` (`src/utils/sendResponse.js`) with a standard object:
     - `{ rid: "<response-id>", data: <payload> }`.
   - `sendResponse` checks whether `rid` starts with `"s"` (success) or `"e"` (error) and delegates to `successResponse` or `errorResponse` modules.

This design centralizes HTTP response shapes and messages. As a developer, always **use `sendResponse`** and the existing **response IDs** instead of writing `res.status(...).json(...)` manually.

### 5.2. Response IDs (`rid`)

- **Success**: IDs like `s-auth-10`, `s-auth-4`, etc. are implemented in `src/utils/successResponse/*.success.codes.js`.
- **Error**: IDs like `e-auth-14`, `e-auth-15`, etc. are implemented in `src/utils/errorResponse/*.error.codes.js`.

When adding new functionality:

- Pick a clear, unique `rid` following existing naming conventions.
- Add a handler for that `rid` in the appropriate success/error codes file.

---

## 6. Authentication & Authorization

### 6.1. JWT Middleware

`src/middlewares/auth.middleware.js` provides:

- `verifyAuthToken(req, res, next)`:

  - Reads `Authorization: Bearer <token>` header.
  - Verifies the token with `process.env.TOKEN_SECRET`.
  - On success, sets:
    - `res.locals.userId`
    - `res.locals.role`
    - `res.locals.isCustomer`
    - `res.locals.userSequenceId`
    - `res.locals.verifiedToken`
  - Confirms that the token exists in `UserToken` collection and matches the stored token.
  - On failure, returns appropriate errors via `sendResponse` (e.g. `e-auth-14`, `e-auth-15`, `e-auth-16`).

- `verifyRefreshToken(req, res, next)`:
  - Similar pattern, but uses `process.env.REFRESH_TOKEN_SECRET`.
  - Validates `refreshToken` and checks it against `UserToken.refreshToken`.

Any route that requires authentication should include `verifyAuthToken` (or `verifyRefreshToken` for token refresh endpoints).

### 6.2. Auth Flows (`auth.controller.js`)

Key endpoints in `src/routes/auth.routes.js`:

- `POST /api/auth/signin`

  - Validates credentials and role.
  - Generates access + refresh tokens via `auth.helper` and `user.token.helper`.
  - Responds with user details and tokens (`s-auth-10`).

- `POST /api/auth/password/change`

  - Protected by `verifyAuthToken`.
  - Uses `auth.helper.changePassword` to validate old password and update hash.

- `POST /api/auth/password/forgot`

  - Initiates OTP generation for a user (`otp.helper.generateOtpForUser`).

- `POST /api/auth/password/reset`

  - Uses OTP to authorize password reset (`auth.helper.resetPassword`).

- `POST /api/auth/otp/generate`, `/otp/resend`, `/otp/verify`

  - OTP lifecycle management through `otpHelper`.

- `POST /api/auth/token/refresh`

  - Protected by `verifyRefreshToken`.
  - Generates new access token for the same user.

- `POST /api/auth/logout`
  - Protected by `verifyAuthToken`.
  - Deletes the user’s OTPs and tokens (`auth.helper.logout`).

As a developer, follow these patterns when adding new auth-related features or tightening security.

---

## 7. Core Domain Modules

Each domain module typically has:

- A **schema** in `src/schemas`.
- A **controller** in `src/controllers`.
- A **route file** in `src/routes`.
- Related **success/error codes** under `src/utils/successResponse` and `src/utils/errorResponse`.

Examples:

- **User Management**

  - Routes: `src/routes/auth.routes.js`, `src/routes/user.routes.js`.
  - Controllers: `auth.controller.js`, `user.controller.js`.
  - Schemas: `user.schema.js`, `user_otps.schema.js`, `user_tokens.schema.js`.
  - Responsibilities:
    - Sign-in, sign-out.
    - Create/update/delete users.
    - Password and OTP flows.

- **Master Data**

  - Route: `src/routes/master.routes.js`.
  - Controller: `master.controller.js`.
  - Schemas: `mst_roles`, `mst_trade`, `mst_permissions`.
  - Responsibilities:
    - Serving roles, trades, and permissions data to frontend.

- **Course Management**

  - Route: `src/routes/course.routes.js`.
  - Controller: `course.controller.js`.
  - Schema: `course.schema.js`.

- **Performance / Training Modules**

  - Routes: `agniveer.routes.js`, `driverTechPhase.routes.js`, `GunnerTechPhase.routes.js`, `ofcTechPhase.routes.js`, `operatorTechPhase.routes.js`, `physcialProficiency.routes.js`, `fortnightPerformance.routes.js`.
  - Controllers: corresponding `*.controller.js`.
  - Schemas: corresponding `*.schema.js`.

- **File & S3 Handling**
  - Route: `s3.routes.js`.
  - Controller: `s3.controller.js`.
  - Helper: `s3.helper.js`.
  - Uses `aws-sdk`, `multer`, `archiver` as needed.

When onboarding to a module:

1. Start from its `*.routes.js`.
2. Open the related controller and see which helpers/schemas are used.
3. Review the associated schema to understand fields and validation.
4. Check success/error code files for business rules and messaging.

---

## 8. Adding New Features (Recommended Workflow)

When you add or modify backend functionality:

1. **Define/Update Schema (if needed)**

   - Update or create a `*.schema.js` file.
   - Use proper types, `required` flags, and indices if necessary.

2. **Add/Extend Controller**

   - Add new handler functions in the appropriate `*.controller.js`.
   - Keep controllers thin by delegating complex logic to helpers.

3. **Add Route**

   - In the relevant `*.routes.js` file, wire your controller function to a route.
   - Attach `verifyAuthToken` if the endpoint must be authenticated.

4. **Add Success/Error Codes**

   - Choose new `rid`s for success and error scenarios.
   - Implement them in `src/utils/successResponse/*.success.codes.js` or `src/utils/errorResponse/*.error.codes.js`.

5. **Use `sendResponse`**

   - Return all responses through `sendResponse({ rid, data }, res)`.

6. **Test Endpoints**
   - Use Postman, Insomnia, or your preferred tool.
   - For protected routes, first obtain a JWT via `/api/auth/signin`.

---

## 9. Local Setup for New Developers

Steps for a new backend developer to get started:

1. **Clone the repository** and navigate to `CPAAS_BE`.
2. **Install dependencies**:
   - `npm install`
3. **Configure environment**:
   - Ask for the `.env` template or non-prod environment values.
   - Create `.env` in `CPAAS_BE` root.
4. **Run MongoDB**:
   - Either local MongoDB, Docker, or a shared development MongoDB (MongoDB Atlas).
5. **Start the backend**:
   - `npm start`
6. **Verify core flows**:
   - Hit `/api/auth/signin` with valid credentials.
   - Call a few protected APIs using the returned Bearer token.

---

## 10. Coding Conventions & Tips

- **Modules**: Use `require`/`module.exports` (CommonJS) consistently.
- **Error Handling**: Prefer throwing/propagating `Error` objects with a `rid` field instead of ad-hoc messages.
- **Async Code**: Use async/await with `try/catch` inside helpers and controllers, or return Promises consistently.
- **Security**:
  - Never log full tokens or passwords in production.
  - Use environment variables for all secrets.
  - Validate and sanitize all external input (consider `joi.helper.js`).
- **Pagination**:
  - Use the `mongoose-paginate-v2` plugin where needed for listing APIs.

---

## 11. Where to Start During Training

For a new backend dev, a good learning path is:

1. Read `app.js` and `src/routes/index.js` to understand the global flow.
2. Study the auth stack:
   - `src/routes/auth.routes.js`
   - `src/controllers/auth.controller.js`
   - `src/middlewares/auth.middleware.js`
   - `src/helpers/auth.helper.js`, `user.helper.js`, `user.token.helper.js`, `otp.helper.js`
   - `src/schemas/user.schema.js`, `user_tokens.schema.js`, `user_otps.schema.js`
3. Explore master data:
   - `src/routes/master.routes.js`
   - `src/schemas/mst_roles.schema.js`, `mst_trade_schema.js`, `mst_permissions.schema.js`
4. Pick one performance module (e.g. Agniveer or Driver Tech Phase) and:
   - Read its route, controller, and schema to understand how the domain is modeled.

After that, you should be able to confidently add new endpoints, adjust schemas, and debug issues across the CPAAS backend.
