import * as React from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import "./App.css"
import { ListOfProducts } from "./components/listOfProducts";
import { AddProduct } from "./components/addProduct";
import { addProduct, removeProduct } from "./store/actionCreators";
import { Dispatch } from "redux";
import { Helmet } from "react-helmet";
import Header from "./components/header";




const App: React.FC = () => {
  const TITLE = 'The Fruit Market'
  const products: readonly IProduct[] = useSelector(
    (state: ProductState) => state.products,
    shallowEqual
  )

  const dispatch: Dispatch<any> = useDispatch()

  const saveProduct = React.useCallback(
    (product: IProduct) => dispatch(addProduct(product)),
    [dispatch]
  )

  
  return (
   
    <div>
     <Helmet> 
      <title>{ TITLE }</title>
     </Helmet> 
      <Header/>
      {/* <AddProduct saveProduct={saveProduct}/> */}
      <ListOfProducts/>
      
    </div>
     
      )
  }
export default App
  
      
     



