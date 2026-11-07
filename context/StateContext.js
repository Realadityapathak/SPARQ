import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

const defaultState = {
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  setQty: () => {},
  incQty: () => {},
  decQty: () => {},
  onAdd: () => {},
  toggleCartItemQuantity: () => {},
  toggleCartItemQuanitity: () => {},
  onRemove: () => {},
  setCartItems: () => {},
  setTotalPrice: () => {},
  setTotalQuantities: () => {}
};

const Context = createContext(defaultState);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product, quantity) => {
    if (!product) return;
    // Input Validation: strictly clamp quantity to a valid positive integer between 1 and 20
    const addCount = Math.max(1, Math.min(20, Math.floor(Number(quantity) || 1)));

    setTotalPrice((prev) => prev + product.price * addCount);
    setTotalQuantities((prev) => prev + addCount);

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + addCount }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: addCount }];
    });

    const label = addCount > 1 ? `${addCount} × ${product.name}` : product.name;
    toast.success(`${label} added to your bag`);
  };

  const onRemove = (product) => {
    if (!product) return;
    const target = cartItems.find((item) => item._id === product._id);
    if (!target) return;

    setTotalPrice((prev) => Math.max(0, prev - target.price * target.quantity));
    setTotalQuantities((prev) => Math.max(0, prev - target.quantity));
    setCartItems((prev) => prev.filter((item) => item._id !== product._id));
  };

  const toggleCartItemQuantity = (id, value) => {
    const target = cartItems.find((item) => item._id === id);
    if (!target) return;

    if (value === 'inc') {
      if (target.quantity >= 20) {
        toast.error('Maximum quantity limit (20 units) reached.');
        return;
      }
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
      setTotalPrice((prev) => prev + target.price);
      setTotalQuantities((prev) => prev + 1);
    } else if (value === 'dec') {
      if (target.quantity > 1) {
        setCartItems((prev) =>
          prev.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
        setTotalPrice((prev) => Math.max(0, prev - target.price));
        setTotalQuantities((prev) => Math.max(0, prev - 1));
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => (prevQty - 1 < 1 ? 1 : prevQty - 1));
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        setQty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        toggleCartItemQuanitity: toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context) || defaultState;
