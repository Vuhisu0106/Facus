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
    const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

    useEffect(() => {
        const getFollowing = () => {
            const unsub = onSnapshot(doc(db, 'following', currentUser.uid), (doc) => {
                setCurrentUserFollowing(
                    Object.entries(doc.data()).map((follow) => {
                        return follow[0];
                    }),
                );
            });
            return () => {
                unsub();
            };
        };

        currentUser?.uid && getFollowing();
    }, []);

    const value = { currentUserFollowing };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
