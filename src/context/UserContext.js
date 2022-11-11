import { onSnapshot, doc } from 'firebase/firestore';
import { useState } from 'react';
import { createContext, useContext, useReducer, useEffect } from 'react';

import { db } from '~/firebase/config';
import { useAuth } from './AuthContext';

export const UserContext = createContext();

export function useUser() {
    return useContext(UserContext);
}

function UserProvider({ children }) {
    const { currentUser } = useAuth();
    //const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    // useEffect(() => {
    //     const unSub = onSnapshot(doc(db, 'following', currentUser.uid), (doc) => {
    //         doc.exists() && setCurrentUserFollowing(Object.entries(doc.data()));
    //     });

    //     return unSub;
    // }, []);
    const INITIAL_STATE = {
        user: {},
        // currentUserFollowing,
        // fetchUserFollowing: 'null',
    };

    const userReducer = (state, action) => {
        switch (action.type) {
            case 'SELECT_USER':
                return {
                    user: action.payload,
                };

            default:
                return state;
        }
    };

    const addToLocalStorage = (localStorageName, data) => {
        localStorage.setItem(localStorageName, data);
    };

    const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);

    return <UserContext.Provider value={{ data: state, dispatch, addToLocalStorage }}>{children}</UserContext.Provider>;
}

export default UserProvider;
