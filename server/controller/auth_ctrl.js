const bcrypt = require('bcrypt');

module.exports = {
    signup: async (req, res) => {
        let { user_name, hash_value} = req.body;
        let db = req.app.get('db')
        let userFound = await db.user_check([user_name]);
        // console.log(userFound)
        if (userFound[0]) {
            return res.status(400).send('Username already exits');
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(hash_value, salt);
        let createdUser = await db.create_user([user_name, hash])
        req.session.user = { id: createdUser[0].id, user_name: createdUser[0].user_name };
        res.status(200).send(req.session.user);
    },

    login: async (req, res) => {
        let { user_name, hash_value } = req.body;
        let db = req.app.get('db')
        let userFound = await db.user_check([user_name])
        // console.log(userFound)
        if(!userFound[0]) {
            return res.status(400).send('No username found')
        }
        let result = bcrypt.compareSync(hash_value, userFound[0].hash_value)
        if (result) {
            req.session.user = {id: userFound[0].id, user_name: userFound[0].user_name}
            // console.log(req.session.user);
            res.status(200).send(req.session.user)
        } else {
            return res.status(401).send('Incorrect username or password')
        }
    }
}