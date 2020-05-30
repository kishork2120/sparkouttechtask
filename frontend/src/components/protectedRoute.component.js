import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/**
 * @function ProtectedRoute
 * @param {JSX} children - childern components
 * @param {Object} rest - Route attributes
 * @return {JSX} - return jsx component
 */
const ProtectedRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        JSON.parse(sessionStorage.getItem('user'))?.id ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

// Export component
export default ProtectedRoute;
