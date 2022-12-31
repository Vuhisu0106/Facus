import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import { MOBILE, useViewport } from '~/components/Hook';
import config from '~/configs';

import HeaderLanding from '../components/HeaderLanding';
import SmHeaderLanding from '../components/HeaderLanding/SmHeaderLanding';

import styles from './LandingLayout.module.scss';

const cx = classNames.bind(styles);
function LandingLayout({ children }) {
    const { viewport } = useViewport();
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

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

    const handleTurnOffMenu = () => {
        setMobileMenuVisible(false);
    };

    return (
        <div className={cx('wrapper')}>
            {viewport.device === MOBILE ? (
                !mobileMenuVisible && (
                    <SmHeaderLanding
                        className={cx('header')}
                        onClick={() => {
                            setMobileMenuVisible(true);
                        }}
                    />
                )
            ) : (
                <HeaderLanding className={cx('header')} />
            )}
            <div className={cx('container')}>{children}</div>
            {
                <div className={cx('menu', mobileMenuVisible && 'menu__appear')}>
                    <div className={cx('menu__header')}>
                        <div className={cx('sm-btn')}>
                            <button
                                className={cx('popper-btn')}
                                onClick={() => {
                                    setMobileMenuVisible(false);
                                }}
                            >
                                <FontAwesomeIcon icon={faXmark} />
                            </button>
                        </div>
                    </div>
                    <div className={cx('menu__body')}>
                        {NAV_LIST.map((nav) => (
                            <Button key={nav.id} to={nav.to} children={nav.title} onClick={handleTurnOffMenu} />
                        ))}
                    </div>
                </div>
            }
        </div>
    );
}

export default LandingLayout;
