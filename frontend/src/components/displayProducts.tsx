import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import axios from "axios";
import '../static/displayProducts.css';
import '../static/fruit.jpg';

type Props =  {
    product: IProduct
    removeProduct: (product: IProduct) => void
}

export const DisplayProducts: React.FC<Props> = ({ product, removeProduct }) => {
    const dispatch: Dispatch<any> = useDispatch()


    //Deletes product from database. Uses a axios http DELETE request on the api endpoint of the 
    //product ID. It the calls the deleteProductRD which deletes it from redux state
    // Trailing / is very important for some reason
    const deleteProduct = (id: number) => {
        axios.delete('http://127.0.0.1:8000/api/products/' + id + "/")
            .then(res => {
                console.log(res);
                console.log(res.data)
            })
        
        window.location.reload()
        deleteProductRD(product);
    }
        
    


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
                <button onClick={() => deleteProduct(product.id)} className="danger">DELETE</button>
                <button className="add">ADD TO CART</button>
            </div>
            
        </div>
    )
}