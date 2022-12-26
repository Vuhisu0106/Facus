import classNames from 'classnames/bind';
import { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import styles from './ForgetPassword.module.scss';

const cx = classNames.bind(styles);
function ForgetPassword() {
    const [email, setEmail] = useState('');
    const { forgotPassword } = useAuth();

    const sendPassword = async () => {
        if (email) {
            await forgotPassword(email);
        }
        setEmail('');
    };
    return (
        <div className={cx('wrapper')}>
            <input
                className={cx('input')}
                placeholder="Email here"
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            ></input>
            <button onClick={sendPassword}>Send</button>
        </div>
    );
}

export default ForgetPassword;
