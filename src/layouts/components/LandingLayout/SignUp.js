import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCamera, faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { storage } from '~/firebase/firebase';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import { useAuth } from '~/context/AuthContext';
import styles from './LandingLayout.module.scss';
import { useNavigate } from 'react-router-dom';
import { generateKeywords } from '~/services/generateKeywords';
import { setDocument } from '~/firebase/services';

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

            // await updateProfile(res.user, {
            //     displayName: displayNameRef.current.value,
            //     //photoURL: downloadURL,
            // });

            // await setDoc(doc(db, 'users', res.user.uid), {
            //     uid: res.user.uid,
            //     displayName: displayNameRef.current.value,
            //     email: emailRef.current.value,
            //     //photoURL: downloadURL,
            // });
            // navigate('/');

            //Create a unique image name
            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayNameRef.current.value + date}`);

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
                            keywords: generateKeywords(displayNameRef.current.value),
                        });

                        //create empty user chats on firestore
                        await setDocument('userChats', res.user.uid, {});
                        await setDocument('following', res.user.uid, {});
                        await setDocument('follower', res.user.uid, {});
                        await setDocument('userPost', res.user.uid, {});
                        navigate('/');
                    } catch (err) {
                        console.log(err);
                        setError(true);
                        setLoading(false);
                    }
                });
            });

            //Create a unique image name
            // const date = new Date().getTime();
            // const storageRef = ref(storage, `${displayNameRef + date}`);

            // await uploadBytesResumable(storageRef, file).then(() => {
            //     getDownloadURL(storageRef).then(async (downloadURL) => {
            //         try {
            //             //Update profile
            //             await updateProfile(res.user, {
            //                 displayNameRef,
            //                 photoURL: downloadURL,
            //             });
            //             //create user on firestore
            //             await setDoc(doc(db, 'usersabcd', res.user.uid), {
            //                 uid: res.user.uid,
            //                 displayName: displayNameRef.current.value,
            //                 email: emailRef.current.value,
            //                 //photoURL: downloadURL,
            //             });

            //             //create empty user chats on firestore
            //             //await setDoc(doc(db, 'userChats', res.user.uid), {});
            //             navigate('/');
            //         } catch (err) {
            //             console.log(err);
            //             setError(true);
            //             setLoading(false);
            //         }
            //     });
            // });
            //handleNavigate();
        } catch (e) {
            setError(error);
            console.log(e);
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
                    <FontAwesomeIcon className={cx('icon')} icon={faUser} />
                    <input placeholder="User name" ref={displayNameRef} />
                </div>

                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                    <input type="password" placeholder="Password" ref={passwordRef} />
                </div>
                <div className={cx('input-field')}>
                    <FontAwesomeIcon className={cx('icon')} icon={faLock} />

                    <input type="password" placeholder="Confirm password" ref={passwordConfirmRef} />
                </div>

                <div className={cx('input-field')}>
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
