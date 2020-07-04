import React, { useEffect } from 'react';
import './App.scss';

import { connect } from 'react-redux';
import { logoutUser } from './redux/user/userActions';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import LoginRegister from './pages/LoginRegister/LoginRegister';

function App({ username, isAuthenticated, validUntil, logoutUser }) {
  useEffect(() => {
    const date = new Date();
    const currTime = date.getTime() / 1000;
    if (validUntil <= currTime) {
      logoutUser(username);
    }
  }, [username, logoutUser, validUntil]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() =>
          isAuthenticated ?
            <Home /> : <Redirect to='/login' />
        } />
        <Route path="/login" render={() =>
          isAuthenticated ?
            <Redirect to='/' /> : <LoginRegister />
        } />
        <Route to="/profile" render={() =>
          isAuthenticated ?
            <Profile /> : <Redirect to='/login' />
        } />
        <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user: { isAuthenticated, validUntil, username } }) => {
  return {
    isAuthenticated, validUntil, username
  };
}

const mapDispatchToProps = dispatch => ({
  logoutUser: username => dispatch(logoutUser(username))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
