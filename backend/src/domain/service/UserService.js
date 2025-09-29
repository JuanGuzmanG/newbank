class UserService {

    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async consultarSaldo(_id){
        const user = await this.userRepository.findById(_id);
        if (!user) throw new Error("User no encontrado");
        return user.Saldo;
    }

    async transferir(userId, destinoDocumento, monto){
        if(monto <= 0) throw new Error("monto debe ser positivo");

        const emisor = await this.userRepository.findById(userId);
        if (!emisor) throw new Error("Usuario emisor no encontrado");

        if(emisor.Saldo < monto) throw new Error("Saldo insuficiente");

        const receptor = await this.userRepository.findByDocument(destinoDocumento);
        if(!receptor) throw new Error("Usuario no encontrado");

        //actualizar saldos
        emisor.Saldo -= monto;
        receptor.Saldo += monto;

        //registrar movimientos
        const fecha = new Date();
        const movEmisor = {
            fecha,
            tipo: "enviado",
            monto,
            descripcion: `Envio a ${receptor.documento}`,
            contraParte: receptor.documento};
        const movReceptor = { fecha,
            tipo: "recibido",
            monto,
            descripcion: `Recibido de ${emisor.documento}`,
            contraParte: emisor.documento};

        emisor.movimientos.push(movEmisor);
        receptor.movimientos.push(movReceptor);

        //guardar cambios
        await this.userRepository.save(receptor);
        await this.userRepository.save(emisor);

        return movEmisor;
    };

    async obtenerMovimientos(userId){
        const user = await this.userRepository.findById(userId);
        if (!user) throw new Error("Usuario no encontrado");
        return user.movimientos;
    };
}

module.exports = UserService;