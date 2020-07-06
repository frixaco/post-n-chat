import React from 'react'

import { connect } from 'react-redux';
import { loginUserAsync } from '../../redux/user/userActions';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

function LoginRegister({ loginUserAsync }) {
    return (
        <div className='form-container'>
            <div className='login_register'>
                <Login />
                <Register />
            </div>
            <div>
                <button
                    onClick={() => loginUserAsync({
                        username: 'GuestUser',
                        password: 'qwerty'
                    })}
                    type="submit"
                    className='btn btn-secondary'
                    style={{ margin: '0 0 30px' }}
                >Sign in as Guest</button>
            </div>
        </div>
    )
}


const mapStateToProps = ({ user: { isFetching } }) => ({
    isFetching
});

const mapDispatchToProps = dispatch => ({
    loginUserAsync: user => dispatch(loginUserAsync(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegister);