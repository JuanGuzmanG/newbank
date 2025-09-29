class User {
    constructor({documento, nombre, apellido, email, password, roles=[],saldo=0, transferencias = [], movimientos = []}){
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.saldo = saldo;
        this.transferencias = transferencias;
        this.movimientos = movimientos;
    }
}
module.exports = User;