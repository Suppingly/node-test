import * as cartService from '../services/cartService.js';

export const getOrders = (req, res) => {
    const orders = cartService.getAllOrders();
    res.setHeader('X-Custom-Header', 'OrderList');
    res.cookie('visited', 'yes', { httpOnly: true });
    res.json(orders);
};

export const getOrderById = (req, res) => {
    const { id } = req.params;
    const order = cartService.findOrderById(id);

    if (!order) {
        return res.status(404).json({ message: 'Список товаров не найден' });
    }
    res.json(order);
};

export const addOrder = (req, res) => {
    const id = cartService.addId()
    const { order } = req.body;
    const success = cartService.createOrder(id,order);

    if (!success) {
        return res.status(409).json({ message: 'Id уже существует' });
    }

    res.status(201).json({ message: 'Список товаров добавлен' });
};

export const updateOrder = (req, res) => {
    const { id } = req.params;
    const order= req.body;
    const success = cartService.updateOrder(id, order);

    if (!success) {
        return res.status(404).json({ message: 'Список товаров не найден или не обновлен' });
    }
    res.json({ message: 'Список товаров обновлён' });
};

export const deleteOrder = (req, res) => {
    const { id } = req.params;

    const success = cartService.deleteOrder(id);

    if (!success) {
        return res.status(404).json({ message: 'Список товаров не найден' });
    }
    res.json({ message: 'Список товаров удалён' });
};