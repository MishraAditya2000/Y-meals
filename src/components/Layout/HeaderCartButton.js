import CartButton from "../Cart/CartButton"

import CartContext from "../../store/cart-context"
import classes from './HeaderCartButton.module.css'
import { useContext, useEffect,useState } from "react"

const HeaderCartButton=props=>{
  const cartCtx=useContext(CartContext);

  const {items}=cartCtx;
  const numberOfCartItem=items.reduce((currentNum,item)=>{return currentNum+item.amount},0);


  const [eff,setEffect]=useState(false);

  const btnClasses=`${classes.button} ${eff ? classes.bump:''}`;
  useEffect(()=>{
    if(items.length===0){ 
      return;
    }
    setEffect(true);
    const timer=setTimeout(()=>{
      setEffect(false);
    },250);

    return()=>{
      clearTimeout(timer);
    }
  },[items])
  
  return   <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
      <CartButton/>
    </span>
    <span>Cart</span>
    <span className={classes.badge}>{numberOfCartItem}</span>
  </button>

}
export default HeaderCartButton;