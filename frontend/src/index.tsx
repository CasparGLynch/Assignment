import { render } from "react-dom"
import { createStore, applyMiddleware, Store } from "redux"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import Routes from './Routes'
import ProductOrderReducer from "./store/productOrderReducer"

//Creation of Redux store which is used for cart management
//Uses Redux thunk as middleware and loads the reducer
const store: Store<ProductOrderState, ProductOrderAction> & {
  dispatch: ProductOrderDispatchType
} = createStore(ProductOrderReducer, applyMiddleware(thunk))


//the rootelement loads the router component 'Routes' which is used to navigate throughout the site
const rootElement = document.getElementById("root")
render(

  <Provider store={store}>
    <Routes />
  </Provider>,

  rootElement
)
