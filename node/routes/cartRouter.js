import express from 'express';
import {
    getOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder,
} from '../controllers/cartController.js';

import { body, validationResult } from 'express-validator';

const router = express.Router();

router.get('/', getOrders);//http://localhost:4100/orders
router.get('/:id', getOrderById);//http://localhost:4100/orders/:id

router.post(
    '/add',
    body('order').isArray().withMessage('Невалидный список товаров'),
    validateRequest,
    addOrder,
);//http://localhost:4100/orders/add
router.put(
    '/:id',
    body('id').optional().notEmpty().withMessage('Индефикатор обязателен'),
    body('order').optional().isArray().withMessage('Невалидный список товаров'),
    body('status').optional().isString().withMessage('Невалидный статус заказа'),
    validateRequest,
    updateOrder,
);//http://localhost:4100/orders/:id
router.delete('/:id', deleteOrder);//http://localhost:4100/orders/:id

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default router;