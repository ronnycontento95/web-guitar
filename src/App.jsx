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
    return localStorageCart? JSON.parse(localStorageCart): [];
  }

  const [data] = useState(dataBase);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, []);

  const MIN_ITEMS = 1;
  const MAX_ITEMS = 5;

  //Agregar al carrito
  function addToCart(){
    const itemExists = cart.finIndex((quitar) => quitar.id === item.id);
    if(itemExists >=0){
      if(cart[itemExists].quantity >= MAX_ITEMS) return;
      const updateCart = [... cart];
      updateCart[itemExists].quantity++;
      setCart(updateCart);
    }else {
      item.quantity =1;
      setCart([... cart, item]);

    }

  }

  return (
    <>
    <Header/>
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
