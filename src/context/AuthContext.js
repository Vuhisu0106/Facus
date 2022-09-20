import { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

import { auth } from '~/firebase';

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

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logout(email, password) {
        return signOut(auth);
    }

    useEffect(() => {
        const unsubcriber = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
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
    };
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}

export default AuthProvider;
