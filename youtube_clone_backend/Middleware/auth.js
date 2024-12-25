import jwt from "jsonwebtoken";

// Middleware to authenticate requests using a JWT token
export const auth = (req, res, next) => {
  // Retrieve the token from the 'Authorization' header
  const token = req.header("Authorization");

  // Check if the token is missing
  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided" }); // Return 401 Unauthorized error if no token is found

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, "secretKey"); // Decoded token contains the payload data (e.g., user info)

    // Attach the decoded token data to the request object for further use in protected routes
    req.user = decoded;

    // Move to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or verification fails, return a 400 Bad Request error
    res.status(400).json({ error: "Invalid token" });
  }
};