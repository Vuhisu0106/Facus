import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useLayoutEffect } from 'react';
import { updateProfile } from 'firebase/auth';

import { useAuth } from '~/context/AuthContext';
import styles from './SignUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { generateKeywords } from '~/utils';
import { setDocument } from '~/firebase/services';
import Shape from '../Shape';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { toast } from 'react-toastify';
import { FadingBalls } from 'react-cssfx-loading';

const cx = classNames.bind(styles);

function SignUp() {
    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const { signup, currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useLayoutEffect(() => {
        setTimeout(() => {
            setOpen(true);
        }, 50);
    }, []);

    const DEFAULT_COVER_PHOTO =
        'https://firebasestorage.googleapis.com/v0/b/facus-f9b9c.appspot.com/o/defaultCoverPhoto?alt=media&token=64708df0-b9a5-4ad6-8eb5-4ee5d6517efa';

    const DEFAULT_AVATAR =
        'https://firebasestorage.googleapis.com/v0/b/facus-f9b9c.appspot.com/o/defaultAvatar?alt=media&token=7a69a80f-e8ba-48f3-b4d3-48679bb9670a';

    async function handleSubmit(e) {
        e.preventDefault();
        const submitData = [
            emailRef.current.value,
            displayNameRef.current.value,
            passwordRef.current.value,
            passwordConfirmRef.current.value,
        ];

        if (!submitData.every((data) => data !== '')) {
            toast.error('Please complete all required fields');
        } else {
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                toast.error('Passwords do not match');
            } else {
                try {
                    setLoading(true);
                    const res = await signup(emailRef.current.value, passwordRef.current.value);

                    try {
                        await updateProfile(res.user, {
                            displayName: submitData[1],
                            photoURL: DEFAULT_AVATAR,
                        });

                        await setDocument('users', res.user.uid, {
                            uid: res.user.uid,
                            displayName: submitData[1],
                            email: submitData[0],
                            photoURL: DEFAULT_AVATAR,
                            coverPhotoURL: DEFAULT_COVER_PHOTO,
                            keywords: generateKeywords(submitData[1].toLowerCase()),
                            following: [],
                            follower: [],
                            bio: '',
                            isAdmin: false,
                        });

                        //create empty user chats on firestore
                        await setDocument('userChats', res.user.uid, {});
                        navigate('/');
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    var errorCode = error.code;
                    if (errorCode === 'auth/email-already-in-use') {
                        toast.error('User already exists');
                    } else if (errorCode === 'auth/invalid-email') {
                        toast.error('Email invalid');
                    } else if (errorCode === 'auth/weak-password') {
                        toast.error('Password should be at least 6 characters');
                    } else {
                        toast.error('Fail to sign up');
                    }
                    console.log(error);
                }
            }
        }

        setLoading(false);
    }

    return (
        <Grid type={'landing'} className={cx('sign-up-wrapper')}>
            <GridRow>
                <GridColumn l={5} l_o={1} m={7} s={12} className={cx('form-col')}>
                    <div className={cx('sign-up-col')}>
                        <form onSubmit={handleSubmit} className={cx('sign-up-form')}>
                            <div className={cx('title')}>
                                <h2>Sign up</h2>
                            </div>
                            {currentUser && currentUser.email}

                            <div className={cx('user-info-input')}>
                                <div className={cx('input')}>
                                    <h4>Email</h4>
                                    <div className={cx('input-field')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faEnvelope} />
                                        <input placeholder="Email" ref={emailRef} />
                                    </div>
                                </div>

                                <div className={cx('input')}>
                                    <h4>User name</h4>
                                    <div className={cx('input-field')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                                        <input placeholder="User name" ref={displayNameRef} />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('input')}>
                                <h4>Password</h4>
                                <div className={cx('input-field')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                                    <input type="password" placeholder="Password" ref={passwordRef} />
                                </div>
                            </div>

                            <div className={cx('input')}>
                                <h4> Confirm password</h4>
                                <div className={cx('input-field')}>
                                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                                    <input type="password" placeholder="Confirm password" ref={passwordConfirmRef} />
                                </div>
                            </div>

                            <button disabled={loading} type="submit" className={cx('btn')} value="Sign up">
                                {loading ? (
                                    <FadingBalls color="#fff" width="32px" height="8px" duration="0.4s" />
                                ) : (
                                    'Sign up'
                                )}
                            </button>

                            <p className={cx('sign-up__footer')}>
                                If you have an account, let's{' '}
                                <span
                                    onClick={() => {
                                        navigate('/log-in');
                                    }}
                                >
                                    log in
                                </span>
                            </p>
                        </form>
                        <img className={cx('cloud-image-1')} src="images/Cloud-1.png" alt="" />
                        <img className={cx('cloud-image-2')} src="images/Cloud-1.png" alt="" />
                        <img className={cx('cloud-image-3')} src="images/Cloud-2.png" alt="" />
                        <img className={cx('cloud-image-4')} src="images/Cloud-2.png" alt="" />
                        <img className={cx('cloud-image-5')} src="images/Cloud-2.png" alt="" />
                    </div>
                </GridColumn>
                <GridColumn l={6} m={5} className={cx('animate-col')}>
                    <div className={cx('background')}>
                        <Shape width={'500'} height={'500'} top={'-30'} left={'20'} color={'#f3ce9e'} blur={75} />
                        <Shape width={'500'} height={'500'} top={'-30'} left={'325'} color={'#ff6fb0'} blur={75} />
                        <Shape width={'500'} height={'500'} top={'300'} left={'150'} color={'#b879ff'} blur={75} />
                        <div className={cx('blur-background')}></div>
                    </div>
                    <div className={cx('rocket')}>
                        <img className={cx('rocket-image', open && 'sign-up__open')} src="images/Saly-1.png" alt="" />
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default SignUp;
