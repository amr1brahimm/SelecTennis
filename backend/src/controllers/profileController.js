const pool = require("../config/database");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const result = await pool.query(
      `SELECT
        user_id,
        first_name,
        last_name,
        email,
        phone_number,
        TO_CHAR(date_of_birth, 'YYYY-MM-DD') AS date_of_birth,
        gender,
        height_cm,
        weight_kg,
        created_at
      FROM users
      WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Get profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const {
      first_name,
      last_name,
      phone_number,
      date_of_birth,
      gender,
      height_cm,
      weight_kg,
    } = req.body;

    // Check that all required profile fields are provided
    if (
      !first_name ||
      !last_name ||
      !phone_number ||
      !date_of_birth ||
      !gender ||
      !height_cm ||
      !weight_kg
    ) {
      return res.status(400).json({
        message: "All profile fields are required",
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

    const result = await pool.query(
      `UPDATE users
       SET
         first_name = $1,
         last_name = $2,
         phone_number = $3,
         date_of_birth = $4,
         gender = $5,
         height_cm = $6,
         weight_kg = $7,
         updated_at = NOW()
       WHERE user_id = $8
       RETURNING
         user_id,
         first_name,
         last_name,
         email,
         phone_number,
         date_of_birth,
         gender,
         height,
         weight,
         created_at,
         updated_at`,
      [
        first_name,
        last_name,
        phone_number,
        date_of_birth,
        gender,
        height_cm,
        weight_kg,
        userId,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  getProfile,
  updateProfile,
};