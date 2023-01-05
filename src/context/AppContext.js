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

    const adminInfo = {
        uid: 'krsBSb4O6QblOCYyS58x5ge6eGW2',
        displayName: 'Vũ Hiếu',
        photoURL:
            'https://firebasestorage.googleapis.com/v0/b/facus-f9b9c.appspot.com/o/photoURLkrsBSb4O6QblOCYyS58x5ge6eGW21672635198299?alt=media&token=c02aa098-fd33-4d69-929e-c67b2be12c72',
    };

    useEffect(() => {
        const getCurrentUser = () => {
            const unsub = onSnapshot(doc(db, 'users', currentUser.uid), (doc) => {
                Object.keys(doc.data() || {}).length > 0 && setCurrentUserInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        currentUser && getCurrentUser();
    }, [currentUser]);

    const value = { currentUserInfo, adminInfo };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
