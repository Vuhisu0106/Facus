import { useState, createContext, useContext, ChangeEventHandler, useEffect } from 'react';

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

const darkModeState = JSON.parse(localStorage.getItem('darkMode'));

function AppProvider({ children }) {
    //Add chat
    const [isAddChatVisible, setIsAddChatVisible] = useState(false);
    const clearState = () => {
        setIsAddChatVisible(false);
    };
    //Add post modal
    const [isAddPostVisible, setIsAddPostVisible] = useState(false);
    const [addPhotoVisible, setAddPhotoVisible] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    //Edit profile modal
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
    //Edit status modal
    const [isEditStatusModal, setIsEditStatusModal] = useState(false);

    //Dark/light mode
    const [dark, setDark] = useState(false || darkModeState);

    const toggleTheme = () => {
        setDark(!dark);
        localStorage.setItem('darkMode', String(!dark));
    };

    const checkDark = (className) => {
        if (dark && !className) {
            return 'dark';
        } else if (dark && className) {
            return className;
        } else {
            return '';
        }
    };

    //Change background color of body based on theme
    if (dark) {
        document.body.style.backgroundColor = '#18191a';
    } else {
        document.body.style.backgroundColor = '#f2f5f7';
    }

    const value = {
        isAddChatVisible,
        setIsAddChatVisible,
        clearState,
        isAddPostVisible,
        setIsAddPostVisible,
        addPhotoVisible,
        setAddPhotoVisible,
        buttonActive,
        setButtonActive,
        isEditProfileVisible,
        setIsEditProfileVisible,
        isEditStatusModal,
        setIsEditStatusModal,
        dark,
        toggleTheme,
        checkDark,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
