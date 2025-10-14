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

router.get('/', getOrders);
router.get('/:id', getOrderById);

router.post(
    '/add',
    body('order').isArray().withMessage('Невалидный список товаров'),
    validateRequest,
    addOrder,
);
router.put(
    '/:id',
    body('id').optional().notEmpty().withMessage('Индефикатор обязателен'),
    validateRequest,
    updateOrder,
);
router.delete('/:id', deleteOrder);

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default router;