const express = require('express');
const {getQuestion, postQuestion, postQuestions} = require('../controllers/questionController');

const router = express.Router();

router.get('/', getQuestion);
router.post('/', postQuestion);
router.post('/all', postQuestions);

module.exports = router;