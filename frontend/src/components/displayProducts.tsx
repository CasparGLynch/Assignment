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
    
    const [disable, setDisable] = React.useState(false);
    let addToCart = (product: IProduct) =>  { 
        var productOrder: IProductOrder = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            price: product.price
        }
        
        addtoDB(productOrder)
        console.log(productOrders)
        let index = productOrders.findIndex((obj => obj.id == product.id));
        console.log(index)
        console.log("DB: " + productOrders)

        if (product.stock == 1){
            setDisable(true)
        }
        if (index != -1){ 
            if (productOrders.length > 0){
                console.log("Product stock:" + product.stock)
                console.log("Order Stock: " + productOrders[index].stock)
                if (product.stock - 1<= productOrders[index].stock) {
                    setDisable(true)
                }
            }
        }
        
        
    }

    const productOrders: IProductOrder[] = useSelector(
        (state: ProductOrderState) => state.productOrders,
        shallowEqual
      )

    

    const addtoDB = React.useCallback(
        (productOrder: IProductOrder) => dispatch(addProductOrder(productOrder)),
        [dispatch]
    )
   
    return (
        <div >
            <div className="list">
                <h1>{product.name}</h1>
                <p>Description: {product.description}</p>
                <div>${product.price} per unit</div>
                <div>Stock: {product.stock}</div>
                {/* <button onClick={() => deleteProduct(product.id)} className="danger">DELETE</button> */}
                <button disabled={disable} className="add" onClick={() => addToCart(product)}>ADD TO CART</button>
            </div>
            
        </div>
    )
}

