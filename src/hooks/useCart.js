import { useEffect, useState, useMemo } from "react";
import { dataBase } from "../data/data";

export const useCart = () => {

      const initialCart=()=>{
        const localStorageCart = localStorage.getItem("cart");
        return localStorageCart ? JSON.parse(localStorageCart): [];
      }
    
      const [data] = useState(dataBase);
      const [cart, setCart] = useState(initialCart);
    
      useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
      }, []);
    
      const MIN_ITEMS = 1;
      const MAX_ITEMS = 5;
    
      //Agregar al carrito
      function addToCart(item) {
        const itemExists = cart.findIndex((guitar) => guitar.id === item.id);
        if(itemExists >=0){
          if(cart[itemExists].quantity >= MAX_ITEMS) return;
          const updateCart = [... cart];
          updateCart[itemExists].quantity++;
          setCart(updateCart);
          localStorage.setItem("cart", JSON.stringify(updateCart));
        }else {
          item.quantity =1;
          const newCart = [... cart, item]; 
          setCart(newCart);
          localStorage.setItem("cart", JSON.stringify(newCart));
        }
      }
    
      //Remove to cart
      function removeFromCart(id){
        setCart((prevCart) => prevCart.filter((guitar) => guitar.id !== id));
      }
    
      function decreaseQuantity(id){
        const updateCart = cart.map((item)=>{
          if(item.id === id && item.quantity > MIN_ITEMS){
            return{
              ...item,
              quantity: item.quantity-1,
            };
          }
          return item;
        });
        setCart(updateCart);
      }
    
      function increaseQuantity(id){
        const updateCart = cart.map((item)=> {
          if(item.id === id && item.quantity < MAX_ITEMS ){
            return {
              ...item,
              quantity: item.quantity +1,
            }
          }
          return item;
        });
        setCart(updateCart);
      }
    
      function clearCart(){
        setCart([]);
        localStorage.removeItem("cart")
      }

        // State Derivado
        const isEmpty = useMemo(() => cart.length === 0, [cart]);
        const cartTotal = useMemo(() => cart.reduce((total, item) => total + item.quantity * item.price, 0),[cart]);
    
      return {
        data,
        cart,
        removeFromCart,
        decreaseQuantity,
        addToCart,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal
      }
}