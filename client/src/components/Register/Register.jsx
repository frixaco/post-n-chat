import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import { connect } from 'react-redux';

import { validEmailRegex, validateForm } from '../validators-utils';

function Register({ loading }) {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        errors: {
            username: '',
            email: '',
            password: '',
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
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
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

    const registerOnEnter = async e => {
        try {
            if (validateForm(form.errors) && e.key === 'Enter') {
                toast.info('Registering...', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    transition: Slide
                });
                await Axios.post('/auth/register', form)
                toast.success('Registration success!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    transition: Slide
                });
                setForm({
                    username: '', email: '', password: '', errors: {
                        username: '',
                        email: '',
                        password: '',
                    }
                })
            } else {
                console.log('Invalid form');
            }
        } catch (err) {
            console.log(err.message)
        }

    }

    const registerUser = async () => {
        try {
            if (validateForm(form.errors)) {
                toast.info('Registering...', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    transition: Slide
                });
                await Axios.post('/auth/register', form)
                toast.success('Registration success!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    transition: Slide
                });
                setForm({
                    username: '', email: '', password: '', errors: {
                        username: '',
                        email: '',
                        password: '',
                    }
                })
            } else {
                console.log('Invalid Form');
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <div className='form' >
                <div>
                    <h4>Create a new account</h4>
                    <hr />
                </div>
                <form name='form2' className="form-group">
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
                        <label forhtml="email">Email</label>
                        <input
                            name='email'
                            value={form.email}
                            onChange={fillForm}
                            placeholder='Email'
                            type='email'
                            className="form-control"
                        />
                        {form.errors.email.length > 0 &&
                            <span className='error'>{form.errors.email}</span>}
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
                            onKeyDown={registerOnEnter}
                        />
                        {form.errors.password.length > 0 &&
                            <span className='error'>{form.errors.password}</span>}
                    </div>
                </form>

                <button
                    onClick={registerUser}
                    disabled={loading}
                    className="btn btn-secondary"
                >REGISTER</button>


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

export default connect(mapStateToProps)(Register);
