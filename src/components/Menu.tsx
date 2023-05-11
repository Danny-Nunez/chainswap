import React from 'react';
import './Menu.css';

function Menu() {
  return (
    <div className="menu">
      <ul>
        <li><a href="./App.tsx">arvswap</a></li>
        <li><a href="./Arvbridge.tsx">arvbridge</a></li>
        <li><a href="#">charts</a></li>
      </ul>
    </div>
  );
}

export default Menu;
