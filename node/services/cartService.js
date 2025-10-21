import orders from '../data/cart.js';

export const getAllOrders = () => orders;

export const findOrderById = (id) => {
    return orders.find((o) => o.id==id);
};
export const createOrder = (id,order) => {
    if (findOrderById(id)) return false;

    const newOrder = {
    id,
    order,
    createdAt: new Date().toLocaleString(),
    status: 'ordered'
    };

    orders.push(newOrder);
    return true;
};
export const updateOrder = (id,updates) => {
    const cart = findOrderById(id);
    if (!cart) return false;
    console.log(updates)
    if (updates.order) cart.order = updates.order;
    if (updates.status) cart.status = updates.status;
    return true;
};

export const deleteOrder = (id) => {
    const index = orders.findIndex ((o) => o.id == id);
    if (index == -1) return false;

    orders.splice(index, 1);
    return true;
};
export const addId=()=>{
    let i=getAllOrders().length;
    i++;
    return i;
}