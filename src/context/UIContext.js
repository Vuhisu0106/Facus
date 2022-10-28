import { useState, createContext, useContext } from 'react';

export const UIContext = createContext();

export function useUI() {
    return useContext(UIContext);
}

const darkModeState = JSON.parse(localStorage.getItem('darkMode'));

function UIProvider({ children }) {
    //Add chat
    const [isAddChatVisible, setIsAddChatVisible] = useState(false);
    const clearState = () => {
        setIsAddChatVisible(false);
    };
    //Add post modal
    const [addPhotoVisible, setAddPhotoVisible] = useState(false);
    const [buttonActive, setButtonActive] = useState(false);
    //Edit profile modal
    const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);

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
        addPhotoVisible,
        setAddPhotoVisible,
        buttonActive,
        setButtonActive,
        isEditProfileVisible,
        setIsEditProfileVisible,
        dark,
        toggleTheme,
        checkDark,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;
