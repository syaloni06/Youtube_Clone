import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new mongoose.Schema({
  // Unique identifier for the user
  userId: {
    type: String,
    unique: true, // Ensures the userId is unique
  },
  // Username for the user
  username: {
    type: String, // Stores the username of the user
    required: true, // Ensures the username field is mandatory
    unique: true, // Ensures no two users have the same username
  },
  // Email address of the user
  email: {
    type: String, // Stores the user's email address
    required: true, // Ensures the email field is mandatory
    unique: true, // Ensures no two users have the same email
  },
  // User's password (will be hashed before saving to the database)
  password: {
    type: String, // Stores the user's password
    required: true, // Ensures the password field is mandatory
  },
  // URL or path to the user's avatar/profile picture
  avatar: {
    type: String,
    required: true, // Ensures the avatar field is mandatory
  },
  // Optional field to associate a channel ID with the user
  channelId: {
    type: String,
    required: false, // Not mandatory; a user may not have a channel
  }
});

// Middleware to hash the password before saving the user document to the database
userSchema.pre("save", async function (next) {
  // Check if the password field has been modified
  if (!this.isModified("password")) {
    return next(); // Skip hashing if the password is not modified
  }
  // Hash the password using bcrypt with a salt round of 10
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Proceed to the next middleware or save operation
});

// Create a User model using the schema
const userModel = mongoose.model("User", userSchema);

// Export the User model to be used in other parts of the application
export default userModel;
