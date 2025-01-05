import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // Import the CORS package
import { authRoutes } from "./Routes/authRoutes.js";
import { channelRoutes } from "./Routes/channelRoutes.js";
import { videoRoutes } from "./Routes/videoRoutes.js";

const app = new express();

// Middleware to enable CORS for all origins
// Allows cross-origin requests to the server
app.use(cors());

// Middleware to parse incoming JSON requests
// Ensures the server can handle JSON data in request bodies
app.use(express.json());

// Middleware to log request method, URL, and status code after the response is sent
// Logs information about each incoming request and its response status
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Method:${req.method} Url:${req.url} Status:${res.statusCode}`);
  });
  next(); // Proceed to the next middleware or route handler
});

// Start the server on port 5100
// The server listens for incoming connections on port 5100
app.listen(5100, () => {
  console.log("Server is running on port 5100");
});

// Route handlers for authentication-related routes
authRoutes(app);

// Route handlers for channel-related routes
channelRoutes(app);

// Route handlers for video-related routes
videoRoutes(app);

// Connect to MongoDB database
// Establishes a connection to the MongoDB database named "youtubeCloneDB"
mongoose.connect("mongodb://localhost:27017/youtubeCloneDB");

// Event listener for successful database connection
// Logs a success message when the database connection is established
const db = mongoose.connection;
db.on("open", () => {
  console.log("Database connection successful");
});

// Event listener for database connection errors
// Logs an error message if the database connection fails
db.on("error", () => {
  console.log("Database connection not successful");
});
