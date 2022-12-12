import { faBars, faHome, faRightLong, faRightToBracket, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '~/components/Popper/Menu';
import config from '~/configs';
import { toggleTheme } from '~/features/Theme/ThemeSlice';

import styles from './SmHeaderLanding.module.scss';

const cx = classNames.bind(styles);

function SmHeaderLanding({ className }) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const classes = cx('wrapper', {
        [className]: className,
    });

    const dispatch = useDispatch();
    const dark = useSelector((state) => state.theme.darkMode);

    const changeTheme = () => {
        dispatch(toggleTheme());
        localStorage.setItem('darkMode', String(!dark));
    };

    const onClickOutside = () => {
        setIsMenuVisible(false);
    };

    const HEADER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faHome} />,
            title: 'Home',
            to: config.routes.homepage,
            onClick: () => {
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faRightLong} />,
            title: 'Log in',
            to: config.routes.login,
            onClick: () => {
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faRightToBracket} />,
            title: 'Sign up',
            to: config.routes.signup,
            onClick: () => {
                setIsMenuVisible(false);
            },
        },

        {
            icon: <FontAwesomeIcon icon={faSun} />,
            title: 'Theme',
            onClick: () => {
                changeTheme();
            },
        },
    ];

    return (
        <div className={classes}>
            <div className={cx('sm-btn')}>
                <Menu items={HEADER_MENU} isMenuVisible={isMenuVisible} onClickOutside={onClickOutside}>
                    <button
                        className={cx('popper-btn')}
                        onClick={() => {
                            setIsMenuVisible(!isMenuVisible);
                        }}
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </Menu>
            </div>
        </div>
    );
}

export default SmHeaderLanding;
