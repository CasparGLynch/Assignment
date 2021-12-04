import * as React from "react"
import { DisplayProducts } from "./displayProducts";
import axios from "axios";



export const ListOfProducts: React.FC = () => {

  //using .useState to store the products from the API
  const defaultProducts: IProduct[] = [];
  const [Sproducts, setProducts]: [IProduct[], (products: IProduct[]) => void] = React.useState(defaultProducts);

  //getting the API Products on component initalisation
  React.useEffect(() => {
    axios
      .get<IProduct[]>("http://127.0.0.1:8000/api/products/", {
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {

        setProducts(response.data)
      })

  }, []);


  //calling the 'DisplayProducts' component which each product as a parameter
  return (
    <div>
      {Sproducts.map((product: IProduct) => (
        <DisplayProducts
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
}

