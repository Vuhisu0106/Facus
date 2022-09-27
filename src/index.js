import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './components/GlobalStyles';
import AuthProvider from './context/AuthContext';
import ChatProvider from './context/ChatContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ChatProvider>
            <React.StrictMode>
                <BrowserRouter>
                    <GlobalStyles>
                        <App />
                    </GlobalStyles>
                </BrowserRouter>
            </React.StrictMode>
        </ChatProvider>
    </AuthProvider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
