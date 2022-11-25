import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCamera, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { storage } from '~/firebase/config';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useAuth } from '~/context/AuthContext';
import styles from './SignUp.module.scss';
import { useNavigate } from 'react-router-dom';
import { generateKeywords } from '~/utils/generateKeywords';
import { setDocument } from '~/firebase/services';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';
import Shape from '../Shape';

const cx = classNames.bind(styles);

function SignUp() {
    const emailRef = useRef();
    const displayNameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    //const fileRef = useRef();
    const [file, setFile] = useState(null);

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
            const res = await signup(emailRef.current.value, passwordRef.current.value);

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${'photoURL' + displayNameRef.current.value + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName: displayNameRef.current.value,
                            photoURL: downloadURL,
                        });

                        //create user on firestore
                        await setDocument('users', res.user.uid, {
                            uid: res.user.uid,
                            displayName: displayNameRef.current.value,
                            email: emailRef.current.value,
                            photoURL: downloadURL,
                            coverPhotoURL: null,
                            keywords: generateKeywords(displayNameRef.current.value),
                            following: [],
                            follower: [],
                            bio: '',
                            isAdmin: false,
                        });

                        //create empty user chats on firestore
                        await setDocument('userChats', res.user.uid, {});
                        await setDocument('userPost', res.user.uid, {});
                        navigate('/home');
                    } catch (err) {
                        console.log(err);
                        setError(true);
                        setLoading(false);
                    }
                });
            });
        } catch (e) {
            setError(error);
            console.log(e);
        }
        //setIsSignedUp(true);
        setLoading(false);
    }

    return (
        <Grid type={'landing'} className={cx('sign-up-wrapper')}>
            <GridRow>
                <GridColumn l={5} l_o={1} m={7} s={12}>
                    <div className={cx('sign-up-col')}>
                        <form onSubmit={handleSubmit} className={cx('sign-up-form')}>
                            <div className={cx('title')}>
                                <h2>Sign up</h2>
                            </div>
                            {currentUser && currentUser.email}

                            {/* <div className={cx('input-field')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faUser} />
            
                        <input type="text" placeholder="Username" />
                    </div> */}
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

                            {/* <div className={cx('input-field')}>
                                <input
                                    required
                                    style={{ display: 'none' }}
                                    type="file"
                                    id="file"
                                    onChange={(e) => {
                                        setFile(e.target.files[0]);
                                    }}
                                />
                                <label htmlFor="file">
                                    <FontAwesomeIcon className={cx('icon')} icon={faCamera} />
                                    <span>Add an avatar</span>
                                </label>
                            </div> */}

                            <button disabled={loading} type="submit" className={cx('btn')} value="Sign up">
                                Sign up
                            </button>
                        </form>
                    </div>
                </GridColumn>
                <GridColumn l={6} m={5} className={cx('animate-col')}>
                    <div className={cx('background')}>
                        <Shape width={'500'} height={'500'} top={'-30'} left={'20'} color={'#f3ce9e'} blur={75} />
                        <Shape width={'500'} height={'500'} top={'-30'} left={'325'} color={'#ff6fb0'} blur={75} />
                        <Shape width={'500'} height={'500'} top={'300'} left={'150'} color={'#b879ff'} blur={75} />
                        <div className={cx('blur-backgound')}></div>
                    </div>
                    <div className={cx('rocket')}>
                        <img className={cx('rocket-image')} src="images/Saly-1.png" alt="" />
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default SignUp;
