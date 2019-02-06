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
    let db = req.app.get('db')
    let user_id = req.session.user.id
    let {post} = req.body
    let posts = await db.create_post([user_id, post])
    // console.log('37', posts);
    res.status(200).send(posts);
})

app.get('/api/getPost', async (req, res) => {
    let db = req.app.get('db')
    let {post} = req.body
    let allPosts = await db.get_post([post])
    // console.log('45', allPosts)
    res.status(200).send(allPosts)
})

app.delete('/api/deletePost/:id', async (req, res) => {
    let db = req.app.get('db');
    let {id} = req.params;
    let removePost = await db.delete_post([id, req.session.user.id])
    // console.log('53', removePost);
    console.log('54', req.params);
    try{
        await res.status(200).send(removePost)
    }catch(error){
        console.log(error)
    }
})

app.listen(SERVER_PORT, () => {
    console.log(`I hear it on: ${SERVER_PORT}`)
})