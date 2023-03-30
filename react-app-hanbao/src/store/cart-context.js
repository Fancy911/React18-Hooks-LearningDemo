import React from 'react';

// 创建一个购物车的context对象
const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
    dispatchCartData: () => {}
});

export default CartContext;