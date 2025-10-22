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
    orders.sort((a,b)=>a.id - b.id);
    return true;
};
export const updateOrder = (id,updates) => {
    const cart = findOrderById(id);
    if (!cart) return false;
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
    let ids=[];
    let orders=getAllOrders();
    let count=0;
    orders.forEach((order)=>{ids.push(order.id)})
    for (let i=1;i<=orders.length;i++){
        count++;
        if (ids.indexOf(i) == -1) {
            return i;
        }
    }
    count+=1;
    return count;
}