# Dev_Express Backend

This is the backend API for the Dev_Express application, built with Node.js, Express, and PostgreSQL.

## 🚀 Setup & Installation

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Create a `.env` file in the root directory with the following variables:
    ```env
    PORT=5000
    DATABASE_URL=your_postgres_connection_string
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    ```
3.  **Run the server**:
    ```bash
    npm start
    ```

## 🏗 Project Structure

The project follows a layered architecture to ensure separation of concerns:

-   **`src/server.js`**: Entry point of the application. Sets up middleware, routes, and error handling.
-   **`src/routes/`**: Defines the API endpoints and maps them to controllers.
-   **`src/controllers/`**: Handles incoming requests, validates input, and orchestrates the response.
-   **`src/services/`**: Contains the business logic. It processes data and communicates with repositories.
-   **`src/repositories/`**: Handles direct database interactions (SQL queries).
-   **`src/middleware/`**: Custom middleware for authentication (`auth.middleware.js`) and error handling (`error.middleware.js`).
-   **`src/utils/`**: Utility functions like `catchAsync` for cleaner async error handling.

## 🔄 Backend Flow

Here is how a typical request travels through the system:

1.  **Request**: Client sends an HTTP request (e.g., `POST /api/auth/login`).
2.  **Server**: `server.js` receives the request.
3.  **Middleware**: Global middleware (like `express.json`, `cors`) process the request first.
4.  **Router**: The request is routed to the appropriate module (e.g., `auth.routes.js`).
5.  **Controller**: The controller (e.g., `auth.controller.js`) receives the request.
    -   It uses `catchAsync` to handle any errors automatically.
    -   It extracts data from `req.body` or `req.params`.
6.  **Service**: The controller calls a service function (e.g., `loginService`).
    -   The service contains the core logic (e.g., comparing passwords, generating tokens).
7.  **Repository**: If database access is needed, the service calls a repository function.
    -   The repository executes the SQL query.
8.  **Response**: The result flows back up: Repository -> Service -> Controller.
    -   The controller sends the JSON response (`res.json(...)`).
9.  **Error Handling**: If any error occurs at any step, it is caught by `catchAsync` and passed to the global `errorHandler` middleware, which sends a structured error response.

## ✨ Recent Changes (Refactoring)

-   **Centralized Error Handling**:
    -   Introduced `catchAsync` utility to wrap async controller functions, removing repetitive `try-catch` blocks.
    -   Added `error.middleware.js` to handle all errors in one place and provide consistent error responses.
-   **Code Cleanup**:
    -   Refactored controllers to be more concise and readable.
