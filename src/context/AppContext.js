import { createContext, useContext, useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useAuth } from './AuthContext';

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

function AppProvider({ children }) {
    const { currentUser } = useAuth();
    const [currentUserInfo, setCurrentUserInfo] = useState({});

    useEffect(() => {
        const getCurrentUser = () => {
            const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
                Object.keys(doc.data()).length > 0 && setCurrentUserInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        currentUser && getCurrentUser();
    }, [currentUser]);

    const value = { currentUserInfo };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
