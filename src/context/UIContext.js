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

    //Dark/light mode
    const [dark, setDark] = useState(false || darkModeState);

    // if (dark) {
    //     document.getElementsByTagName('HTML')[0].setAttribute('data-theme', 'dark');
    // } else {
    //     document.getElementsByTagName('HTML')[0].setAttribute('data-theme', 'light');
    // }

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
        dark,
        toggleTheme,
        checkDark,
    };

    return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;
