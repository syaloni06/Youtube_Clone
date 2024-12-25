import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Define the User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String, // Stores the username of the user
    required: true, // Ensures the username field is mandatory
    unique: true, // Ensures no two users have the same username
  },
  email: {
    type: String, // Stores the user's email address
    required: true, // Ensures the email field is mandatory
    unique: true, // Ensures no two users have the same email
  },
  password: {
    type: String, // Stores the user's password (hashed before saving)
    required: true, // Ensures the password field is mandatory
  },
});

// Hash password before saving the user document to the database
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
const userModel = mongoose.model('User', userSchema);

export default userModel;