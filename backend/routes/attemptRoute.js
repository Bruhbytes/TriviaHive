const express = require('express');
const {postAttempt, getAttempts} = require("../controllers/AttemptController");

const router = express.Router();

router.post("/", postAttempt);
router.get("/:user", getAttempts);

module.exports = router;