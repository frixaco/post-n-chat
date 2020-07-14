import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { loginUserAsync } from '../../redux/user/userActions';
import { validateForm } from '../validators-utils';

function Login({ loading, loginUserAsync }) {
    const [form, setForm] = useState({
        username: '',
        password: '',
        errors: {
            username: '',
            password: ''
        }
    });

    const fillForm = e => {
        const { name, value } = e.target
        let errors = form.errors
        switch (name) {
            case 'username':
                errors.username =
                    value.length < 5
                        ? 'Full Name must be at least 5 characters long!'
                        : '';
                break;
            case 'password':
                errors.password =
                    value.length < 6
                        ? 'Password must be at least 6 characters long!'
                        : '';
                break;
            default:
                break;
        }
        setForm({ ...form, errors, [name]: value });
    }

    const handleLogin = e => {
        if (validateForm(form.errors) && (e.key === 'Enter' || e.key === undefined)) {
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
            setForm({ username: '', password: '', errors: { username: '', password: '' } })
        }
    }

    return (
        <>
            <div className='form' >
                <div>
                    <h4>Sign in</h4>
                    <hr />
                </div>
                <form name='form1' className="form-group">
                    <div className="input-section">
                        <label forhtml="username">Username</label>
                        <input
                            name='username'
                            value={form.username}
                            onChange={fillForm}
                            placeholder='Username'
                            type='text'
                            className="form-control"
                        />
                        {form.errors.username.length > 0 &&
                            <span className='error'>{form.errors.username}</span>}
                    </div>

                    <div className="input-section">
                        <label forhtml="password">Password</label>
                        <input
                            name='password'
                            value={form.password}
                            onChange={fillForm}
                            placeholder='Password'
                            type='password'
                            className="form-control"
                            onKeyDown={handleLogin}
                        />
                        {form.errors.password.length > 0 &&
                            <span className='error'>{form.errors.password}</span>}
                    </div>
                </form>

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="btn btn-secondary"
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

const mapStateToProps = ({ user: { loading } }) => ({ loading });

export default connect(mapStateToProps, { loginUserAsync })(Login);
