import * as React from "react"
import { render } from "react-dom"
import { createStore, applyMiddleware, Store} from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"


import Routes from './Routes'


import App from "./App"
import Preducer from "./store/reducer"

const store: Store<ProductState, ProductAction> & {
  dispatch: DispatchType 
} = createStore(Preducer, applyMiddleware(thunk))



const rootElement = document.getElementById("root")
render(
  <Provider store = { store }>
    <Routes />
  </Provider>,
  rootElement
)
