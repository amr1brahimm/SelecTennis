const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if an Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authentication required",
    });
  }

  // Extract the token after "Bearer "
  const token = authHeader.split(" ")[1];

  try {
    // Verify that the token is genuine and has not expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store the logged-in user's information on the request
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateToken;