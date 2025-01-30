const express = require('express');
const router = express.Router();

// CONTROLLERS
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');

// MIDDLEWARES
const { LoginMiddleware, LoginClientMiddleware} = require('../middlewares/LoginMiddleware');

// ROTAS
router.get('/', (req,res) => { res.json({ message: 'Rota de autenticação ok.'})});

router.get('/user/:id', UserController.getUser);

router.post('/login', LoginController.login);
router.post('/login/client', LoginController.loginClient);

router.get('/protect', LoginMiddleware, (req, res) => { res.json({ message: 'tudo ok'})});


module.exports = router;