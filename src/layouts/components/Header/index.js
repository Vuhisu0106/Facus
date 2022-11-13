import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faHome, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import styles from './Header.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookF, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/configs';
import { useRef, useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import AccountSearch from '~/components/Search/AccountSearch';
import { useUI } from '~/context/UIContext';
import Menu from '~/components/Popper/Menu';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';
import { useViewport } from '~/components/Hook';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const avtRef = useRef();

    const { currentUser, logout } = useAuth();
    const { darkModeState, toggleTheme, dark, checkDark } = useUI();
    const navigate = useNavigate();
    const viewPort = useViewport();
    const isSmall = viewPort.width <= 740;

    async function handleLogout() {
        setError('');

        try {
            await logout();
            navigate('/landing');
        } catch {
            setError('Failed to log out');
        }
    }

    const onClickOutside = () => {
        setIsMenuVisible(false);
    };

    const HEADER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            onClick: () => {
                navigate(`/user/${currentUser.uid}`);
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            onClick: () => {
                if (window.confirm('Do you want to log out?')) {
                    handleLogout();
                }
            },
            separate: true,
        },
    ];

    const SMALL_VIEWPORT_HEADER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faHome} />,
            title: 'Home',
            to: config.routes.home,
            onClick: () => {
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            onClick: () => {
                navigate(`/user/${currentUser.uid}`);
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faFacebookMessenger} />,
            title: 'Message',
            to: config.routes.message,
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
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            onClick: () => {
                if (window.confirm('Do you want to log out?')) {
                    handleLogout();
                }
            },
            separate: true,
        },
    ];

    const classes = cx('wrapper', checkDark(), {
        [className]: className,
    });

    return (
        <div className={classes}>
            <Grid wide className={cx('inner-wrapper')}>
                <GridRow>
                    <GridColumn l={3.25} m={2} s={2} className={cx('logo')}>
                        {isSmall ? <CircleButton children={<FontAwesomeIcon icon={faFacebookF} />} /> : <h4>facus</h4>}
                    </GridColumn>

                    <GridColumn l={5.5} m={7} s={8}>
                        <AccountSearch
                            className={cx('search')}
                            placeHolder={'Search Facus...'}
                            leftIcon={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </GridColumn>

                    <GridColumn l={3.25} m={3} s={2} className={cx('actions')}>
                        {isSmall ? (
                            <div className={cx('actions-btn')}>
                                <Menu
                                    items={SMALL_VIEWPORT_HEADER_MENU}
                                    isMenuVisible={isMenuVisible}
                                    onClickOutside={onClickOutside}
                                >
                                    <img
                                        className={cx('user-avt')}
                                        alt="Vu Minh Hieu"
                                        src={currentUser.photoURL}
                                        ref={avtRef}
                                        onClick={() => {
                                            setIsMenuVisible(!isMenuVisible);
                                        }}
                                    />
                                </Menu>
                            </div>
                        ) : (
                            <div className={cx('actions-btn')}>
                                <CircleButton to={config.routes.home} children={<FontAwesomeIcon icon={faHome} />} />
                                <CircleButton
                                    to={config.routes.message}
                                    children={<FontAwesomeIcon icon={faFacebookMessenger} />}
                                />

                                <CircleButton
                                    children={
                                        dark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />
                                    }
                                    onClick={() => {
                                        toggleTheme();
                                    }}
                                />

                                <Menu items={HEADER_MENU} isMenuVisible={isMenuVisible} onClickOutside={onClickOutside}>
                                    <img
                                        className={cx('user-avt')}
                                        alt="Vu Minh Hieu"
                                        src={currentUser.photoURL}
                                        ref={avtRef}
                                        onClick={() => {
                                            setIsMenuVisible(!isMenuVisible);
                                        }}
                                    />
                                </Menu>
                            </div>
                        )}
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Header;
