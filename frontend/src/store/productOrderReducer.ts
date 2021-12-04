import * as actionTypes from "./actionTypes"

// empty Redux initial state
const InitialState: ProductOrderState = {
    productOrders: [

    ]
}



const ProductOrderReducer = (
    state: ProductOrderState = InitialState,
    action: ProductOrderAction
): ProductOrderState => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCTORDER:
            const OldProductOrders: IProductOrder[] = state.productOrders;
            const newProductOrder: IProductOrder = {
                id: action.productOrder.id,
                name: action.productOrder.name,
                price: action.productOrder.price,
                stock: 1
            }
            //if product already exists I just increase the stock of the existing else create new one with stock=1
            let AlreadyExists = OldProductOrders.filter(productOrder => productOrder.id === newProductOrder.id).length
            let AlreadyExistsID = OldProductOrders.filter(productOrder => productOrder.id === newProductOrder.id)
            if (AlreadyExists > 0) {
                let objeIndex = state.productOrders.findIndex((obj => obj.id == AlreadyExistsID[0].id));
                state.productOrders[objeIndex].stock++

                return {
                    ...state,
                    productOrders: state.productOrders
                }
            } else {
                return {
                    ...state,
                    productOrders: state.productOrders.concat(newProductOrder)
                }
            }

        case actionTypes.REMOVE_PRODUCTORDER:
            const updatedProductOrders: IProductOrder[] = state.productOrders.filter(
                productOrder => productOrder.id !== action.productOrder.id
            )
            return {
                ...state,
                productOrders: updatedProductOrders,
            }
    }
    return state
}

export default ProductOrderReducer