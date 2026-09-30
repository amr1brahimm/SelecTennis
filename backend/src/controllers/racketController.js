const pool = require("../config/database");

const getRackets = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        r.racket_id,
        r.name,
        r.image_url,
        r.description,
        b.name AS brand,
        rs.head_size,
        rs.string_pattern,
        rs.stiffness_ra,
        rs.balance_cm,
        rs.unstrung_weight_g,
        rs.swingweight,
        rs.length_cm,
        rs.beam_head_mm,
        rs.beam_middle_mm,
        rs.beam_throat_mm,
        rc.power_score,
        rc.control_score,
        rc.spin_score,
        rc.forgiveness_score,
        rc.maneuverability_score,
        rc.stability_score,
        rc.feel_touch_score,
        rc.comfort_score
      FROM rackets r
      JOIN brands b
        ON r.brand_id = b.brand_id
      LEFT JOIN racket_specifications rs
        ON r.racket_id = rs.racket_id
        LEFT JOIN racket_characteristics rc
    ON rc.racket_id = r.racket_id
      WHERE r.is_active = true
      ORDER BY b.name, r.name;
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Get rackets error:", error);
    res.status(500).json({ message: "Failed to load rackets." });
  }
};

module.exports = { getRackets };