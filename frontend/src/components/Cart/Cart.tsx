import React from 'react';
import './Cart.css';
import Header from '../header';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import { Dictionary } from '@reduxjs/toolkit';


interface IOrder {
  email: string,
  address: string,
  date: Date
}

interface IProductIden {
  order: number,
  name: string,
  stock: number
}


const Cart = () => {
  const productOrders: IProductOrder[] = useSelector(
    (state: ProductOrderState) => state.productOrders,
    shallowEqual
  )
  
  const i: IProductIden[] =[];
  productOrders.forEach(function (item:IProductOrder, index:any) {
         var temp: IProductIden = { 
           order: 0,
           name: item.name,
           stock: item.stock
         }
         i.push(temp)
         
  });
  

  

  const handleOrderData = (e: React.FormEvent<HTMLInputElement>) => {
    setOrder({
        
        ...order,
        
        [e.currentTarget.id]: e.currentTarget.value,
    })
  } 
  var defaultOrder:IOrder = {} as IOrder;

  const [order, setOrder]: [IOrder, (order: IOrder) => void] = React.useState(defaultOrder);
  const addOrder = (e: React.FormEvent) => {
    
    
    
    //order.products = i
    order.date = new Date() 
    console.log(order)
    axios.post('http://127.0.0.1:8000/api/orders/', order)
         .then(res =>{
          i.forEach(function (item: IProductIden, index: number){
            item.order = res.data.id;
            axios.post('http://127.0.0.1:8000/api/productorders/', item)
             .then(res =>{ 
               
             })
          })
         })
     .catch()
     
     
     
     
}
  return(
  <div className="CartContainer">
    <Header/>
      <div className="Cart">
        {productOrders.map((productOrder: IProductOrder) => (
          <h1>{productOrder.name}</h1>
        ))}
      </div>
      <form onSubmit={addOrder} className="Add-Product">

            <input
                type="text"
                id="email"
                placeholder="Your email address"
                onChange={handleOrderData}
            />
            <input
                type="text"
                id="address"
                placeholder="Your Full Address"
                onChange={handleOrderData}
            />
            <button disabled={order === undefined ? true : false} className="submit">
                Add Product
            </button>
          </form>
    </div> 
  );
}

export default Cart;
