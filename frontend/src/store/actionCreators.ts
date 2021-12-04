import * as actionTypes from "./actionTypes"

export function addProductOrder(productOrder: IProductOrder) {
  const action: ProductOrderAction ={ 
    type: actionTypes.ADD_PRODUCTORDER,
    productOrder,
  }

  return ProductOrderHTTP(action)
}

export function removeProductOrder(productOrder: IProductOrder) { 
  const action: ProductOrderAction = {
      type: actionTypes.REMOVE_PRODUCTORDER,
      productOrder,
  }

  return ProductOrderHTTP(action)
}

  export function ProductOrderHTTP(action: ProductOrderAction) {
    return (dispatch: ProductOrderDispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 5)
    }
  }

