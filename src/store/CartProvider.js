import { useReducer } from "react";

import CartContext from "./cart-context";

const initialState={
  items:[],
  total:0
};
const cartReducer=(state,action)=>{
  if(action.type==='ADD'){

    const existingCartIndex=state.items.findIndex(item=>item.id===action.item.id);

    const existingCart=state.items[existingCartIndex];
    
    let updatedItems;

    if(existingCart){
     const updatedItem={
        ...existingCart,amount:existingCart.amount+action.item.amount
      };
      updatedItems=[...state.items];
      updatedItems[existingCartIndex]=updatedItem;
    }
    else{
      updatedItems=state.items.concat(action.item);
    }


    const updatedTotal=state.total+action.item.price*action.item.amount;

    return {
      items:updatedItems,
      total:updatedTotal
    }
  }
  if(action.type==='REMOVE'){
    console.log(action);

    const existCartIndex=state.items.findIndex((item)=>item.id===action.id);
    console.log(existCartIndex);
    const existCart=state.items[existCartIndex]
    console.log(existCart);
    const updatedAmount=state.total-existCart.price;

    let updatedItems;
    if(existCart.amount===1){
      updatedItems=state.items.filter(item=>item.id!==action.id);
    }
    else{
      const updatedItem={...existCart,amount:existCart.amount-1};
      updatedItems=[...state.items];
      updatedItems[existCartIndex]=updatedItem;
    }
    return {
      items:updatedItems,
      total:updatedAmount
    }

  }
return initialState;
};

const CartProvider=props=>{

  const [cartState,dispatchCartAction]=useReducer(cartReducer,initialState);

  const addItemToCartHandler=item=>{
    dispatchCartAction({type:'ADD',item:item});
  };
  const removeItemFromCartHandler=id=>{
    dispatchCartAction({type:'REMOVE',id:id})
  };


  const cartContext={
    items:cartState.items,
    total:cartState.total,
    addItem:addItemToCartHandler,
    removeItem:removeItemFromCartHandler
  }


return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
};
export default CartProvider;