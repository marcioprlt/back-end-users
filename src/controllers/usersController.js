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

    static listUserById = (req, res) => {
        const id = req.params.id;

        users.findById(id, (err, user) => {
            if (!err) {
                user.password = undefined;
                res.status(200).send(user);
            } else {
                res.status(404).send({message: `Usuário não encontrado -- ${err.message}`});
            }
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

    static updateUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if (!err) {
                res.status(200).send({message: "Usuário atualizado com sucesso"});
            } else {
                res.status(404).send({message: `Usuário não encontrado -- ${err}`});
            }
        });
    }
}

export default UserController;