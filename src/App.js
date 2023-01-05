import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Error from './pages/Error';
import { PrivateRoute, PublicRoute } from './components/Route';

function App() {
    const dark = useSelector((state) => state.theme.darkMode);

    if (dark) {
        document.getElementsByTagName('HTML')[0].setAttribute('theme', 'dark');
        document.body.style.backgroundColor = '#18191a';
    } else {
        document.getElementsByTagName('HTML')[0].setAttribute('theme', 'light');
        document.body.style.backgroundColor = '#f2f5f7';
    }

    return (
        <div className="App">
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme={dark ? 'dark' : 'light'}
            />
            <Routes>
                {/* Public route */}
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = route.layout;
                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <PublicRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PublicRoute>
                            }
                        />
                    );
                })}

                <Route path="*" element={<Error />} />

                {/* Private route */}
                {privateRoutes.map((route, index) => {
                    const Page = route.component;

                    let Layout = DefaultLayout;
                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            exact
                            path={route.path}
                            element={
                                <PrivateRoute>
                                    <Layout>
                                        <Page />
                                    </Layout>
                                </PrivateRoute>
                            }
                        ></Route>
                    );
                })}
            </Routes>
        </div>
    );
}

export default App;
