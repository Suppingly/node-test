import express from 'express';
import {
    getUsers,
    getUserByEmail,
    addUser,
    updateUser,
    deleteUser,
} from '../controllers/userController.js';

import { body, validationResult } from 'express-validator';

const router = express.Router() ;

router.get('/', getUsers);
router.get('/:email', getUserByEmail);

router.post(
    '/add',
    body('name').notEmpty().withMessage('Имя обязательно'),
    body('email').isEmail().withMessage('Невалидный email'),
    validateRequest,
    addUser,
);
router.put(
    '/:email',
    body('name').optional().notEmpty().withMessage('Имя не может быть пустым'),
    body('email').optional().isEmail().withMessage('Невалидный email'),
    validateRequest,
    updateUser,
);
router.delete('/:email', deleteUser);

function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    next();
}

export default router;