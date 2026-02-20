# User Registration System (Aiven Refined)

Full-stack user registration system using **Node.js**, **Express**, **Sequelize (MySQL)**, and **React**. Refined for seamless integration with **Aiven** cloud-hosted databases.

## 🚀 1. Database Setup (Aiven)

1.  Log in to your [Aiven Console](https://console.aiven.io/).
2.  Create or select your MySQL service.
3.  Copy the **Service URI**. It should include `?ssl-mode=REQUIRED`.
4.  Your database schema will use the following fields: `uid`, `uname`, `email`, `pwd`, and `phoneno`.

## ⚙️ 2. Backend Configuration

1.  Navigate to `backend/`.
2.  Open/Create `.env` and configure your credentials:
    ```env
    DB_URL=mysql://avnadmin:your_password@your-service.aivencloud.com:port/defaultdb?ssl-mode=REQUIRED
    PORT=5000
    ```
3.  Install dependencies:
    ```bash
    cd backend
    npm install
    ```
    *(Includes: `sequelize`, `mysql2`, `dotenv`, `cors`, `bcryptjs`)*

## 🛠️ 3. Project Structure

- **`config/db.js`**: Managed Sequelize connection with mandatory Aiven SSL support (`rejectUnauthorized: false`).
- **`models/User.js`**: Refined model with fields:
  - `uid` (Primary Key, Auto-increment)
  - `uname` (String, Required)
  - `email` (String, Unique)
  - `pwd` (Hashed String)
  - `phoneno` (String)
- **`routes/userRoutes.js`**: API endpoints for registration.

## 🏃 4. Running the Application

### Start the Backend
```bash
cd backend
npm start
```
*Wait for: `MySQL connected successfully` and `Database synced`.*

### Start the Frontend
```bash
cd frontend
npm run dev
```

## 🧪 5. Verification
1.  Navigate to the registration form in your browser.
2.  Register a new user.
3.  Verify the record in the Aiven console or via a database client. The table will be named `Users` by default (managed by Sequelize).
