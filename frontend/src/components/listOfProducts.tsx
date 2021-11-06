import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { Dispatch } from "redux";
import { DisplayProducts } from "./displayProducts";
import { addProduct, removeProduct } from "../store/actionCreators"
import axios from "axios";



 export const ListOfProducts: React.FC = () =>{
    const dispatch: Dispatch<any> = useDispatch()

    const saveProduct = React.useCallback(
        (product: IProduct) => dispatch(addProduct(product)),
        [dispatch]
      )

    const defaultProducts:IProduct[] = [];
    const [Sproducts, setProducts]: [IProduct[], (products: IProduct[]) => void] = React.useState(defaultProducts);
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

       Sproducts.forEach(function (item:IProduct, index:any) {
         saveProduct(item)
       });




    const products: IProduct[] = useSelector(
        (state: ProductState) => state.products,
        shallowEqual
      )
    
     
    

      return (
          <div>
         {products.map((product: IProduct)=> (
            <DisplayProducts 
              key={product.id}
              product = {product}
              removeProduct = {removeProduct}
              />
          ))}
          </div>
      )
}

