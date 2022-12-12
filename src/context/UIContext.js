// import { useState, createContext, useContext } from 'react';

// export const UIContext = createContext();

// export function useUI() {
//     return useContext(UIContext);
// }

// const darkModeState = JSON.parse(localStorage.getItem('darkMode'));

// function UIProvider({ children }) {
//     //Dark/light mode
//     const [dark, setDark] = useState(false || darkModeState);

//     // if (dark) {
//     //     document.getElementsByTagName('HTML')[0].setAttribute('theme', 'dark');
//     //     document.body.style.backgroundColor = '#18191a';
//     // } else {
//     //     document.getElementsByTagName('HTML')[0].setAttribute('theme', 'light');
//     //     document.body.style.backgroundColor = '#f2f5f7';
//     // }

//     // const toggleTheme = () => {
//     //     setDark(!dark);
//     //     localStorage.setItem('darkMode', String(!dark));
//     // };

//     const checkDark = (className) => {};

//     //Change background color of body based on theme
//     if (dark) {
//     } else {
//     }

//     const value = {
//         dark,
//         //toggleTheme,
//         checkDark,
//     };

//     return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
// }

// export default UIProvider;
