import * as React from 'react';
import './header.css';
import { BsFillBasketFill } from 'react-icons/bs'
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="header">
  <a className="logo">The Fruit Market</a>
  <div className="header-right">
    <a className="active">Cart: <BsFillBasketFill/></a>
    <a>Contact</a>
    <a>About</a>
  </div>
</div>
  );
};

export default Header;

