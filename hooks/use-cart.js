import { useState , createContext, useContext, useEffect} from 'react';

import { initiateCheckout } from '../lib/payments.js';

import products from '../products.json';

const defaultCart = {
  products: {}
}

export const CartContext = createContext();

export function useCartState() {

  const [cart, updateCart] = useState(defaultCart);

  useEffect(() => {
    const stateFromStorage = window.localStorage.getItem('makids_cart');
    const data = stateFromStorage && JSON.parse(stateFromStorage);
    if ( data ) {
      updateCart(data);
    }
  }, []);

  useEffect(() => {
    const data = JSON.stringify(cart);
    window.localStorage.setItem('makids_cart', data)
      }, [cart])

  const cartItems = Object.keys(cart.products).map(key => {
    const product = products.find(({ id}) => `${id}` === `${key}`);
    return {
      ...cart.products[key],
      pricePerItem: product.price
    }
  });

  const subtotal = cartItems.reduce ((accumulator, { pricePerItem, quantity}) => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    });

    return accumulator + ( pricePerItem * quantity)
  }, 0);
  
  const totalItems = cartItems.reduce ((accumulator, { pricePerItem, quantity}) => {
    return accumulator + quantity
  }, 0);

  // console.log('subtotal', subtotal);

  // console.log('cartItems', cartItems);

  // console.log('cart', cart);

  function addToCart({ id } = {}) {
    updateCart(prev => {
      let cartState = {...prev};

      if ( cartState.products[id]) {
        cartState.products[id].quantity = cartState.products[id].quantity + 1;

      } else {
        cartState.products[id] = {
          id,
          quantity: 1
        }
      }
      
      return cartState;
    })
  }

  function updateItem({ id, quantity}) {

    updateCart((prev) => {
      let cart = {...prev};
  
      if ( cart.products[id]) {
        cart.products[id].quantity = quantity;
      }
      
      return cart;
    })
  }

  function checkout() {
    initiateCheckout({
      lineItems: cartItems.map(item => {
        return {
          price: item.id,
          quantity: item.quantity
        }
      })
    });
  }

  return {
    cart,
    cartItems,
    updateCart,
    subtotal,
    totalItems,
    addToCart,
    updateItem,
    checkout
  }
}

export function useCart() {
  const cart = useContext(CartContext);
  return cart;
}

