const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const database = require('./database/Connection');
const cors = require('cors');

const USER_ROUTE = require('./routes/registrationRoutes');
const AUTH_ROUTE = require('./routes/authRoute');

app.use(cors());
app.use(express.json());
app.use('/auth/create-account', USER_ROUTE);
app.use('/auth/login', AUTH_ROUTE);

const start = async() => {
    await database();
    app.listen(port, () => {
        console.log('server started');
    })
}

start();