import React from 'react';
import { logoutUserService } from '../services/user.service';
import { responseHandler, getEmailFromSession } from '../common/helper';
import { useHistory } from 'react-router-dom';

/**
 * @function NavBar
 * @description - nav bar component 
 */
const NavBar = () => {
  const history = useHistory();
  const userEmail = getEmailFromSession();

  // Log out user
  const logoutUser = async () => {
    try {
      if (!window.confirm('Are you sure you want to logout')) return
      let response = await logoutUserService();
      if (response.status === 200) {
        sessionStorage.setItem('user', null);
        history.push('/');
      } else {
        responseHandler(response, history);
      }
    } catch (e) {
      responseHandler({ message: JSON.stringify(e) }, history);
    }
  }


  return (
    <nav className="box navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <h1 className="title">Notes Manager</h1>
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <span class="tag is-info">{userEmail}</span>
        </div>
        <div className="navbar-item">
          <div className="buttons">
            <a className="button is-danger" onClick={() => logoutUser()}>
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Export component
export default NavBar;
