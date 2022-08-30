import Home from '~/pages/Home';
import Upload from '~/pages/Upload';
import LandingPage from '~/pages/LandingPage';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import Post from '~/pages/Post';

import config from '~/configs';
import HeaderOnly from '~/layouts/HeaderOnly';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.upload,
        component: Upload,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.post,
        component: Post,
        layout: HeaderOnly,
    },
    {
        path: config.routes.message,
        component: Message,
    },
    {
        path: config.routes.landing,
        component: LandingPage,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
