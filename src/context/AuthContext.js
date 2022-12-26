import { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
    setPersistence,
    browserSessionPersistence,
    browserLocalPersistence,
} from 'firebase/auth';

import { auth } from '~/firebase/config';

const AuthContext = createContext();
export function useAuth() {
    return useContext(AuthContext);
}

function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const [rememberMe, setRememberMe] = useState(false);

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function login(email, password) {
        setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence)
            .then(() => {
                return signInWithEmailAndPassword(auth, email, password);
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
            });
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser();
        return signOut(auth);
    }

    function forgotPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        const unsubcriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubcriber;
    }, []);

    // useEffect(() => {
    //     const unsubcriber = onAuthStateChanged(auth, (user) => {
    //         if (user) {
    //             navigate('/');
    //             setCurrentUser(user);
    //             setLoading(false);
    //         }
    //         setCurrentUser();
    //         setLoading(false);
    //         navigate('/landing');
    //     });

    //     return unsubcriber;
    // }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        forgotPassword,
        rememberMe,
        setRememberMe,
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default AuthProvider;
