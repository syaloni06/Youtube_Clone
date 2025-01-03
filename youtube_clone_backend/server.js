import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the CORS package
import { authRoutes } from "./Routes/authRoutes.js";
import { channelRoutes } from "./Routes/channelRoutes.js";
import { videoRoutes } from "./Routes/videoRoutes.js";

const app = new express();

// Middleware to enable CORS for all origins
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to log request method, URL, and status code after the response is sent
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method:${req.method} Url:${req.url} Status:${res.statusCode}`);
  });
  next(); // Proceed to the next middleware or route handler
});

// Start the server on port 5100
app.listen(5100, () => {
  console.log("Server is running on port 5100");
});

authRoutes(app); // Handles authentication-related routes
channelRoutes(app);
videoRoutes(app);

// Connect to MongoDB database
mongoose.connect("mongodb://localhost:27017/youtubeCloneDB");

// Event listener for successful database connection
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connection successful");
});

// Event listener for database connection errors
db.on("error", () => {
  console.log("Database connection not successful");
});
