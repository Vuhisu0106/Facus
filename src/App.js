import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import PrivateRoute from './components/Route/PrivateRoute';
import PublicRoute from './components/Route/PublicRoute';
import LandingPage from './pages/LandingPage';
import HomePage from './layouts/components/LandingLayout/HomePage';
import LogIn from './layouts/components/LandingLayout/LogIn';
import SignUp from './layouts/components/LandingLayout/SignUp';

function App() {
    const [error, setError] = useState(null);

    return (
        <div className="App">
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
