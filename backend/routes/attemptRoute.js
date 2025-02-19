const express = require('express');
const {postAttempt} = require("../controllers/AttemptController");

const router = express.Router();

router.post("/", postAttempt);

module.exports = router;