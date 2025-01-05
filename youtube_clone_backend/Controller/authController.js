import userModel from "../Model/user.js"; // Import the user model
import jwt from "jsonwebtoken"; // Import JSON Web Token for authentication
import bcrypt from "bcrypt"; // Import bcrypt for password hashing and comparison
import {v4 as uuidv4} from "uuid"; // Import UUID library to generate unique user IDs

// Function to register a new user
export const registerUser = async (req, res) => {
  try {
     // Extract user details from the request body
    const { username, email, password, avatar } = req.body;

    // Check if email or username is already registered
    const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" }); // Return error if user already exists

    // Create a new user instance with provided details
    const user = new userModel({ 
      userId: "user" + uuidv4(),
      username: username, 
      email: email,
      password: password, 
      avatar: avatar,
    });

    // Save the user to the database
    await user.save();

    // Send success response
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    // Handle any errors that occur during registration
    res.status(500).json({ message: err.message });
  }
};

// Function to log in a user
export const loginUser = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Invalid email or password" }); // Return error if user does not exist

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" }); // Return error if passwords do not match

    // Generate a JWT token for authenticated user
    const token = jwt.sign({ user: user.username }, "secretKey", {
      expiresIn: "1h", // Token expires in 1 hour
    });

    // Send success response with the generated token
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    // Handle errors and send a 500 status
    res.status(500).json({ message: err.message });
  }
};

// Function to update user details
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from request parameters
    const { password, avatar, channelId } = req.body; // Get updated fields from the request body

    // Find the user by userId
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Return error if user doesn't exist
    }

    // Update fields if they are provided in the request body
    if (password) user.password = password; // Update the password (should be hashed before saving)
    if (avatar) user.avatar = avatar; // Update the avatar
    if (channelId) user.channelId = channelId; // Update the channel ID (if applicable)

    // Save the updated user to the database
    await user.save();

    // Send a success response with the updated user details
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // Handle any errors that occur during the update process
    res.status(500).json({ message: error.message });
  }
};
