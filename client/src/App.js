import React, { useEffect } from 'react';
import './App.scss';

import { connect } from 'react-redux';
import { logoutUser } from './redux/user/userActions';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import LoginRegister from './pages/LoginRegister/LoginRegister';

function App({ username, isLoggedIn, validUntil, logoutUser }) {
  useEffect(() => {
    if (isLoggedIn) {
      const date = new Date();
      const currTime = date.getTime() / 1000;
      if (validUntil <= currTime) {
        logoutUser();
      }
    }
  }, [isLoggedIn, logoutUser, validUntil]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Home /> : <Redirect to='/login' />}
        </Route>
        <Route path="/login">
          {isLoggedIn ? <Redirect to='/' /> : <LoginRegister />}
        </Route>
        <Route to={`/${username}`}>
          {isLoggedIn ? <Profile /> : <Redirect to='/login' />}
        </Route>
        {/* <Route to={`/${username}`} component={Profile} /> */}
        <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user: { isLoggedIn, validUntil, username } }) => {
  return {
    isLoggedIn, validUntil, username
  };
}

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(logoutUser())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
