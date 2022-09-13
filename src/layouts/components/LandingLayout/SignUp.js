import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import { useAuth } from '~/context/AuthContext';
import { auth } from '~/firebase';
import styles from './LandingLayout.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    //const [isSignedUp, setIsSignedUp] = useState(false);
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            navigate('/');
            //handleNavigate();
        } catch (e) {
            setError(error);
        }
        //setIsSignedUp(true);
        setLoading(false);
    }

    // function handleNavigate() {
    //     if (isSignedUp) {
    //         navigate('/home');
    //         console.log('is signed up');
    //     }
    // }

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/dkm');
    //         console.log('is signed up');
    //     }
    // }, []);

    return (
        <div className={cx('sign-up-wrapper')}>
            <form onSubmit={handleSubmit} className={cx('sign-up-form')}>
                <h2 className={cx('title')}>Sign up</h2>
                {currentUser && currentUser.email}

                {/* <div className={cx('input-field')}>
            <FontAwesomeIcon className={cx('icon')} icon={faUser} />

            <input type="text" placeholder="Username" />
        </div> */}
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                    <input placeholder="Email" ref={emailRef} />
                </div>
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                    <input type="password" placeholder="Password" ref={passwordRef} />
                </div>
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                    <input type="password" placeholder="Confirm password" ref={passwordConfirmRef} />
                </div>
                <button disabled={loading} type="submit" className={cx('btn')} value="Sign up">
                    Sign up
                </button>
                <p className={cx('social-text')}>Or Sign up with social platforms</p>
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

export default SignUp;
