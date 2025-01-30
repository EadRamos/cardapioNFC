const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const LoginService = require('../services/LoginService');


class LoginController {
    /**
     * 
     * @param {login, password} req 
     * @param {*} res 
     * @returns 200 - {token, refreshToken}
     */
    static async login(req, res) {
        try {
            const { login, password } = req.body;

            const user = await User.findOne({ where: { login }});

            // check the user
            if (!user) return res.status(404).json({ message : 'Usuário não encontrado.'});

            // check the password
            if (!await bcrypt.compare( password, user.password)) return res.status(400).json({ message: 'Senha incorreta.'});

            const token = LoginService.GenerateToken({login:user.login, password:user.password, type:user.type });
            const refreshToken = LoginService.GenerateRefreshToken({login:user.login, password:user.password, type:user.type });

            return res.status(200).json({ 
                message: 'success',
                token: token,
                refreshToken: refreshToken
            });

        } catch (error) {
            return res.status(500).json({ message: 'Erro interno ao efetuar login', error: error});
        }
    };

    static async loginClient(req, res) {
        try {
            const { tag } = req.body;
            console.log(req.body);
            const tokenClient = LoginService.GenerateToken({tag}, '3h');

            return res.status(200).json({ tokenClient, tag });

        } catch (error) {
            return res.status(403).json({ message: 'Não foi possível gerar o token.', error: error});
        }
    };

    static async refresh( req, res) {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ messae: 'Token de recarregamento inválido'});
        }

        try {
            const token = LoginService.RefreshToken(refreshToken);
            return res.json({ token });
        } catch (error) {
            return res.status(403).json({ message: 'Token de recarregamento inválido.'});
        }
    }

}

module.exports = LoginController;