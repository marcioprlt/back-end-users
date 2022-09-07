import users from "../models/User.js";

class UserController {

    static listUsers = (req, res) => {
        users.find((err, users) => {
            let noPassword = users.map(user => {
                user.password = undefined;
                return user;
            });
            res.status(200).json(noPassword);
        });
    }

    static createUser = (req, res) => {
        let user = users(req.body);

        user.save(err => {
            if (!err) {
                res.status(201).send(user.toJSON());
            } else {
                res.status(500).send({message: `Falha ao cadastrar o usuário -- ${err.message}`});
            }
        });
    }
}

export default UserController;