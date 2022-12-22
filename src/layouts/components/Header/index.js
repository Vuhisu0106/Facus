import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faHome, faMoon, faSearch, faSun, faUser } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookF, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import config from '~/configs';
import { useRef, useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import AccountSearch from '~/components/Search/AccountSearch';

import Menu from '~/components/Popper/Menu';
import { useViewport } from '~/components/Hook';
import { useApp } from '~/context/AppContext';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '~/features/Theme/ThemeSlice';
import { MOBILE } from '~/components/Hook/useViewport';
import { useChatNoti } from '~/context/ChatNotiContext';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [avatarLoad, setAvatarLoad] = useState(false);
    const avtRef = useRef();

    const { currentUser, logout } = useAuth();
    const { currentUserInfo } = useApp();
    const navigate = useNavigate();
    const { viewport } = useViewport();

    const dark = useSelector((state) => state.theme.darkMode);
    const { isHaveChatNoti } = useChatNoti();

    const dispatch = useDispatch();

    async function handleLogout() {
        setError('');
        try {
            await logout();
            navigate('/home');
        } catch {
            setError('Failed to log out');
        }
    }

    const onClickOutside = () => {
        setIsMenuVisible(false);
    };

    const changeTheme = () => {
        dispatch(toggleTheme());
        localStorage.setItem('darkMode', String(!dark));
    };

    const HEADER_MENU = [
        {
            icon: <FontAwesomeIcon icon={faUserRegular} />,
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
            to: config.routes.dashboard,
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
                changeTheme();
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

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <Grid type={'wide'} className={cx('inner-wrapper')}>
                <GridRow>
                    <GridColumn l={3.25} m={2} s={2}>
                        <Link className={cx('logo')} to={config.routes.dashboard}>
                            {viewport.device === MOBILE ? (
                                <CircleButton children={<FontAwesomeIcon icon={faFacebookF} />} />
                            ) : (
                                <h4>Facus</h4>
                            )}
                        </Link>
                    </GridColumn>

                    <GridColumn l={5.5} m={7} s={8}>
                        <AccountSearch
                            className={cx('search')}
                            placeHolder={'Search Facus...'}
                            leftIcon={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </GridColumn>

                    <GridColumn l={3.25} m={3} s={2} className={cx('actions')}>
                        {viewport.device === MOBILE ? (
                            <div className={cx('actions-btn')}>
                                {avatarLoad ? null : <div className={cx('user-avt--loading')} />}
                                <Menu
                                    items={SMALL_VIEWPORT_HEADER_MENU}
                                    isMenuVisible={isMenuVisible}
                                    onClickOutside={onClickOutside}
                                >
                                    <img
                                        className={cx('user-avt')}
                                        alt={currentUserInfo?.displayName}
                                        src={currentUserInfo?.photoURL}
                                        style={avatarLoad ? {} : { display: 'none' }}
                                        ref={avtRef}
                                        onClick={() => {
                                            setIsMenuVisible(!isMenuVisible);
                                        }}
                                        onLoad={() => {
                                            setAvatarLoad(true);
                                        }}
                                    />
                                </Menu>
                            </div>
                        ) : (
                            <div className={cx('actions-btn')}>
                                <CircleButton
                                    to={config.routes.dashboard}
                                    children={<FontAwesomeIcon icon={faHome} />}
                                />
                                <CircleButton
                                    to={config.routes.message}
                                    children={<FontAwesomeIcon icon={faFacebookMessenger} />}
                                    notified={isHaveChatNoti ? true : false}
                                />

                                <CircleButton
                                    children={
                                        dark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />
                                    }
                                    onClick={() => {
                                        changeTheme();
                                    }}
                                />
                                {avatarLoad ? null : <div className={cx('user-avt--loading')} />}
                                <Menu items={HEADER_MENU} isMenuVisible={isMenuVisible} onClickOutside={onClickOutside}>
                                    <img
                                        className={cx('user-avt')}
                                        alt={currentUserInfo?.displayName}
                                        src={currentUserInfo?.photoURL}
                                        style={avatarLoad ? {} : { display: 'none' }}
                                        ref={avtRef}
                                        onClick={() => {
                                            setIsMenuVisible(!isMenuVisible);
                                        }}
                                        onLoad={() => {
                                            setAvatarLoad(true);
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
