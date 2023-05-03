import { useRef,useState } from 'react';

import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
const MealItemForm=(props)=>{

  const [value,setValue]=useState(true);
  const amountInputRef=useRef();

  const submitHandler=event=>{
    event.preventDefault();

    const enteredAmount=amountInputRef.current.value;
    const amount=+enteredAmount;
    if(enteredAmount.trim().length===0||enteredAmount<1||enteredAmount>5){
      setValue(false);
      return ;
    }
    props.onAddToCart(amount);
  };
  return(
    <form className={classes.form} onSubmit={submitHandler}>
      <Input label='Amount' ref={amountInputRef} input={{id:'amount_'+props.id,type:'number',min:'1',max:'5',step:'1',defaultValue:'1'}}/>
      <button>ADD +</button>
      {!value&&<p>Please Enter Valid Amount</p>}
    </form>
  );
}
export default MealItemForm;