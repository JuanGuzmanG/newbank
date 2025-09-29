const jwt = require("jsonwebtoken");

function authJwt(secret) {
    return(req, res, next) => {
        const authHeader = req.headers["authorization"] || "";
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        jwt.verify(token, secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Failed to authenticate token" });
            }
            req.user = user;
            next();
        });
    }
}
module.exports = authJwt;