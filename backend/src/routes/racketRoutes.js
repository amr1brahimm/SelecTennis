const express = require("express");
const router = express.Router();

const { getRackets } = require("../controllers/racketController");

router.get("/", getRackets);

module.exports = router;