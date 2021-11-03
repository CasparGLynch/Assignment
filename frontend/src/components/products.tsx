import * as React from 'react';
import axios from 'axios';
import './products.css';
import { ChangeEvent } from "react";
interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  }  


const Products = () => {



  //Axios stuff
  const defaultProducts:IProduct[] = [];
  
  const [products, setProducts]: [IProduct[], (posts: IProduct[]) => void] = React.useState(defaultProducts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] = React.useState("");

  React.useEffect(() => {
    axios
      .get<IProduct[]>("http://127.0.0.1:8000/api/products/", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(ex => {
        const error =
        ex.response.status === 404
          ? "Resource Not found"
          : "An unexpected error has occurred";
        setError(error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
    <ul className="products">
     <div className="grid">
       {products.map((product) => (
         
        <li key={product.id}>
         <div className="FruitBox"> 
          <h3>{product.name} stock = {product.stock}</h3>
          <p>{product.description}</p>
          <p>Price = ${product.price}</p>
          <button className="Addtocart">Add to Cart</button>
         </div> 
        </li>
        
      ))}
      </div>
     </ul>
      {error && <p className="error">{error}</p>}
      </div>
  )
};

export default Products;


