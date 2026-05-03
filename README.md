# Khaleefa Holidays - Admin Portal

This is the standalone administrative dashboard for Khaleefa Holidays. It provides full control over destinations, visas, rooms, cabs, and user submissions.

## Features
- **Global Authentication**: Secured via JWT and global middleware.
- **Service Management**: Create, update, and delete travel services.
- **Submission Tracking**: Monitor and manage customer inquiries and feedback.
- **Secure API**: Every endpoint is protected with multi-layered verification.

## Getting Started

1. **Configure Environment**:
   Ensure you have a `.env.local` file with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   ADMIN_USER=admin
   ADMIN_PASSWORD=your_admin_password
   ```

2. **Run Locally**:
   ```bash
   npm install
   npm run dev
   ```

3. **Access**:
   Open [http://localhost:3000](http://localhost:3000). You will be redirected to the login page.

## Tech Stack
- **Framework**: Next.js 16.1.6
- **Database**: MongoDB (Mongoose)
- **Styling**: TailwindCSS 4
- **Security**: jose (JWT), Global Proxy Middleware
