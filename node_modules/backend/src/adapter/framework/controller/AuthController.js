const express = require("express");
const router = express.Router();

module.exports = (authService) => {
    router.post("/registro", async (req, res) => {
        try{
            const user = await authService.register(req.body);
            res.status(201).json(user);
        } catch(err){
            res.status(400).json({ error: err.message });
        }
    })

    router.post("/ingreso", async (req, res) => {
        try{
            const { email, password } = req.body;
            const { token, user } = await authService.login(email, password);
            res.json({ token, user });
        } catch(err){
            res.status(401).json({ error: err.message });
        }
    });

    return router;
}