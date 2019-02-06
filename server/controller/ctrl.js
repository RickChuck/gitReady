module.exports = {
    addPost: async (req, res) => {
        let db = req.app.get('db')
        let user_id = req.session.user.id
        let {post} = req.body
        let posts = await db.create_post([user_id, post])
        // console.log('37', posts);
        res.status(200).send(posts);
    },
    
    getPost: async (req, res) => {
        let db = req.app.get('db')
        let {post} = req.body
        let allPosts = await db.get_post([post])
        // console.log('45', allPosts)
        res.status(200).send(allPosts)
    }
}