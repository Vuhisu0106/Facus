import Message from '~/pages/Chat';
import Profile from '~/pages/Profile';
import Post from '~/pages/Post';
import Dashboard from '~/pages/Dashboard';
import config from '~/configs';
import HeaderOnly from '~/layouts/HeaderOnly';
import SignUp from '~/layouts/components/LandingLayout/SignUp';
import LandingLayout from '~/layouts/LandingLayout';
import HomePage from '~/layouts/components/LandingLayout/HomePage';
import LogIn from '~/layouts/components/LandingLayout/LogIn';
import { ForgetPassword } from '~/layouts/components/LandingLayout';

const publicRoutes = [
    {
        path: config.routes.homepage,
        component: HomePage,
        layout: LandingLayout,
    },
    {
        path: config.routes.signup,
        component: SignUp,
        layout: LandingLayout,
    },
    {
        path: config.routes.login,
        component: LogIn,
        layout: LandingLayout,
    },
    {
        path: config.routes.forgetPassword,
        component: ForgetPassword,
        layout: LandingLayout,
    },
];

const privateRoutes = [
    {
        path: config.routes.dashboard,
        component: Dashboard,
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
