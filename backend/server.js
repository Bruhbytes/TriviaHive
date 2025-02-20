const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config()
const cors = require('cors');

const questionRoutes = require('./routes/questionRoute');
const quizRoutes = require('./routes/quizRoutes');
const authRoute =  require("./routes/auth.route.js");
const attemptRoute = require("./routes/attemptRoute.js");

const app = express();

const allowedOrigins = [
    "https://astounding-stardust-52dc77.netlify.app",    
    "http://localhost:3000" // For local development
];
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true 
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
app.use("/auth", authRoute);
app.use('/attempt', attemptRoute);

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

