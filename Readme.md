# Welcome to TriviaHive

This is a full-stack quiz application that allows users to attempt quizzes, track their progress, and view their past attempts. The app includes features like a countdown timer for each question, automatic submission when time runs out, and scoring based on correct answers.

## Platform deployed link:
[Visit TriviaHive](https://astounding-stardust-52dc77.netlify.app/)

## Tech Stack
- Frontend: React.js, Material UI
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT-based authentication (via Express middleware)
- State Management: React Context API

## To setup the project locally follow the steps:

### Backend setup

Open terminal (make sure you have node and npm installed) and run the following commands in proper order 

1. Clone the repository
```
    git clone https://github.com/Bruhbytes/TriviaHive.git   
    cd TriviaHive
```

2. Move to backend directory
```
    cd backend    
```

3. Create a .env file with these variables
```
    MONGODB_URL=<your url>
    JWT_KEY=<your secret phrase>    
```

4. Install the dependencies and start server
```
    npm install
    npm start
```

### Frontend

Open terminal and run the following commands
```
    cd frontend
    npm install
    npm start
```

> NOTE: Currently the backend in hosted on Render so it might take slight delay to serve the initial requests

---
### To use a Local Backend Instead of the Deployed One

Search for the link 'https://triviahive-backend.onrender.com' in your frontend codebase and replace all with 'http://localhost:4000'

