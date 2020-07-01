import React, { useState } from 'react'
import Input from './Input';


import { connect } from 'react-redux';
import { loginUser } from '../../redux/user/userActions';


function LoginRegister({ loginUser }) {
    const [form, setForm] = useState({ username: '', email: '', password: '' });

    const fillForm = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <div>
            <h2>Login</h2>

            <Input type="username" val={form.username} onChange={fillForm} />
            <Input type="email" val={form.email} onChange={fillForm} />
            <Input type="password" val={form.password} onChange={fillForm} />

            <button onClick={() => loginUser(form)}>Login</button>

            <h2>Register</h2>
            <button>Register</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loginUser: user => dispatch(loginUser(user))
})

export default connect(null, mapDispatchToProps)(LoginRegister);
