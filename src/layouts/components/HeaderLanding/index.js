import classNames from 'classnames/bind';
import Button from '~/components/Button';
import config from '~/configs';

import styles from './HeaderLanding.module.scss';

const cx = classNames.bind(styles);

function HeaderLanding({ className }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    const NAV_LIST = [
        {
            id: 'home',
            title: 'Home',
            to: config.routes.homepage,
        },
        {
            id: 'log-in',
            title: 'Log in',
            to: config.routes.login,
        },
        {
            id: 'sign-up',
            title: 'Sign up',
            to: config.routes.signup,
        },
    ];
    return (
        <div className={classes}>
            <span className={cx('title')}>Facus</span>
            <div className={cx('btn')}>
                {NAV_LIST.map((nav) => (
                    <Button
                        key={nav.id}
                        to={nav.to}
                        children={nav.title}
                        landingNav
                        activeLandingNav={window.location.pathname.split('/')[1] === nav.id ? true : false}
                    />
                ))}
            </div>
        </div>
    );
}

export default HeaderLanding;
