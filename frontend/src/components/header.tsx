import * as React from 'react';
import './header.css';
interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return (
    <div className="header">
  <a href="#default" className="logo">The Fruit Market</a>
  <div className="header-right">
    <a className="active" href="#home">Cart</a>
    <a href="#contact">Contact</a>
    <a href="#about">About</a>
  </div>
</div>
  );
};

export default Header;

