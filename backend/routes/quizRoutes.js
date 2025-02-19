const express = require('express');
const router = express.Router();
const {getQuiz, postQuiz} = require('../controllers/quizController');

router.get('/', getQuiz);
router.post('/', postQuiz);

module.exports = router;