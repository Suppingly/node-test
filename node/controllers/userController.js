import * as userService from '../services/userService.js';

export const getUsers = (req, res) => {
    const users = userService.getAllUsers();
    res.setHeader('X-Custom-Header', 'UserList');
    res.cookie('visited', 'yes', { httpOnly: true });
    res.json(users);
};

export const getUserByEmail = (req, res) => {
    const { email } = req.params;
    const user = userService.findUserByEmail(email);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json(user);
};

export const addUser = (req, res) => {
    const { name, email } = req.body;

    const success = userService.createUser(name, email);

    if (!success) {
        return res.status(409).json({ message: 'Email уже существует' });
    }

    res.status(201).json({ message: 'Пользователь добавлен' });
};

export const updateUser = (req, res) => {
    const { email } = req.params;
    const { name } = req.body;

    const success = userService.updateUser(email, { name });

    if (!success) {
        return res.status(404).json({ message: 'Пользователь не найден или не обновлён' });
    }
    res.json({ message: 'Пользователь обновлён' });
};

export const deleteUser = (req, res) => {
    const { email } = req.params;

    const success = userService.deleteUser(email);

    if (!success) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    res.json({ message: 'Пользователь удалён' });
};