import classNames from 'classnames/bind';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '~/context/AuthContext';
import styles from './ForgetPassword.module.scss';

const cx = classNames.bind(styles);
function ForgetPassword() {
    const [email, setEmail] = useState('');
    const { resetPassword } = useAuth();

    const sendPassword = async () => {
        if (email) {
            try {
                await resetPassword(email);
                alert('Password reset email sent');
                //setMessage('Check your inbox for further instructions');
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    toast.error('Email not found');
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid email');
                } else {
                    toast.error('Fail to reset password');
                }
            }
        } else {
            toast.error('Please enter your email');
        }
        setEmail('');
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img className={cx('image')} src="images/Saly-10.png" alt="" />
            </div>
            <div className={cx('body')}>
                <input
                    className={cx('input')}
                    value={email}
                    placeholder="Email here"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                ></input>
                <button onClick={sendPassword}>Send</button>
            </div>
        </div>
    );
}

export default ForgetPassword;
