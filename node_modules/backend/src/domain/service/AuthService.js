const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../entity/User');

class AuthService {
    constructor(userRepository, jwtSecret){
        this.userRepository = userRepository;
        this.jwtSecret = jwtSecret;
    }

    async register(data){
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = new User({...data, password: hashedPassword, roles: ["cliente"], saldo: 0, transferencias: [], movimientos:[]});
        return await this.userRepository.save(newUser);
    }

    async login(email, password){
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error ("User not found");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error("Invalid password");

        const token = jwt.sign({ id: user._id, roles: user.roles }, this.jwtSecret, { expiresIn: '1h' });
        return { token, user };
    }
}

module.exports = AuthService;