import React, { useEffect, Suspense } from "react";
import "./App.scss";

import { connect } from "react-redux";
import { logoutUser } from "./redux/user/userActions";
import { Switch, Route, Redirect } from "react-router-dom";

import Profile from "./pages/Profile/Profile";
import AuthPage from "./pages/AuthPage/AuthPage";
import socket from "./initSocket";
import Spinner from "./components/Spinner/Spinner";
import PostPage from "./pages/PostPage/PostPage";

const Home = React.lazy(() => import("./pages/Home/Home"));
function App({ username, isLoggedIn, validUntil, logoutUser }) {
  useEffect(() => {
    if (isLoggedIn) {
      const date = new Date();
      const currTime = date.getTime() / 1000;
      if (validUntil <= currTime) {
        logoutUser();
        socket.emit("user_disconnected", username);
      }
    } else {
      socket.emit("user_disconnected", username);
    }
  }, [isLoggedIn, logoutUser, validUntil, username]);

  return (
    <Switch>
      <Route exact path="/">
        {isLoggedIn ? (
          <Suspense fallback={<Spinner />}>
            <Home />
          </Suspense>
        ) : (
          <Redirect to="/login" />
        )}
      </Route>
      <Route path="/login">
        {isLoggedIn ? <Redirect to="/" /> : <AuthPage />}
      </Route>
      <Route path={`/profile`}>
        {isLoggedIn ? <Profile /> : <Redirect to="/login" />}
      </Route>
      <Route path="/:id">
        {isLoggedIn ? <PostPage /> : <Redirect to="/login" />}
      </Route>
      <Route path="*" component={() => <h2>404 Page Not Found</h2>} />
    </Switch>
  );
}

const mapStateToProps = ({ user: { isLoggedIn, validUntil, username } }) => ({
  isLoggedIn,
  validUntil,
  username,
});

export default connect(mapStateToProps, { logoutUser })(App);
