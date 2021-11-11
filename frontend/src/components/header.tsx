import * as React from 'react';
import './header.css';
import { BsFillBasketFill } from 'react-icons/bs'
import { useHistory } from "react-router-dom";

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
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


  return (
    
    <div className="header">
      <a className="logo" onClick={() => goHome()}>The Fruit Market</a>
      <div className="header-right">
        <a className="active" onClick={() => goCart()}>Cart: <BsFillBasketFill /></a>
        <a>Contact</a>
        <a onClick={() => goAbout()}>About</a>
      </div>
    </div>
    
  );
};

export default Header;

