# Frontend Application

This is the frontend application for the user authentication system.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root of the frontend-app directory and set the API URL:
   ```
   REACT_APP_API_URL=http://localhost:5000
   ```
   Or if you want to use a different backend URL, adjust accordingly.

## Running the Application

- Development mode:
  ```bash
  npm run dev
  ```
  The application will run on `http://localhost:5173` by default.

- Production build:
  ```bash
  npm run build
  ```

- Preview production build locally:
  ```bash
  npm run serve
  ```

## Features

- User registration
- User login
- User dashboard
- Protected routes
- API integration