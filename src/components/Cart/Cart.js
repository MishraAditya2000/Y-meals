import { useContext } from 'react';

import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
const Cart=(props)=>{
  const cartCtx=useContext(CartContext);

  const hasItem=cartCtx.items.length>0;
  const cartItemRemoved=(id)=>{
    console.log(id);
    cartCtx.removeItem(id);
  };
  const cartItemAdd=(item)=>{
    console.log(item);
    cartCtx.addItem(item);
  };
  const cartItem=<ul className={classes['cart-items']}>{cartCtx.items.map((item)=>
  <CartItem key={item.id} 
    name={item.name}
    amount={item.amount}
    price={item.price} 
    onAdd={cartItemAdd.bind(null,item)} 
    onRemove={cartItemRemoved.bind(null,item.id)}/>
  )}</ul>;
return <Modal onClose={props.onClose}>
  {cartItem}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>${cartCtx.total.toFixed(2)}</span>
    
  </div>
  <div className={classes.actions}>
    <button className={['button--alt']} onClick={props.onClose}>Close</button>
    {hasItem && <button className={classes.button}>Order</button>}
  </div>
</Modal>
}
export default Cart;