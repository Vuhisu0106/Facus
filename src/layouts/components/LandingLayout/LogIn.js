import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';

import { useAuth } from '~/context/AuthContext';
import styles from './LandingLayout.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
            //console.log(currentUser);
        } catch (error) {
            setError('Failed to log in');
            //console.log(error);
        }

        setLoading(false);
    }

    return (
        <div className={cx('log-in-wrapper')}>
            <form onSubmit={handleSubmit} className={cx('log-in-form')}>
                <h2 className={cx('title')}>Log In</h2>
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                    <input placeholder="Email" ref={emailRef} />
                </div>
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                    <input type="password" placeholder="Password" ref={passwordRef} />
                </div>
                <button disabled={loading} className={cx('btn')} type="submit" value="Log in">
                    Log in
                </button>

                <p className={cx('social-text')}>Or Log in with social platforms</p>
                <div className={cx('social-media')}>
                    <a href="" className={cx('social-icon')}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </a>
                    <a href="" className={cx('social-icon')}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </a>
                    <a href="" className={cx('social-icon')}>
                        <FontAwesomeIcon icon={faGoogle} />
                    </a>
                    <a href="" className={cx('social-icon')}>
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </div>
            </form>
        </div>
    );
}

export default LogIn;
