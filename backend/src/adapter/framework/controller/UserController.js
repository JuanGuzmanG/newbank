const express = require("express");
const router = express.Router();

module.exports = (userService) => {
    router.get("/saldo", async (req, res) => {
        try {
            const userId = req.user.id;
            const saldo = await userService.consultarSaldo(userId);
            res.json({Saldo: saldo});
        } catch (err) {
            res.status(400).json({error: err.message});
            console.log("error recibido");
        }
    });

    router.post("/transferir", async (req, res) => {
        try {
            const userId = req.user.id;
            const {destinoDocumento, monto} = req.body;
            const movimiento = await userService.transferir(userId, destinoDocumento, monto);
            res.json(movimiento);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    })

    router.get("/movimientos", async (req, res) => {
        try {
            const userId = req.user.id;
            const movimientos = await userService.obtenerMovimientos(userId);
            res.json(movimientos);
        } catch (err) {
            res.status(400).json({error: err.message});
        }
    });
    return router;
}