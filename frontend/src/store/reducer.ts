import * as actionTypes from "./actionTypes"
import * as React from 'react';
import axios from 'axios';
 


const InitialState: ProductState = {
  products: [
    
  ]
}
    


const Preducer = (
    state: ProductState = InitialState,
    action: ProductAction
): ProductState => {
    switch (action.type) {
        case actionTypes.ADD_PRODUCT:
            const OldProducts: IProduct[] = state.products;
            const newProduct: IProduct = {
                id: action.product.id,
                name: action.product.name,
                description: action.product.description,
                price: action.product.price,
                stock: action.product.stock
            }

            let AlreadyExists = OldProducts.filter(product => product.id === newProduct.id).length
            if (AlreadyExists > 0) {
                return {
                    ...state,
                    products: state.products,
                }
            } else { 
                return {
                    ...state,
                    products: state.products.concat(newProduct),
                }
            }
            
            
            
        case actionTypes.REMOVE_PRODUCT:
            const updatedProducts: IProduct[] = state.products.filter(
                product => product.id !== action.product.id
            ) 
            return { 
                ...state,
                products: updatedProducts,
            }
    }
    return state
}

export default Preducer