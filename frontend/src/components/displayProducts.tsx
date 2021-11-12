import * as React from "react"
import { Dispatch } from "redux"
import '../static/displayProducts.css';
import '../static/fruit.jpg';
import {addProductOrder} from "../store/actionCreators"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

type Props =  {
    product: IProduct
}

export const DisplayProducts: React.FC<Props> = ({ product }) => {
    const dispatch: Dispatch<any> = useDispatch()
    
    const [disable, setDisable] = React.useState(false);
    const [stocktemp, setStocktemp]: [number, (stock: number) => void] = React.useState(0)
    React.useEffect(()=>{
        try{
            let index = productOrders.findIndex((obj => obj.id == product.id))
            setStocktemp(productOrders[index].stock)
            setStock(productOrders[index].stock)
        } catch(err) {

        }
        if(product.stock == stocktemp){
            setDisable(true)
        } 
    }, [])

    let addToCart = (product: IProduct) =>  { 
        var productOrder: IProductOrder = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            price: product.price
        }
        
        
        
        let index = productOrders.findIndex((obj => obj.id == product.id));
    

        if (product.stock <= 1){
            setDisable(true)
        }
        if (product.stock > 1){
            addtoDB(productOrder)
            stockfind(product)
        }
        if (index != -1){ 
            if (productOrders.length > 0){
                stockfind(product)
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


    const stockfind = (product: IProduct) => {
        try{
            let index = productOrders.findIndex((obj => obj.id == product.id))
            
            setStock(productOrders[index].stock + 1)
        } catch(err) {
            setStock(stock + 1)
        }
    } 
    const [stock, setStock]: [number, (stock: number) => void] = React.useState(0)
           

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
                <div>Added {stock}</div> 
            </div>
            
        </div>
    )
}

