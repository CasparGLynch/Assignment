import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store} from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"


import Routes from './Routes'


import App from "./App"
import Preducer from "./store/reducer"

import ProductOrderReducer from "./store/productOrderReducer"

const store: Store<ProductState, ProductAction> & {
  dispatch: ProductDispatchType 
} = createStore(Preducer, applyMiddleware(thunk))

const store2: Store<ProductOrderState, ProductOrderAction> & {
  dispatch: ProductOrderDispatchType
} = createStore(ProductOrderReducer, applyMiddleware(thunk))



const rootElement = document.getElementById("root")
render(

  <Provider store = { store2 }>
    <Routes />
  </Provider>,
  
  rootElement
)
