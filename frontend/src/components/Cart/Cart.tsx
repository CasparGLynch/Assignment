import React from 'react';
import './Cart.css';
import Header from '../header';
import { shallowEqual, useSelector } from 'react-redux';

const Cart = () => {
  const productOrders: IProductOrder[] = useSelector(
    (state: ProductOrderState) => state.productOrders,
    shallowEqual
  )

  
  return(
  <body>
    <Header/>
      <div className="Cart">
        {productOrders.map((productOrder: IProductOrder) => (
          <h1>{productOrder.name}</h1>
        ))}
      </div>
    </body> 
  );
}

export default Cart;
