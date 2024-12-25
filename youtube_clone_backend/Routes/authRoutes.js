import { registerUser, loginUser } from "../Controller/authController.js";

// Function to define authentication-related routes
export const authRoutes = (app) => {
  // Route to handle user registration
  app.post('/register', registerUser);

  // Route to handle user login
  app.post('/login', loginUser);
};