import classNames from 'classnames/bind';

import styles from './LandingPage.module.scss';
import SignUp from '~/layouts/components/LandingLayout/SignUp';
import LogIn from '~/layouts/components/LandingLayout/LogIn';
import { Outlet, Route, Router, Routes } from 'react-router-dom';
import HomePage from '~/layouts/components/LandingLayout/HomePage';
import Header from '~/layouts/components/Header';

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

    return <SignUp />;
}

export default LandingPage;
