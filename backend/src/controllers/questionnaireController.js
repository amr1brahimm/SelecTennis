const pool = require("../config/database");

// Start a new questionnaire attempt
const startQuestionnaire = async (req, res) => {
  try {
    const userId = req.user.user_id;

    // Check whether the user already has an unfinished attempt.
    const existingResult = await pool.query(
      `
      SELECT *
      FROM questionnaire_attempts
      WHERE user_id = $1
        AND status = 'in_progress'
      ORDER BY started_at DESC
      LIMIT 1
      `,
      [userId]
    );

    if (existingResult.rows.length > 0) {
      return res.status(200).json({
        message: "Existing questionnaire resumed.",
        attempt: existingResult.rows[0],
        resumed: true,
      });
    }

    // Otherwise create a new attempt.
    const result = await pool.query(
      `
      INSERT INTO questionnaire_attempts
        (user_id, status, started_at)
      VALUES
        ($1, 'in_progress', CURRENT_TIMESTAMP)
      RETURNING *
      `,
      [userId]
    );

    res.status(201).json({
      message: "Questionnaire started.",
      attempt: result.rows[0],
      resumed: false,
    });
  } catch (error) {
    console.error("Start questionnaire error:", error);

    res.status(500).json({
      message: "Failed to start questionnaire.",
    });
  }
};
const saveOptionAnswer = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.user_id;

    const {
      attempt_id,
      question_id,
      answers,
    } = req.body;

    if (
      !attempt_id ||
      !question_id ||
      !Array.isArray(answers)
    ) {
      return res.status(400).json({
        message: "attempt_id, question_id and answers are required.",
      });
    }

    await client.query("BEGIN");

    // Make sure this attempt belongs to the logged-in user.
    const attemptResult = await client.query(
      `
      SELECT attempt_id
      FROM questionnaire_attempts
      WHERE attempt_id = $1
        AND user_id = $2
        AND status = 'in_progress'
      `,
      [attempt_id, userId]
    );

    if (attemptResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Active questionnaire attempt not found.",
      });
    }

    // Replace any previous option answers for this question.
    await client.query(
      `
      DELETE FROM user_answer_options
      WHERE attempt_id = $1
        AND question_id = $2
      `,
      [attempt_id, question_id]
    );

    // Save the current selections.
    for (const answer of answers) {
      await client.query(
        `
        INSERT INTO user_answer_options
        (
          attempt_id,
          question_id,
          answer_option_id,
          selection_role
        )
        VALUES ($1, $2, $3, $4)
        `,
        [
          attempt_id,
          question_id,
          answer.answer_option_id,
          answer.selection_role || "standard",
        ]
      );
    }

    // Update questionnaire progress.
    await client.query(
      `
      UPDATE questionnaire_attempts
      SET
        current_question_id = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE attempt_id = $2
      `,
      [question_id, attempt_id]
    );

    await client.query("COMMIT");

    res.json({
      message: "Answer saved.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Save option answer error:", error);

    res.status(500).json({
      message: "Failed to save answer.",
    });
  } finally {
    client.release();
  }
};
const saveNumericAnswer = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.user_id;

    const {
      attempt_id,
      question_id,
      numeric_value,
      unit,
    } = req.body;

    if (
      !attempt_id ||
      !question_id ||
      numeric_value === undefined ||
      numeric_value === null
    ) {
      return res.status(400).json({
        message:
          "attempt_id, question_id and numeric_value are required.",
      });
    }

    await client.query("BEGIN");

    // Make sure the attempt belongs to the logged-in user.
    const attemptResult = await client.query(
      `
      SELECT attempt_id
      FROM questionnaire_attempts
      WHERE attempt_id = $1
        AND user_id = $2
        AND status = 'in_progress'
      `,
      [attempt_id, userId]
    );

    if (attemptResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Active questionnaire attempt not found.",
      });
    }

    // Replace any previous numeric answer for this question.
    await client.query(
      `
      DELETE FROM user_numeric_answers
      WHERE attempt_id = $1
        AND question_id = $2
      `,
      [attempt_id, question_id]
    );

    await client.query(
      `
      INSERT INTO user_numeric_answers
      (
        attempt_id,
        question_id,
        numeric_value,
        unit
      )
      VALUES ($1, $2, $3, $4)
      `,
      [
        attempt_id,
        question_id,
        numeric_value,
        unit || null,
      ]
    );

    // Update questionnaire progress.
    await client.query(
      `
      UPDATE questionnaire_attempts
      SET
        current_question_id = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE attempt_id = $2
      `,
      [question_id, attempt_id]
    );

    await client.query("COMMIT");

    res.json({
      message: "Numeric answer saved.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Save numeric answer error:", error);

    res.status(500).json({
      message: "Failed to save numeric answer.",
    });
  } finally {
    client.release();
  }
};
const saveTextAnswer = async (req, res) => {
  const client = await pool.connect();

  try {
    const userId = req.user.user_id;

    const {
      attempt_id,
      question_id,
      text_value,
    } = req.body;

    if (
      !attempt_id ||
      !question_id ||
      text_value === undefined ||
      text_value === null
    ) {
      return res.status(400).json({
        message:
          "attempt_id, question_id and text_value are required.",
      });
    }

    await client.query("BEGIN");

    const attemptResult = await client.query(
      `
      SELECT attempt_id
      FROM questionnaire_attempts
      WHERE attempt_id = $1
        AND user_id = $2
        AND status = 'in_progress'
      `,
      [attempt_id, userId]
    );

    if (attemptResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Active questionnaire attempt not found.",
      });
    }

    // Replace the previous text answer for this question.
    await client.query(
      `
      DELETE FROM user_text_answers
      WHERE attempt_id = $1
        AND question_id = $2
      `,
      [attempt_id, question_id]
    );

    await client.query(
      `
      INSERT INTO user_text_answers
      (
        attempt_id,
        question_id,
        text_value
      )
      VALUES ($1, $2, $3)
      `,
      [
        attempt_id,
        question_id,
        text_value,
      ]
    );

    await client.query(
      `
      UPDATE questionnaire_attempts
      SET
        current_question_id = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE attempt_id = $2
      `,
      [question_id, attempt_id]
    );

    await client.query("COMMIT");

    res.json({
      message: "Text answer saved.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Save text answer error:", error);

    res.status(500).json({
      message: "Failed to save text answer.",
    });
  } finally {
    client.release();
  }
};
const getActiveQuestionnaire = async (req, res) => {
  try {
    const userId = req.user.user_id;

    const attemptResult = await pool.query(
      `
      SELECT *
      FROM questionnaire_attempts
      WHERE user_id = $1
        AND status = 'in_progress'
      ORDER BY started_at DESC
      LIMIT 1
      `,
      [userId]
    );

    if (attemptResult.rows.length === 0) {
      return res.json({
        attempt: null,
        optionAnswers: [],
        numericAnswers: [],
        textAnswers: [],
        healthClassifications: [],
      });
    }

    const attempt = attemptResult.rows[0];
    const attemptId = attempt.attempt_id;

    const [
      optionResult,
      numericResult,
      textResult,
      healthClassificationResult,
      currentRacketResult,
    ] = await Promise.all([
      pool.query(
        `SELECT * FROM user_answer_options WHERE attempt_id = $1 ORDER BY question_id`,
        [attemptId]
      ),
      pool.query(
        `SELECT * FROM user_numeric_answers WHERE attempt_id = $1 ORDER BY question_id`,
        [attemptId]
      ),
      pool.query(
        `SELECT * FROM user_text_answers WHERE attempt_id = $1 ORDER BY question_id`,
        [attemptId]
      ),
      pool.query(
        `
        SELECT question_id, area_code, classification
        FROM user_health_classifications
        WHERE attempt_id = $1
        ORDER BY area_code
        `,
        [attemptId]
      ),
      pool.query(
        `SELECT racket_id FROM attempt_current_rackets WHERE attempt_id = $1 LIMIT 1`,
        [attemptId]
      ),
    ]);

    res.json({
      attempt,
      optionAnswers: optionResult.rows,
      numericAnswers: numericResult.rows,
      textAnswers: textResult.rows,
      healthClassifications: healthClassificationResult.rows,
      currentRacket: currentRacketResult.rows[0] || null,
    });
  } catch (error) {
    console.error("Get active questionnaire error:", error);
    res.status(500).json({ message: "Failed to load questionnaire." });
  }
};

