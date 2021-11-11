import * as React from "react"
import { useDispatch } from "react-redux"
import { Dispatch } from "redux";
import { DisplayProducts } from "./displayProducts";

import axios from "axios";



 export const ListOfProducts: React.FC = () =>{
    const defaultProducts:IProduct[] = [];
    const [Sproducts, setProducts]: [IProduct[], (products: IProduct[]) => void] = React.useState(defaultProducts);

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

        

      return (
          <div>
         {Sproducts.map((product: IProduct)=> (
            <DisplayProducts 
              key={product.id}
              product = {product}
              />
          ))}
          </div>
      )
}

