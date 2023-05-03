import { Header } from "./components/Layout/Header";
import Meals from './components/Meals/Meals'
import Cart from "./components/Cart/Cart";
import { useState,useContext } from "react";
import CartProvider from "./store/CartProvider";
function App() {
  const [cartVisibility,setCartVisibility]=useState(false);

  const showCartHandler=()=>{
    setCartVisibility(true);
  }
  const hideCartHandler=()=>{
    setCartVisibility(false);
  }
  return (
    <CartProvider>
    {cartVisibility && <Cart onClose={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
    
  );
}

export default App;
