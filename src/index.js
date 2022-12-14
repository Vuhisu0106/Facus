import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import AuthProvider from './context/AuthContext';
import AppProvider from './context/AppContext';
import { Provider } from 'react-redux';
import store from './app/store';
import ChatNotiProvider from './context/ChatNotiContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <AuthProvider>
            <AppProvider>
                <ChatNotiProvider>
                    <Provider store={store}>
                        <BrowserRouter>
                            <GlobalStyles>
                                <App />
                            </GlobalStyles>
                        </BrowserRouter>
                    </Provider>
                </ChatNotiProvider>
            </AppProvider>
        </AuthProvider>
    </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
