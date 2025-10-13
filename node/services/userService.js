import users from '../data/user.js';

export const getAllUsers = () => users;

export const findUserByEmail = (email) => {
    return users.find((u) => u.email==email);
};
export const createUser = (name, email) => {
    if (findUserByEmail(email)) return false;

    const newUser = {
    name,
    email,
    createdAt: new Date(),
    };

    users.push(newUser);
    return true;
};
export const updateUser = (email, updates) => {
    const user = findUserByEmail(email);
    if (!user) return false;

    if (updates.name) user.name = updates.name;
    return true;
};

export const deleteUser = (email) => {
    const index = users.findIndex ((u) => u.email == email);
    if (index == -1) return false;

    users.splice(index, 1);
    return true;
};