const completeQuestionnaire = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { attempt_id } = req.body;

    if (!attempt_id) {
      return res.status(400).json({
        message: "attempt_id is required.",
      });
    }

    const result = await pool.query(
      `
      UPDATE questionnaire_attempts
      SET
        status = 'completed',
        completed_at = CURRENT_TIMESTAMP,
        updated_at = CURRENT_TIMESTAMP
      WHERE attempt_id = $1
        AND user_id = $2
        AND status = 'in_progress'
      RETURNING *
      `,
      [attempt_id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Active questionnaire attempt not found.",
      });
    }

    res.json({
      message: "Questionnaire completed.",
      attempt: result.rows[0],
    });
  } catch (error) {
    console.error("Complete questionnaire error:", error);

    res.status(500).json({
      message: "Failed to complete questionnaire.",
    });
  }
};
const saveHealthClassification = async (req, res) => {
  const client = await pool.connect();

  try {
    const { attempt_id, question_id, classifications } = req.body;
    const userId = req.user.user_id;

    if (
      !attempt_id ||
      !question_id ||
      !Array.isArray(classifications)
    ) {
      return res.status(400).json({
        message: "Invalid health classification data.",
      });
    }

    const validClassifications = new Set([
      "previous_injury",
      "physical_discomfort",
      "both",
    ]);

    const validAreas = new Set([
      "wrist",
      "elbow",
      "forearm",
      "shoulder",
      "back",
      "other",
    ]);

    for (const item of classifications) {
      if (
        !validAreas.has(item.area_code) ||
        !validClassifications.has(item.classification)
      ) {
        return res.status(400).json({
          message: "Invalid health classification value.",
        });
      }
    }

    await client.query("BEGIN");

    const attemptResult = await client.query(
      `
      SELECT attempt_id
      FROM questionnaire_attempts
      WHERE attempt_id = $1
        AND user_id = $2
        AND status = 'in_progress'
      `,
      [attempt_id, userId]
    );

    if (attemptResult.rows.length === 0) {
      await client.query("ROLLBACK");

      return res.status(404).json({
        message: "Active questionnaire attempt not found.",
      });
    }

    await client.query(
      `
      DELETE FROM user_health_classifications
      WHERE attempt_id = $1
        AND question_id = $2
      `,
      [attempt_id, question_id]
    );

    for (const item of classifications) {
      await client.query(
        `
        INSERT INTO user_health_classifications
          (attempt_id, question_id, area_code, classification)
        VALUES ($1, $2, $3, $4)
        `,
        [
          attempt_id,
          question_id,
          item.area_code,
          item.classification,
        ]
      );
    }

    await client.query(
      `
      UPDATE questionnaire_attempts
      SET current_question_id = $1,
          updated_at = NOW()
      WHERE attempt_id = $2
      `,
      [question_id, attempt_id]
    );

    await client.query("COMMIT");

    res.json({
      message: "Health classification saved.",
    });
  } catch (error) {
    await client.query("ROLLBACK");

    console.error("Save health classification error:", error);

    res.status(500).json({
      message: "Server error.",
    });
  } finally {
    client.release();
  }
};


