import React, { createContext, useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import '../index.css'

// Cart Context
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return { ...state, items: action.payload, cartId: action.cartId };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.toString() !== action.payload.productId),
      };
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.toString() === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], cartId: null });

  const fetchCart = async (userId) => {
    try {
      const response = await axios.get(`https://furniture-cart-5.onrender.com/api/user/cart/${userId}`);
      if (response.data) {
        dispatch({ type: 'SET_CART', payload: response.data.cartItems, cartId: response.data._id });
      } else {
        dispatch({ type: 'SET_CART', payload: [], cartId: null });
      }
    } catch (err) {
      console.error('Failed to fetch cart:', err);
      dispatch({ type: 'SET_CART', payload: [], cartId: null });
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

// Cart Page Component
const CartPage = () => {
  const { state, dispatch, fetchCart } = useCart();
  const userId = localStorage.getItem('userId'); // Fetch the user ID from localStorage

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId, fetchCart]);

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`https://furniture-cart-5.onrender.com/api/user/cart`, { data: { userId, productId } });
      dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    try {
      await axios.patch(`https://furniture-cart-5.onrender.com/api/user/cart/${cartId}`, { productId, quantity });
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { productId, quantity } });
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  if (!userId) {
    return <div>Please log in to view your cart.</div>;
  }

  return (
    <div className='container'>
      <h1 className='heading'>Shopping Cart</h1>
      {state.items && state.items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {state.items && state.items.map(item => (
            
            <li key={item.product}>
               <div className="product-image">
                        <img
                            src={`https://res.cloudinary.com/dvhply5kh/image/upload/${item.imagePublicId}`}
                            alt={item.name}
                        />
                        </div>
              <div>{item.name}</div>
              <div>Price: ${item.price}</div>
              <div>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.product, parseInt(e.target.value))
                  }
                />
              </div>
              <button onClick={() => handleRemove(item.product)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ShowCartPage = () => {
  return (
    <CartProvider>
      <CartPage />
    </CartProvider>
  );
};

export default ShowCartPage;