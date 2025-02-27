const { Sequelize } = require('sequelize');
const models = require('../models/index.js');

class PedidosController {
    static async getPedidos(req, res){
        try {
            const { table } = req.params;

            if(!table) return res.status(400).json({ message: "Faltan datos" });

            const pedidos = await models.Order.findAll({ 
                where: { 
                    table_number: table,
                    finished: false
                },
                include: [
                    {
                        model: models.Product,
                        as: 'product',
                        required: true,
                        through: {
                            attributes: ['amount'],
                        }
                    }
                ],
            });

            
            pedidos.forEach(pedido => {
                pedido.product.forEach(produto => {
                    if (produto.OrderProduct.amount === null) {
                        produto.OrderProduct.amount = 1; // Substitua 1 pelo valor padrão real
                    }
                });
            });

            return res.status(200).json({itens: pedidos});

        } catch (error) {
            return res.status(400).json({error: error.toString() ,chegou: req.params.table});
        }
    }
}

module.exports = PedidosController;