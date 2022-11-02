import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faHome, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/configs';
import { useRef, useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import AccountSearch from '~/components/Search/AccountSearch';
import { useUser } from '~/context/UserContext';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Button from '~/components/Button';
import { useUI } from '~/context/UIContext';
import Menu from '~/components/Popper/Menu';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const avtRef = useRef();

    const { currentUser, logout } = useAuth();
    const { dispatch, addToLocalStorage } = useUser();
    const { darkModeState, toggleTheme, dark, checkDark } = useUI();
    const navigate = useNavigate();

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

    const MENU_ITEMS_USER = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            onClick: async () => {
                await dispatch({ type: 'SELECT_USER', payload: currentUser });
                navigate(`/user/${currentUser.uid}`);
                addToLocalStorage('selectUser', currentUser.uid);
                setIsMenuVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            onClick: () => {
                handleLogout();
            },
        },
    ];

    // const MENU_ITEMS_ADD = [
    //     {
    //         icon: <FontAwesomeIcon icon={faSquarePlus} />,
    //         title: 'Post',
    //         onClick: () => {
    //             setIsAddPostVisible(true);
    //             setAddPhotoVisible(true);
    //             setButtonActive(true);
    //         },
    //     },
    //     {
    //         icon: <FontAwesomeIcon icon={faCamera} />,
    //         title: 'Story',
    //     },
    // ];

    const classes = cx('wrapper', checkDark(), {
        [className]: className,
    });

    return (
        <div className={classes}>
            <Grid wide>
                <GridRow className={cx('inner-wrapper')}>
                    <GridColumn l={3.25} m={3} s={2} className={cx('logo')}>
                        facus
                    </GridColumn>

                    <GridColumn l={5.5} m={6} s={6}>
                        <AccountSearch
                            className={cx('search')}
                            placeHolder={'Search Facus...'}
                            leftIcon={<FontAwesomeIcon icon={faSearch} />}
                        />
                    </GridColumn>

                    <GridColumn l={3.25} m={3} s={4} className={cx('actions')}>
                        <div className={cx('actions-btn')}>
                            <CircleButton to={config.routes.home} children={<FontAwesomeIcon icon={faHome} />} />
                            <CircleButton
                                to={config.routes.message}
                                children={<FontAwesomeIcon icon={faFacebookMessenger} />}
                            />

                            <CircleButton
                                children={dark ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}
                                onClick={() => {
                                    toggleTheme();
                                    console.log('darkModeState: ' + darkModeState);
                                }}
                            />

                            <Menu items={MENU_ITEMS_USER} isMenuVisible={isMenuVisible} onClickOutside={onClickOutside}>
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
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Header;
