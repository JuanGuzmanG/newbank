const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    documento: String,
    nombre: String,
    apellido: String,
    email: {type: String, unique: true},
    password: String,
    roles: [String],
    Saldo: {type: Number, default: 0},
    transferencias: Array,
    movimientos: Array,
});

module.exports = mongoose.model("User", UserSchema);