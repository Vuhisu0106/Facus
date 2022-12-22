import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import PrivateRoute from './components/Route/PrivateRoute';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [error, setError] = useState(null);
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
                {publicRoutes.map((route, index) => {
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
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}

                {/* <Route element={<LandingPage />}>
                    <Route path="/" exact element={<HomePage />} />
                    <Route path="/log-in" element={<LogIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                </Route> */}

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

                {/* <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <DefaultLayout></DefaultLayout>
                            </PrivateRoute>
                        }
                    /> */}

                {/* <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <DefaultLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route
                            // @ts-ignore
                            index
                            path="/"
                            element={<Home />}
                        />
                        <Route path="/messenger" element={<Message />} />
                        <Route path="/upload" element={<Upload />} />
                        <Route path="/post" element={<Post />} />
                        <Route path="/@:nickname" element={<Profile />} />
                    </Route>
                    <Route path="/landing" element={<LandingPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
