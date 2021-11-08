import * as React from 'react';
import './header.css';
import { BsFillBasketFill } from 'react-icons/bs'
import App from '../App';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    
    <div className="header">
      <a className="logo" href="/">The Fruit Market</a>
      <div className="header-right">
        <a className="active" href="/cart">Cart: <BsFillBasketFill /></a>
        <a>Contact</a>
        <a>About</a>
      </div>
    </div>
    
  );
};

export default Header;

