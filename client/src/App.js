import React, { useEffect, Suspense } from 'react';
import './App.scss';

import { connect } from 'react-redux';
import { logoutUser } from './redux/user/userActions';
import { Switch, Route, Redirect } from 'react-router-dom';

// import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import LoginRegister from './pages/LoginRegister/LoginRegister';
import socket from './initSocket';
import Spinner from './components/Spinner/Spinner';

const Home = React.lazy(() => import('./pages/Home/Home'))
function App({ username, isLoggedIn, validUntil, logoutUser }) {
  useEffect(() => {
    if (isLoggedIn) {
      const date = new Date();
      const currTime = date.getTime() / 1000;
      if (validUntil <= currTime) {
        logoutUser();
        socket.emit('user_disconnected', username)
      }
    } else {
      socket.emit('user_disconnected', username)
    }
  }, [isLoggedIn, logoutUser, validUntil, username]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? (
            <Suspense fallback={<Spinner />}>
              <Home />
            </Suspense>
          ) : <Redirect to='/login' />}
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
