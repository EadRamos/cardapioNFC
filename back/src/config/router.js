const express = require('express');
const router = express.Router();

// CONTROLLERS
const UserController = require('../controllers/UserController');
const LoginController = require('../controllers/LoginController');
const CardapioController = require('../controllers/CardapioController');

// MIDDLEWARES
const { LoginMiddleware, LoginClientMiddleware} = require('../middlewares/LoginMiddleware');

// ROTAS
router.get('/', CardapioController.getProductionPromotion);

router.get('/user/:id', UserController.getUser);

// LOGIN
router.post('/login', LoginController.login);
router.post('/login/client', LoginController.loginClient);
router.post('/cadastro', LoginMiddleware, LoginController.cadastro);

// CARDAPIO
router.get('/cardapio', CardapioController.index);
router.get('/cardapio/:title', CardapioController.getProductionCategory);

router.get('/protect', LoginMiddleware, (req, res) => { res.json({ message: 'tudo ok'})});


module.exports = router;