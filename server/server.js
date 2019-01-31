require('dotenv').config();
const express = require('express');
const session = require('express-session');
const app = express();
const massive = require('massive');
const auth = require('./controller/auth_ctrl')

app.use(express.json());

let {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
})

//Auth endpoints
app.post('/auth/signup', auth.signup)
app.post('/auth/login', auth.login)
app.post('/auth/logout', async (req, res) => {
    await req.session.destroy();
    res.sendStatus(200);
})

//Blog Post endpoints
app.post('/api/addPost', async (req, res) => {
    let {post} = req.body
    let db = req.app.get('db')
    let user_id = req.session.user
    let createdPost = await db.create_post([post, user_id])
    res.status(200).send(createdPost);
})

app.get('/api/getPost', async (req, res) => {
    let db = req.app.get('db')
    let {post} = req.body
    let allPosts = await db.get_post([post])
    res.status(200).send(allPosts)
})

app.listen(SERVER_PORT, () => {
    console.log(`I hear it on: ${SERVER_PORT}`)
})