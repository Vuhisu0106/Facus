import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useLayoutEffect } from 'react';
import { FadingBalls } from 'react-cssfx-loading';

import { useAuth } from '~/context/AuthContext';
import styles from './LogIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '~/components/Checkbox';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import config from '~/configs';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function LogIn() {
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [open, setOpen] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();

    useLayoutEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 50);
    }, []);

    const navigate = useNavigate();

    const handleRememberMe = (e) => {
        if (e.target.checked) {
            setRememberMe(true);
        } else {
            setRememberMe(false);
        }
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const submitData = [emailRef.current.value, passwordRef.current.value];
        if (!submitData.every((data) => data !== '')) {
            toast.error('Please complete all required fields');
        } else {
            try {
                setLoading(true);
                await login(emailRef.current.value, passwordRef.current.value, rememberMe);
                toast.success('Log in successfully');
                navigate('/');
            } catch (error) {
                var errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    toast.error('Incorrect password');
                } else if (errorCode === 'auth/user-not-found') {
                    toast.error('No users found');
                } else if (errorCode === 'auth/invalid-email') {
                    toast.error('Email invalid');
                } else toast.error('Failed to log in');
                console.log(error);
            }
        }

        setLoading(false);
    }

    const heartImgClass = ['heart-image-1', 'heart-image-2', 'heart-image-3', 'heart-image-4'];

    return (
        <Grid type={'landing'} className={cx('log-in-wrapper')}>
            <GridRow>
                <div className={cx('cloud')}>
                    <img className={cx('cloud-image')} src="images/cloud.png" alt="" />
                    {heartImgClass.map((classes) => (
                        <img
                            key={classes}
                            className={cx(classes, 'heart-img', open && 'log-in__open')}
                            src="images/heart.png"
                            alt=""
                        />
                    ))}
                    <img className={cx('image-4')} src="images/modern-design-banner-elements.png" alt="" />
                </div>
                <GridColumn l={6} m={6} s={0} className={cx('animate-col')}>
                    <div className={cx('hand')}>
                        <img className={cx('hand-image', open && 'log-in__open')} src="images/Saly-24.png" alt="" />
                    </div>
                </GridColumn>
                <GridColumn l={4.5} l_o={1} m={6} s={12}>
                    <div className={cx('log-in-col')}>
                        <form onSubmit={handleSubmit} className={cx('log-in-form')}>
                            <div className={cx('form__body')}>
                                <div className={cx('title')}>
                                    <h2>Log in</h2>
                                </div>

                                <div className={cx('input')}>
                                    <h4>Email</h4>
                                    <div className={cx('input-field')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                        <input type="email" placeholder="Email" ref={emailRef} />
                                    </div>
                                </div>
                                <div className={cx('input')}>
                                    <h4>Password</h4>
                                    <div className={cx('input-field')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faLock} />
                                        <input type="password" placeholder="Password" ref={passwordRef} />
                                    </div>
                                </div>

                                <div className={cx('other-features')}>
                                    <Checkbox text={'Remember me'} onChange={handleRememberMe} />
                                    <Link className={cx('')} to={config.routes.forgetPassword}>
                                        Forget Password
                                    </Link>
                                </div>

                                <button disabled={loading} className={cx('log-in__btn')} type="submit" value="Log in">
                                    {loading ? (
                                        <FadingBalls color="#fff" width="32px" height="8px" duration="0.4s" />
                                    ) : (
                                        'Log in'
                                    )}
                                </button>
                            </div>

                            <div className={cx('form__footer')}>
                                <h4>
                                    Don't have an account yet?{' '}
                                    <span
                                        onClick={() => {
                                            navigate('/sign-up');
                                        }}
                                    >
                                        Sign up
                                    </span>{' '}
                                </h4>
                            </div>
                        </form>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default LogIn;
