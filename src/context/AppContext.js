import { useState, createContext, useContext } from 'react';

export const AppContext = createContext();

export function useApp() {
    return useContext(AppContext);
}

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
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
