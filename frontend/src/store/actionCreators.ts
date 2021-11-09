import * as actionTypes from "./actionTypes"

export function addProduct(product: IProduct) {
    const action: ProductAction = {
        type: actionTypes.ADD_PRODUCT,
        product,
    }

    return simulateHttpRequest(action)
}

export function addProductOrder(productOrder: IProductOrder) {
  const action: ProductOrderAction ={ 
    type: actionTypes.ADD_PRODUCTORDER,
    productOrder,
  }

  return ProductOrderHTTP(action)
}

export function removeProduct(product: IProduct) { 
    const action: ProductAction = {
        type: actionTypes.REMOVE_PRODUCT,
        product,
    }

    return simulateHttpRequest(action)
}

export function removeProductOrder(productOrder: IProductOrder) { 
  const action: ProductOrderAction = {
      type: actionTypes.REMOVE_PRODUCTORDER,
      productOrder,
  }

  return ProductOrderHTTP(action)
}

export function simulateHttpRequest(action: ProductAction) {
    return (dispatch: ProductDispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 5)
    }
  }

  export function ProductOrderHTTP(action: ProductOrderAction) {
    return (dispatch: ProductOrderDispatchType) => {
      setTimeout(() => {
        dispatch(action)
      }, 5)
    }
  }

