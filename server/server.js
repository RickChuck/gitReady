require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');

app.use(express.json());

let {PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

app.post('/auth/signup', async (req, res) => {
    let { user_name, password} = req.body
    
})

app.listen(PORT, () => {
    console.log(`I hear it on: ${PORT}`)
})