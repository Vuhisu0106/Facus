import Home from '~/pages/Home';
import LandingPage from '~/pages/LandingPage';
import Message from '~/pages/Message';
import Profile from '~/pages/Profile';
import Post from '~/pages/Post';

import config from '~/configs';
import HeaderOnly from '~/layouts/HeaderOnly';

const publicRoutes = [
    {
        path: config.routes.landing,
        component: LandingPage,
        layout: null,
    },
];

const privateRoutes = [
    {
        path: config.routes.home,
        component: Home,
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
];

export { publicRoutes, privateRoutes };
