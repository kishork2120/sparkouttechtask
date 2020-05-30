import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
// Import css
import '../node_modules/bulma/css/bulma.css';

// Pages
import LoginPage from './pages/login.page';
import RegisterPage from './pages/register.page';
import NotesPage from './pages/notes.page';
import ProtectedRoute from './components/protectedRoute.component';

/**
 * @function App
 * @description - parent function with router config
 * @return {JSX} - returns a jsx component
 */
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact><LoginPage /></Route>
        <Route path="/register"><RegisterPage /></Route>
        <ProtectedRoute path="/notes"><NotesPage /></ProtectedRoute>
      </Switch>
    </Router>
  );
}

// Export component to index
export default App;
