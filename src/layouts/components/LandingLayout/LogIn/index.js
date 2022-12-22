import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';

import { useAuth } from '~/context/AuthContext';
import styles from './LogIn.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Shape from '../Shape';
import Checkbox from '~/components/Checkbox';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import config from '~/configs';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login, setRememberMe } = useAuth();

    const [loading, setLoading] = useState(false);

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

        try {
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate('/');
        } catch (error) {
            toast.error('Failed to log in');
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <Grid type={'landing'} className={cx('log-in-wrapper')}>
            <GridRow>
                <div className={cx('cloud')}>
                    <img className={cx('cloud-image')} src="images/cloud.png" alt="" />
                    <img className={cx('heart-image-1')} src="images/heart.png" alt="" />
                    <img className={cx('heart-image-2')} src="images/heart.png" alt="" />
                    <img className={cx('heart-image-3')} src="images/heart.png" alt="" />
                    <img className={cx('image-4')} src="images/modern-design-banner-elements.png" alt="" />
                </div>
                <GridColumn l={6} m={6} s={0} className={cx('animate-col')}>
                    <div className={cx('hand')}>
                        <img className={cx('hand-image')} src="images/Saly-24.png" alt="" />
                    </div>
                </GridColumn>
                <GridColumn l={4.5} l_o={1} m={6} s={12}>
                    <div className={cx('log-in-col')}>
                        <div className={cx('background')}>
                            <Shape
                                width={'200'}
                                height={'200'}
                                top={'-30'}
                                left={'-150'}
                                color={'#f3ce9e'}
                                blur={125}
                            />
                            <Shape width={'200'} height={'200'} top={'-30'} left={'200'} color={'#ff6fb0'} blur={125} />
                            <Shape width={'200'} height={'200'} top={'300'} left={'20'} color={'#b879ff'} blur={125} />
                        </div>
                        <form onSubmit={handleSubmit} className={cx('log-in-form')}>
                            <div className={cx('title')}>
                                <h2>Log in</h2>
                            </div>

                            <div className={cx('input')}>
                                <h4>Email</h4>
                                <div className={cx('input-field')}>
                                    {/* <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} /> */}
                                    <input type="email" placeholder="Email" ref={emailRef} />
                                </div>
                            </div>
                            <div className={cx('input')}>
                                <h4>Password</h4>
                                <div className={cx('input-field')}>
                                    {/* <FontAwesomeIcon className={cx('icon')} icon={faLock} /> */}
                                    <input type="password" placeholder="Password" ref={passwordRef} />
                                </div>
                            </div>

                            <div className={cx('other-features')}>
                                <Checkbox text={'Remember me'} onChange={handleRememberMe} />
                                <Link className={cx('')} to={config.routes.forgetPassword}>
                                    Forget Password
                                </Link>
                            </div>

                            <button disabled={loading} className={cx('btn')} type="submit" value="Log in">
                                Log in
                            </button>

                            <p className={cx('social-text')}>Or Log in with social platforms</p>
                            <div className={cx('social-media')}>
                                <a href="" className={cx('social-icons')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faFacebook} />
                                </a>
                                <a href="" className={cx('social-icons')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faTwitter} />
                                </a>
                                <a href="" className={cx('social-icons')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faGoogle} />
                                </a>
                                <a href="" className={cx('social-icons')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faLinkedin} />
                                </a>
                            </div>
                        </form>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default LogIn;
