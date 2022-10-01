import { useState, createContext, useContext, useReducer } from 'react';

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

function AppProvider({ children }) {
    const [isAddChatVisible, setIsAddChatVisible] = useState(false);

    const clearState = () => {
        setIsAddChatVisible(false);
    };

    const value = {
        isAddChatVisible,
        setIsAddChatVisible,
        clearState,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
