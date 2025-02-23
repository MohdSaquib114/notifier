# Project Setup Guide

## Prerequisites
Before starting the project, ensure you have MongoDB running locally:

- [MongoDB](https://www.mongodb.com/try/download/community) (If using locally)

## Getting Started

### Backend Setup
1. Navigate to the backend directory:
   ```sh
   cd backend
   ```
2. Create a `.env` file in the backend directory and add the following environment variables:
   ```sh
   PORT=9000
   MONGODB_URI=your_mongodb_connection_string
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the backend server:
   ```sh
   npm run start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd .. && cd frontend
   ```
2. Create a `.env` file in the frontend directory and add the following:
   ```sh
   VITE_API_URL=http://localhost:9000/api/notification
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Running the Project
Once both the backend and frontend servers are running, open your browser and go to:
   ```
   http://localhost:5173
   ```
(This may vary based on the port used by Vite)

Now you should have the project up and running!

## Notes
- Ensure MongoDB is running if using a local database.
- Update `.env` files with the correct database credentials.
- If the frontend does not connect to the backend, check the `VITE_API_URL` in the frontend `.env` file.

Happy coding! 🚀

