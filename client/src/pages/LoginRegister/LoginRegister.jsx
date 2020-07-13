import React from 'react'
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import { loginUserAsync } from '../../redux/user/userActions';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';


function LoginRegister({ loginUserAsync, guest }) {
    const handleGuestLogin = () => {
        toast.info('Logging in as GuestUser...', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            transition: Slide
        });
        loginUserAsync({ ...guest })
    }
    return (
        <>
            <div className='form-container'>
                <div className='login_register'>
                    <Login />
                    <Register />
                </div>
                <div>
                    <button
                        onClick={handleGuestLogin}
                        type="submit"
                        className='btn btn-outline-secondary'
                        style={{ margin: '0 0 30px' }}
                    >Sign in as Guest</button>
                </div>
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


const mapStateToProps = ({ user: { loading, guest } }) => ({ loading, guest });

export default connect(mapStateToProps, { loginUserAsync })(LoginRegister);