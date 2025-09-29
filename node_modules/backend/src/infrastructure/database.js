const mongoose = require("mongoose");

function connect(uri) {

    mongoose.connect(uri);

    mongoose.connection.once("open", () => {
        console.log("MongoDB conectado");
    });
    mongoose.connection.on("error", (err) => {
        console.error("Error de MongoDB:", err);
    });
}

module.exports = { connect };
