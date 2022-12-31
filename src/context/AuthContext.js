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

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    async function login(email, password, rememberMe) {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout() {
        setCurrentUser();
        return signOut(auth);
    }

    async function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    // function signupWithGoogle() {
    //     return signInWithGooglePopUp(auth, provider).then((result) => {
    //       console.log(result)
    //     }).catch((error) => {
    //       console.log(error)
    //     })
    //   }

    useEffect(() => {
        const unsubcriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubcriber;
    }, []);

    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default AuthProvider;
