const jwt = require('jsonwebtoken');
const User = require('../models/User');

const TOKEN_LOGIN = process.env.TOKEN_LOGIN || '12345678';
const TOKEN_EXPIRATION = '2d';
const TOKEN_REFRESH_EXPIRATION = '25d';
const TOKEN_EXPIRATION_CLIENT = '3h';
class LoginService {

    /**
     * 
     * @param {login, password, type} user 
     * @returns String - token gerado com os dados do usuario
     */
    static GenerateToken(date, time) {
        try {
            
            return jwt.sign( date, TOKEN_LOGIN, { expiresIn: time ? time : TOKEN_EXPIRATION});
        } catch (error) {
            
            throw new Error('Erro ao gerar o Token.');
        }
    };

    /**
    *
    * @param {login, password, type} user
    * @return String - token gerado com os dados do usuario
    */
    static GenerateRefreshToken(date) {
        try {
            return jwt.sign( date, TOKEN_LOGIN, { expiresIn: TOKEN_REFRESH_EXPIRATION});
        } catch (error) {
            throw new Error('Erro ao gerar o RefreshToken.');
        }
    };

    /**
     * 
     * @param refreshToken 
     * @returns String - novo token 
     */
    static RefreshToken(refreshToken) {
        try {
            const dateDecode = jwt.verify(refreshToken, TOKEN_LOGIN);
            const user = User.findByPk(dateDecode.id);
            if (user) {
                const newToken = GenerateToken(user);
                return newToken;
            }

            throw new Error('Erro ao revalidar Token inválido.')
    
        } catch (error) {
            throw new Error('Token de reinicialização inválido.');
        }
    };
};

module.exports = LoginService;

