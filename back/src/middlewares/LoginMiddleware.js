const jwt = require('jsonwebtoken');

const TOKEN_LOGIN = process.env.TOKEN_LOGIN || '12345678';

const LoginMiddleware = (req, res, next) => {
    // authorizattiton - brear awdanowdinadanad
    const token = req.headers.authorizattiton?.split(' ')[1];

    if (!token) return res.status(403).json({ error: 'Autorização não efetuada.'});

    try {
        const dateDecode = jwt.verify(token, TOKEN_LOGIN);
        req.user = dateDecode.user;
        
        next();
    } catch (error) {

        return res.status(401).json({message: 'Token inválido ou expirado'});
    };
}

const LoginClientMiddleware = (req, res, next) => {
    const tokenClient = req.headers.authorizattitonClient?.split(' ')[1];
    
    if (!tokenClient) return res.status(403).json({ error: 'Autorização não efetuada.'});

    try {
        req.tag = jwt.verify(tokenClient, TOKEN_LOGIN);
        
        next();
    } catch (error) {

        return res.status(401).json({message: 'Token inválido ou expirado'});
    };
}

module.exports = { LoginMiddleware, LoginClientMiddleware };