const saveCurrentRacket = async (req, res) => {
  const client = await pool.connect();
  try {
    const userId = req.user.user_id;
    const { attempt_id, racket_id } = req.body;
    if (!attempt_id || !racket_id) {
      return res.status(400).json({ message: "attempt_id and racket_id are required." });
    }

    await client.query("BEGIN");
    const attempt = await client.query(
      `SELECT attempt_id FROM questionnaire_attempts WHERE attempt_id = $1 AND user_id = $2 AND status = 'in_progress'`,
      [attempt_id, userId]
    );
    if (!attempt.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Active questionnaire attempt not found." });
    }

    const racket = await client.query(`SELECT racket_id FROM rackets WHERE racket_id = $1 AND is_active = TRUE`, [racket_id]);
    if (!racket.rows.length) {
      await client.query("ROLLBACK");
      return res.status(404).json({ message: "Racket not found." });
    }

    await client.query(`DELETE FROM attempt_current_rackets WHERE attempt_id = $1`, [attempt_id]);
    await client.query(`INSERT INTO attempt_current_rackets (attempt_id, racket_id) VALUES ($1, $2)`, [attempt_id, racket_id]);
    await client.query(`UPDATE questionnaire_attempts SET current_question_id = 9, updated_at = CURRENT_TIMESTAMP WHERE attempt_id = $1`, [attempt_id]);
    await client.query("COMMIT");
    return res.json({ message: "Current racket saved.", racket_id: Number(racket_id) });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Save current racket error:", error);
    return res.status(500).json({ message: "Failed to save current racket." });
  } finally {
    client.release();
  }
};

module.exports = {
  startQuestionnaire,
  saveOptionAnswer,
  saveNumericAnswer,
  saveTextAnswer,
  getActiveQuestionnaire,
  saveHealthClassification,
  completeQuestionnaire,
  saveCurrentRacket,
};