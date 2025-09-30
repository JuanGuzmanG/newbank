const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000
})
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.log("error connecting to the database", err);
    });

module.exports = mongoose;
