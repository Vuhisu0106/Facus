import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';

import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/Route/PrivateRoute';

function App() {
    const user = true;

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
