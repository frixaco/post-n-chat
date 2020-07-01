import React from 'react'

import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from './Home/Home';
import Profile from '../components/Profile/Profile';
import LoginRegister from './LoginRegister/LoginRegister';

function Routes({ isAuthenticated }) {
    return (
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
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Routes);
