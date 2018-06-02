import React from 'react'

class NavBar extends React.Component{

  
  
  render(){
    return(
      <nav>
        <div className="nav-wrapper">
          <a onClick={() => this.navigateTo('/')} className="brand-logo">single-spa</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {menuItems.call(this)}
          </ul>
        </div>
      </nav>
    )
  }
  
  navigateTo(url){
    window.history.pushState(null, null, url)
  }  
}
function menuItems(){
  return (
    <div>
      <li><a onClick={() => this.navigateTo('/')}>Home</a></li>
      <li><a onClick={() => this.navigateTo('/reactApp')}>React</a></li>
    </div>
  )
}

export default NavBar