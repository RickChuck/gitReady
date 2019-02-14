module.exports = {
    addPost: async (req, res) => {
        let db = req.app.get('db')
        let user_id = req.session.user.id
        let {post} = req.body
        try{
            let posts = await db.create_post([user_id, post.body, post.movie.title, post.movie.poster_src])
            res.status(200).send(posts);
        } catch(error){
            console.log('Cannot add post', error);
        }
        // console.log('37', posts);
    },
    
    getPost: async (req, res) => {
        let db = req.app.get('db')
        try{
            let allPosts = await db.get_post()
            res.status(200).send(allPosts)
        } catch(error){
            console.log('Cannot get post', error)
        }
        // console.log('45', allPosts)
    },

    deletePost: async (req, res) => {
        let db = req.app.get('db');
        let {id} = req.params;
        // console.log('ctrl 29', id);
        
        let removePost = await db.delete_post([id])
        // console.log('53', removePost);
        // console.log('54', req);
        try{
            await res.status(200).send(removePost)
        } catch(error){
            console.log('Cannot delete post', error)
        }
    }
}