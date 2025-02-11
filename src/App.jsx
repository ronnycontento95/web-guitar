import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Header from "./components/Header/Header";
import { dataBase } from "./data/data";
import CardGuitar from "./components/Card/CardGuitar";

function App() {

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

  return (
    <>
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {
            data.map((guitar) => (
              <CardGuitar
                key={guitar.id}
                guitar={guitar}
                addToCart={addToCart}
              />
            ))
          }

        </div>
      </main>
      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
