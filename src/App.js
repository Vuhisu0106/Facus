import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Fragment, useState } from 'react';

import { publicRoutes, privateRoutes } from './routes';
import DefaultLayout from './layouts/DefaultLayout';
import LandingPage from './pages/LandingPage';
import LandingLayout from './layouts/components/LandingLayout';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './components/Route/PrivateRoute';
import Dkm from './pages/Dkm';
import Home from './pages/Home';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Upload from './pages/Upload';
import Post from './pages/Post';
import ShareLayout from './layouts/ShareLayout';

function App() {
    const user = true;

    const [error, setError] = useState(null);

    return (
        <div className="App">
            <AuthProvider>
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
            </AuthProvider>
        </div>
    );
}

export default App;
