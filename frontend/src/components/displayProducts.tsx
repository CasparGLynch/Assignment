import * as React from "react"
import { Dispatch } from "redux"
import '../static/displayProducts.css';
import { addProductOrder } from "../store/actionCreators"
import { useSelector, shallowEqual, useDispatch } from "react-redux"

type Props = {
    product: IProduct
}

//This function component is used to display a signle Product from the API
//It therefore takes the product as a Parameter
export const DisplayProducts: React.FC<Props> = ({ product }) => {

    //creating a dispatch to access the Redux state
    const dispatch: Dispatch<any> = useDispatch()


    //creating two variables:
    //disable: boolean to determine whether the 'add to Cart' button should be disabled
    //stocktemp: used as the counter for how many products were selected
    const [disable, setDisable] = React.useState(false);
    const [stocktemp, setStocktemp]: [number, (stock: number) => void] = React.useState(0)

    // .useEffect and the initialisaing of the component to keep the stocktemp the same as the number of the product selected
    React.useEffect(() => {
        try {
            let index = productOrders.findIndex((obj => obj.id == product.id))
            setStocktemp(productOrders[index].stock)
            setStock(productOrders[index].stock)
        } catch (err) {

        }
    }, [])


    //Checks if the product.stock and stocktemp (the amount of stock selected) are both = 1
    //if true Disable the button as no more should be selected
    //Also checks if the product.stock is in general <= to the stocktemp and disabling the button if true
    React.useEffect(() => {

        if (product.stock, stocktemp == 1) {
            setDisable(true)
        } else if (product.stock <= stocktemp) {
            setDisable(true)
        }
    })


    //addtoCart function which accepts a product as the parameter, this is used to add the Product to the redux state
    //the checks on the stock are also done on the backend (views.py), these are just to prevent a HTTP 400 response
    let addToCart = (product: IProduct) => {
        //initialising ProductOrder variable to save it to state later
        var productOrder: IProductOrder = {
            id: product.id,
            name: product.name,
            stock: product.stock,
            price: product.price
        }
        let index = productOrders.findIndex((obj => obj.id == product.id)); // checking wether the productOrder is already registered in the state index = -1 is true

        //checking is the product stock is less than 1, disabling button if true
        if (product.stock < 1) {
            setDisable(true)
        }
        //if product stock == 1 then saving it one more time then disabling button
        else if (product.stock == 1) {
            addtoDB(productOrder)
            stockfind(product)
            setDisable(true)
        }
        // if greater than 1 saving to state and calling stockfind()
        else if (product.stock > 1) {
            addtoDB(productOrder)
            stockfind(product)
        }
        // This is just for the selected counter which is displayed to the user
        // if product already exists i.e index is not -1 and calling stockfind() if the state is populated
        if (index != -1) {
            if (productOrders.length > 0) {
                stockfind(product)
                // checking if the product stock is less or equal than  the productOrder State stock, if true then disable button
                if (product.stock - 1 <= productOrders[index].stock) {
                    setDisable(true)
                }
            }
        }


    }

    // productOrders from the Redux state using useSelector
    const productOrders: IProductOrder[] = useSelector(
        (state: ProductOrderState) => state.productOrders,
        shallowEqual
    )


    // variable used to display the number of stock selected to the user
    const stockfind = (product: IProduct) => {
        try {
            let index = productOrders.findIndex((obj => obj.id == product.id))

            setStock(productOrders[index].stock + 1)
        } catch (err) {
            setStock(stock + 1)
        }
    }
    // stock variable stored using .useState
    const [stock, setStock]: [number, (stock: number) => void] = React.useState(0)


    // function used to save Product Order to Redux state 
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

