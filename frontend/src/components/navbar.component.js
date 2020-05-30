import React from 'react';

/**
 * @function NavBar
 * @description - nav bar component 
 */
const NavBar = () => {
  return (
    <nav className="box navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <h1 className="title">Notes Manager</h1>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
  )
}

// Export component
export default NavBar;
