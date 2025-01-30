const User = require('../models/User');
const bcript = require('bcryptjs');

class UserRepository {
    static async create(data) {
        data.password = bcript.hashSync(data.password, 10);
        return User.create(data);
    }

    static async getUser(id) {
        const user = User.findByPk(id);
        return user ? user : undefined;
    }
    
    static async getAll() {
        const users = User.findAll();
        return users ? users : undefined;;
    }
}

module.exports = UserRepository;