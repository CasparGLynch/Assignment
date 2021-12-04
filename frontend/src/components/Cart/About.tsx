import axios from 'axios'
import * as React from 'react'
import '../Cart/About.css'
import Header from '../header'

//Order interface which is used to store orders from the API
interface IOrder {
    id: number
    email: string,
    address: string,
    date: Date
  }
  
  //ProductOrder Interface which is used to store Product Orders from the API
  interface IProductIden {
    order: number,
    name: string,
    stock: number,
    product: number
  }

//The about page displays all the past orders. It is a functional component
const About: React.FC = () => {

  //Using the .useState hook to create two variables which  will later be populated by the API
  var defaultOrder: IOrder[] = [];
  var defaultProducts: IProductIden[] = [];
  const [order, setOrder]: [IOrder[], (order: IOrder[]) => void] = React.useState(defaultOrder);
  const [products, setProducts]: [IProductIden[], (order: IProductIden[]) => void] = React.useState(defaultProducts);

  //Using the .useEffect hook and Axios, The orders and ProductOrders are loaded into their respective lists
  //The useffect is only called once, at the initialisation of the component (similar to ComponentDiDMount() for class based components)
  React.useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/orders/')
      .then(res => {
        setOrder(res.data)
      })

    axios.get('http://127.0.0.1:8000/api/productorders/')
      .then(res => {
        setProducts(res.data)
      })
  }, [])

//The orders are displayed based on their id. For each order, I filter the productOrder List for all the products associated to the order 
//and display them. I display the order date, email and address and the products associated with that order
  return (
    <div className="base">
      <Header />
      <h2>List of Orders:</h2>
      {order.map((Order: IOrder) => (
        <li key={Order.id}>
          <div className="Container">
            <h1>-Date Ordered: {Order.date}, Ordered by: {Order.email}</h1>
            <h4>Deliver to: {Order.address}</h4>
            {products.filter(i => i.order == Order.id).map((product: IProductIden) => (
              <div>
                <p>-{product.stock} {product.name}(s) ordered.</p>
              </div>
            ))}
          </div>
        </li>
      ))}
    </div>
  );
}
export default About