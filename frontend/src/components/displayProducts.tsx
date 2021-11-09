import * as React from "react"
import { Dispatch } from "redux"
import axios from "axios";
import '../static/displayProducts.css';
import '../static/fruit.jpg';
import { addProduct, addProductOrder, removeProduct } from "../store/actionCreators"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

type Props =  {
    product: IProduct
    //removeProduct: (product: IProduct) => void
}

export const DisplayProducts: React.FC<Props> = ({ product }) => {
    const dispatch: Dispatch<any> = useDispatch()

    const saveProduct = React.useCallback(
        (product: IProduct) => dispatch(addProduct(product)),
        [dispatch]
      )

    
      

    //Deletes product from database. Uses a axios http DELETE request on the api endpoint of the 
    //product ID. It the calls the deleteProductRD which deletes it from redux state
    // Trailing / is very important for some reason
    const deleteProduct = (id: number) => {
        deleteProductRD(product)
        axios.delete('http://127.0.0.1:8000/api/products/' + id + "/")
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
        
        
        
    }
    const productOrders: IProductOrder[] = useSelector(
        (state: ProductOrderState) => state.productOrders,
        shallowEqual
      )
    
    const productOrder: IProductOrder = {
        id: 2,
        name: "apple",
        stock: 3,
        price: 3.99
    }
    const addToCart = () =>  { 
        

        addtoDB(productOrder)
        console.log(productOrder)
        console.log(productOrders)
    }

    const addtoDB = React.useCallback(
        (productOrder: IProductOrder) => dispatch(addProductOrder(productOrder)),
        [dispatch]
    )

    const deleteProductRD = React.useCallback(
        (product: IProduct) => dispatch(removeProduct(product)),
        [dispatch, removeProduct]
    )
        
    return (
        <div >
            <div className="list">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <div>{product.price}</div>
                <div>{product.stock}</div>
                {/* <button onClick={() => deleteProduct(product.id)} className="danger">DELETE</button> */}
                <button className="add" onClick={() => addToCart()}>ADD TO CART</button>
            </div>
            
        </div>
    )
}

