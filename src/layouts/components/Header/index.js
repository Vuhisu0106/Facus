import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCamera, faHome, faMoon, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
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
import { useApp } from '~/context/AppContext';
import { tippy } from '@tippyjs/react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import MenuItem from '~/components/Popper/Menu/MenuItem';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const avtRef = useRef();

    const { currentUser, logout } = useAuth();
    const { dispatch, addToLocalStorage } = useUser();
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

    const handleHideMenu = () => {
        setIsMenuVisible(false);
    };

    const MENU_ITEMS_USER = [
        {
            title: currentUser.displayName,
        },
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
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark mode',
            onClick: () => {
                tippy(avtRef.current).hide(200);
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

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <header className={classes}>
            <div className={cx('inner-wrapper')}>
                <div className={cx('logo')}>facus</div>

                <AccountSearch
                    className={cx('search')}
                    placeHolder={'Search Facus...'}
                    leftIcon={<FontAwesomeIcon icon={faSearch} />}
                />

                <div className={cx('actions')}>
                    <div className={cx('actions-btn')}>
                        <CircleButton to={config.routes.home} children={<FontAwesomeIcon icon={faHome} />} />
                        <CircleButton
                            to={config.routes.message}
                            children={<FontAwesomeIcon icon={faFacebookMessenger} />}
                        />

                        <CircleButton children={<FontAwesomeIcon icon={faPlus} />} />

                        <Tippy
                            interactive
                            //trigger="click"
                            placement="bottom-end"
                            visible={isMenuVisible}
                            onClickOutside={handleHideMenu}
                            //offset={offset}
                            render={(attrs) => (
                                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper className={cx('menu-popper')}>
                                        <div className={cx('menu-body')}>
                                            {MENU_ITEMS_USER.map((item, index) => (
                                                <Button
                                                    key={index}
                                                    className={cx('menu-item-btn')}
                                                    data={item}
                                                    leftIcon={item.icon}
                                                    to={item.to}
                                                    onClick={item.onClick}
                                                >
                                                    {item.title}
                                                </Button>
                                            ))}
                                        </div>
                                    </PopperWrapper>
                                </div>
                            )}
                        >
                            <img
                                className={cx('user-avt')}
                                alt="Vu Minh Hieu"
                                src={currentUser.photoURL}
                                ref={avtRef}
                                onClick={() => {
                                    setIsMenuVisible(true);
                                }}
                            />
                        </Tippy>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
