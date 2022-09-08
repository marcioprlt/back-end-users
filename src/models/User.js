import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String},
    name: {type: String, required: true},
    cpf: {type: String, validate:/^\d{11}$/, required: true},
    birthDate: {type: Date, required: true},
    email: {type: String, validate:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, required: true},
    password: {type: String, validate:/\S{6,}/, required: true},
    address: {type: String, required: true},
    number: {type: String, required: true},
    complement: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    zipCode: {type: String, validate:/^\d{5}-\d{3}$/, required: true}
});

const users = mongoose.model("users", userSchema);

export default users;