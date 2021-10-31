import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import internal from 'stream';
import Header from './components/header';


  interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
  }  
  
// COMMENT
  
const App = () => {
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
    
    <div className="App">
      <title>Fruits</title>
      <Header/>
     <ul className="products">
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
     </ul>
     {error && <p className="error">{error}</p>}
   </div>
   );
}
export default App;



// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
