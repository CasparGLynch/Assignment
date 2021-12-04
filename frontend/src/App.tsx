import * as React from "react"
import "./App.css"
import { ListOfProducts } from "./components/listOfProducts";
import { Helmet } from "react-helmet";
import Header from "./components/header";

const App: React.FC = () => {
  const TITLE = 'The Fruit Market'
  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Header />
      <ListOfProducts />
    </div>

  )
}
export default App
  
      
     



