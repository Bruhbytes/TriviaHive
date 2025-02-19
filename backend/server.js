const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');

const questionRoutes = require('./routes/questionRoute');
const quizRoutes = require('./routes/quizRoutes');

const app = express();
app.use(cors({
    origin: [`${process.env.FRONTEND_URL}`],
}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json());

const url = process.env.MONGODB_URL;

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use('/question', questionRoutes);
app.use('/quiz', quizRoutes);

try{
    mongoose.connect(url)
    .then(() => console.log("Database connected") )
    .catch(err => {
        throw Error("Database connection error", err);
    })
    app.listen(4000, (req, res) => {
        console.log("Server started on port 4000");
    })
}
catch (err){
    console.log(err);
}

