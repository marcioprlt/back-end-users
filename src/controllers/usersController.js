import users from "../models/User.js";
import moment from "moment";

class UserController {

    static listUsers = (req, res) => {

        const page = parseInt(req.query.page);
        const preLimit = parseInt(req.query.limit);
        const limit = preLimit ? preLimit : 3;

        const startIndex = (page - 1) * limit;

        try {
            users.find().limit(limit).skip(startIndex).lean().exec((err, users) => {
                users.forEach(user => delete user.password);
                res.status(200).json(users);
            });
        } catch (e) {
            res.status(500).send({message: `Pagination error -- ${e.message}`});
        }
    }

    static listUserById = (req, res) => {
        const id = req.params.id;

        users.findById(id).lean().exec((err, user) => {
            if (!err) {
                if (user != null) {
                    delete user.password;
                    res.status(200).send(user);
                } else {
                    res.status(404).send({message: "User not found"});
                }
            } else {
                res.status(404).send({message: `User not found -- ${err.message}`});
            }
        }); 
    }

    static createUser = (req, res) => {
        let user = new users(req.body);

        if (!this.validateYears(user.birthDate))
        {
            res.status(400).send({message: "User is under 18"});
            return;
        }

        user.save(err => {
            if (!err) {
                user = user.toJSON();
                user.password = user.password.replace(/./g, "*");
                res.status(201).send(user);
            } else {
                res.status(500).send({message: `Could not create user -- ${err.message}`});
            }
        });
    }

    static updateUser = (req, res) => {
        const id = req.params.id;

        if (req.body.birthDate) {
            if (!this.validateYears(req.body.birthDate))
            {
                res.status(400).send({message: "User is under 18"});
                return;
            }
        }

        users.findByIdAndUpdate(id, {$set: req.body}, {runValidators: true}, (err) => {
            if (!err) {
                res.status(200).send({message: "User updated successfully"});
            } else {
                res.status(404).send({message: `Could not update user -- ${err.message}`});
            }
        })
    }

    static deleteUser = (req, res) => {
        const id = req.params.id;

        users.findByIdAndDelete(id, (err) => {
            if (!err) {
                res.status(204).send({message: "User deleted successfully"});
            } else {
                res.status(404).send({message: `User not found -- ${err.message}`});
            }
        });
    }

    static findUsersByName = (req, res) => {
        const name = req.query.name;

        users.find((err, users) => {
            let usersWithName = [];
            users.forEach(user => {
                if (name != "" && user.name.toLowerCase().includes(name.toLowerCase())) {
                    usersWithName.push(user);
                }
            });
            res.status(200).json(usersWithName);
        });
    }

    static validateYears(date) {
        const dur = moment.duration({from: moment(date), to: new Date()});
        const years = dur.asYears();
        return years >= 18;
    }
}

export default UserController;