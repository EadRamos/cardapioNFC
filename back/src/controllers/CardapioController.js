const Category = require('../models/Category');
const Product = require('../models/Product');
const models = require('../models/index.js');

const GoogleDriveService = require('../services/GoogleDriveServices.js');
const driveService = new GoogleDriveService();
class CardapioController {
    static async index(req, res) {
        try {
            const categoriesAndProductions = await models.Category.findAll({
                include: [
                    {
                        model: Product,
                        as: 'products',
                        required: true
                    }
                ]
            });

            return res.status(200).json({itens: categoriesAndProductions});
        } catch (error) {
            return res.status(400).json({error: error});
        }
    }

    static async getProductionPromotion(req, res) {
        try {
            const products = await models.Product.findAll({
                where: {promotion: true},
                include: [
                    {
                        model: Category,
                        as: 'category' 
                    }
                ]
            });

            return res.status(200).json({itens: products});
        } catch (error) {
            return res.status(400).json({error: error});
        }
    }

    static async getProductionCategory(req, res){
        try {
            const { title } = req.params;
            console.log(title);
            if(title){
                const production = await models.Category.findOne({
                    where: {title: title},
                    include: [
                        {
                            model: Product,
                            as: 'products',
                            required: true
                        }
                    ]
                });

                return production ? res.status(200).json({iten: production}) : res.status(400).json({error: {message: 'Não foi possível encontrar produtos para esta categoria.'}});
            }
            return res.status(400).json({error: 'Necessário passar o titulo.'});
        } catch (error) {
            res.status(400).json({error: error});
        }
    }

    static async upload(req, res) {
        try {
            if(!req.file) return res.status(400).json({error: 'Imagem é obrigátorio.'});

            const fileUrl = await driveService.uploadFile(
                req.file.originalname,
                req.file.buffer,
                req.file.mimetype
            );

            return res.status(200).json({message: 'sucesso', url: fileUrl});
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
};

module.exports = CardapioController;