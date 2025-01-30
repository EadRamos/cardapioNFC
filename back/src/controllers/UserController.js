const UserRepository = require('../repositories/UserRepository');

class UserController {
    static async cadastro(req, res) {

    }

    static async getUser(req, res) {
        const { id } = req.params;
        const user = await UserRepository.getUser(id);
        return res.status(200).json(user);
    }
}

module.exports = UserController;