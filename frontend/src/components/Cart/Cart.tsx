import React, { useEffect } from 'react';
import './Cart.css';
import Header from '../header';
import { shallowEqual, useSelector } from 'react-redux';
import axios from 'axios';
import { Dictionary } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';


interface IOrder {
  email: string,
  address: string,
  date: Date
}

interface IProductIden {
  order: number,
  name: string,
  stock: number,
  product: number
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
           product: item.id,
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
  const [totalPrice, setTotalPrice]: [number, (porder: number) => void] = React.useState(0)
  const addOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    
    //order.products = i
    order.date = new Date() 
    console.log(order)
    axios.post('http://127.0.0.1:8000/api/orders/', order)
         .then(res =>{
          i.forEach(function (item: IProductIden, index: number){
            item.order = res.data.id;
            console.log(item)
            axios.post('http://127.0.0.1:8000/api/productorders/', item)
            
             .then(res =>{ 
                window.location.reload()
             })
          })
         })
     .catch()
     
    
    
     
     
     
}
React.useEffect(() =>{
  var totalPrice: number = 0;
  productOrders.forEach(function( value: IProductOrder, index: number){
    totalPrice += value.price * value.stock;
  })
  setTotalPrice(totalPrice)
}) 
  return(
  <div className="CartContainer">
    <Header/>
    <h3 className="Title">My Cart:</h3>
      <div className="Cart">
        {productOrders.map((productOrder: IProductOrder) => (
          <div className="Container">
            <h1>-Product: {productOrder.name}, {productOrder.stock} ordered.</h1>
          </div>
        ))}

      <p className="Price">Total Price: ${Math.round(totalPrice * 100) / 100}</p>  
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
