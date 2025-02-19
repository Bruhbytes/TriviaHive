const express = require('express');
const {getQuestion, postQuestion} = require('../controllers/questionController');

const router = express.Router();

router.get('/', getQuestion);
router.post('/', postQuestion);

module.exports = router;