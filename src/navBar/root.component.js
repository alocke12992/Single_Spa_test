import React from 'react'
import {navigateToUrl} from 'single-spa'


const NavBar = () => (
  <nav>
    <div className="nav-wrapper">
      <a onClick={() => navigateToUrl('/')} className="brand-logo">single-spa</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        {menuItems()}
      </ul>
    </div>
  </nav>
)

function menuItems(){
    return (
      <div>
        <li><a onClick={() => navigateToUrl('/')}>Home</a></li>
        <li><a onClick={() => navigateToUrl('/reactApp')}>React</a></li>
        <li><a onClick={() => navigateToUrl('/angular1')}>Angular 1</a></li>
      </div>
    )
  }
  


export default NavBar