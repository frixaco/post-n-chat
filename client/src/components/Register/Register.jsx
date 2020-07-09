import React, { useState } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';

import { connect } from 'react-redux';

function Register({ loading }) {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const fillForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const registerUser = async () => {
        try {
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

                    <label forhtml="email">Email</label>
                    <input
                        name='email'
                        value={form.email}
                        onChange={fillForm}
                        placeholder='Email'
                        type='email'
                        className="form-control"
                        id="email" />

                    <label forhtml="password">Password</label>
                    <input
                        name='password'
                        value={form.password}
                        onChange={fillForm}
                        placeholder='Passoword'
                        type='password'
                        className="form-control"
                        id="password" />
                </div>

                <button
                    onClick={registerUser}
                    disabled={loading}
                    className="btn btn-primary"
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

const mapStateToProps = ({ user: { loading } }) => ({
    loading
});

export default connect(mapStateToProps)(Register);
