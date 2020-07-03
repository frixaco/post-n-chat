import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { loginUserAsync } from '../../redux/user/userActions';

function Login({ isFetching, loginUserAsync }) {
    const [form, setForm] = useState({ username: '', password: '' });

    const fillForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleLogin = () => {
        toast.info('Logging in...', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            transition: Slide
        });
        loginUserAsync(form);
    }

    return (
        <>
            <div className='form' >
                <div>
                    <h4>Sign in</h4>
                    <hr />
                </div>
                <div className="form-group">
                    <label forhtml="username">Username</label>
                    <input
                        name='username'
                        value={form.username}
                        onChange={fillForm}
                        placeholder='Username'
                        type='text'
                        className="form-control"
                        id="username" />

                    <label forhtml="password">Password</label>
                    <input
                        name='password'
                        value={form.password}
                        onChange={fillForm}
                        placeholder='Password'
                        type='password'
                        className="form-control"
                        id="password" />
                </div>

                <button
                    onClick={handleLogin}
                    disabled={isFetching}
                    type="submit"
                    className="btn btn-primary"
                >LOGIN</button>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                transport={Slide}
            />
        </>
    )
}

const mapStateToProps = ({ user: { isFetching } }) => ({
    isFetching
});

const mapDispatchToProps = dispatch => ({
    loginUserAsync: user => dispatch(loginUserAsync(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
