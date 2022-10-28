import { faFacebook, faGoogle, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import { useAuth } from '~/context/AuthContext';
import { auth } from '~/firebase/config';
import styles from './LandingPage.module.scss';
import SignUp from '~/layouts/components/LandingLayout/SignUp';
import LogIn from '~/layouts/components/LandingLayout/LogIn';

const cx = classNames.bind(styles);

function LandingPage() {
    // const [registerEmail, setRegisterEmail] = useState('');
    // const [registerPassword, setRegisterPassword] = useState('');
    // const [loginEmail, setLoginEmail] = useState('');
    // const [loginPassword, setLoginPassword] = useState('');

    // const [user, setUser] = useState({});

    // onAuthStateChanged(auth, (currentUser) => {
    //     setUser(currentUser);
    // });

    // const register = async () => {
    //     try {
    //         const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    //         console.log(user);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    // const login = async () => {
    //     try {
    //         const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    //         console.log(user);
    //     } catch (error) {
    //         console.log(error.message);
    //     }
    // };

    // const logout = async () => {
    //     await signOut(auth);
    // };

    return (
        <div className={cx('wrapper')}>
            {/* Log in form  */}
            <LogIn />

            {/* Sign Up form */}
            <SignUp />
        </div>
    );
}

export default LandingPage;
