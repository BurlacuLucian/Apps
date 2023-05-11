import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

      const existingCartItem = state.items[existingCartItemIndex];
      
      let updatedItems;

      if(existingCartItem) {
        const updatedItem = {
          ...existingCartItem, 
          amount: existingCartItem.amount + action.item.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
     

   
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if(action.type === 'REMOVE') {


    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems, 
      totalAmount: updatedTotalAmount
    }

  }

  if (action.type === "REMOVE_ITEMS") {
    const { id, quantity } = action.payload;
    const existingItem = state.items.find((item) => item.id === id);

    if (existingItem) {
      if (quantity >= existingItem.amount) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
          totalAmount: state.totalAmount - existingItem.price * existingItem.amount,
        };
      } else {
        const updatedItems = state.items.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              amount: item.amount - quantity,
            };
          }
          return item;
        });
        return {
          ...state,
          items: updatedItems,
          totalAmount: state.totalAmount - existingItem.price * quantity,
        };
      }
    }
  }


  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const removeItemsFromCart = (id, quantity = 1) => {
    dispatchCartAction({ type: "REMOVE_ITEMS", payload: { id, quantity } });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    removeItems: removeItemsFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
