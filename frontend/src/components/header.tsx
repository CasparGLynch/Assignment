import * as React from 'react';
import './header.css';
import { BsFillBasketFill } from 'react-icons/bs'
import { useHistory } from "react-router-dom";



const Header: React.FC = () => {
  //using the useHistory to navigate around the site
  const history = useHistory()

  function goHome() {
    history.push("/")
  }

  function goCart() {
    history.push("/cart")
  }

  function goAbout() {
    history.push("/about")
  }

  // Using a cart Icon from react-icons
  return (
    
    <div className="header">
      <a className="logo" onClick={() => goHome()}>The Fruit Market</a>
      <div className="header-right">
        <a className="active" onClick={() => goCart()}>Cart: <BsFillBasketFill /></a>
        <a onClick={() => goAbout()}>About</a>
      </div>
    </div>
    
  );
};

export default Header;

