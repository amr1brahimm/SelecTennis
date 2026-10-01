const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/database");

const register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      date_of_birth,
      gender,
      height_cm,
      weight_kg,
      password,
      confirm_password,
    } = req.body;

    // Check that all required fields were provided
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone_number ||
      !date_of_birth ||
      !gender ||
      !height_cm ||
      !weight_kg ||
      !password ||
      !confirm_password
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    // Validate height and weight
const height = Number(height_cm);
const weight = Number(weight_kg);

if (
  !Number.isFinite(height) ||
  height < 100 ||
  height > 250
) {
  return res.status(400).json({
    message: "Height must be between 100 and 250 cm",
  });
}

if (
  !Number.isFinite(weight) ||
  weight < 30 ||
  weight > 300
) {
  return res.status(400).json({
    message: "Weight must be between 30 and 300 kg",
  });
}

    // Check that the passwords match
    if (password !== confirm_password) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }

    // Check whether the email is already registered
    const existingUser = await pool.query(
      "SELECT user_id FROM users WHERE LOWER(email) = LOWER($1)",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // Hash the password before storing it
    const passwordHash = await bcrypt.hash(password, 12);

    // Create the user
    const result = await pool.query(
      `INSERT INTO users (
        first_name,
        last_name,
        email,
        password_hash,
        phone_number,
        date_of_birth,
        gender,
        height_cm,
        weight_kg
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        user_id,
        first_name,
        last_name,
        email,
        phone_number,
        date_of_birth,
        gender,
        height_cm,
        weight_kg,
        created_at`,
      [
        first_name,
        last_name,
        email.toLowerCase().trim(),
        passwordHash,
        phone_number,
        date_of_birth,
        gender,
        height,
        weight,
      ]
    );

  const newUser = result.rows[0];

const token = jwt.sign(
  {
    user_id: newUser.user_id,
    email: newUser.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(201).json({
  message: "Account created successfully",
  token,
  user: newUser,
});
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find the user
    const result = await pool.query(
      "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
      [email.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = result.rows[0];

    // Compare entered password with stored bcrypt hash
    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

   const token = jwt.sign(
  {
    user_id: user.user_id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d", // Token expires in 7 days
  }
);

res.status(200).json({
  message: "Login successful",
  token,
  user: {
    user_id: user.user_id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  },
});
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  register,
  login,
};