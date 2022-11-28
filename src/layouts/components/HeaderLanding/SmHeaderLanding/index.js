import { faBars, faHome, faRightLong, faRightToBracket, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import Menu from '~/components/Popper/Menu';
import config from '~/configs';
import { useUI } from '~/context/UIContext';

import styles from './SmHeaderLanding.module.scss';

const cx = classNames.bind(styles);

function SmHeaderLanding({ className }) {
    const { checkDark, toggleTheme, dark } = useUI();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const classes = cx('wrapper', checkDark(), {
        [className]: className,
    });

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
                toggleTheme();
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
