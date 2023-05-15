import React from "react";


const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    removeItems: (id, quantity=1) => {},
});

export default CartContext ;

