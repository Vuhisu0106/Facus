import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCamera, faHome, faMoon, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/configs';
import { useState } from 'react';
import { useAuth } from '~/context/AuthContext';
import AccountSearch from '~/components/Search/AccountSearch';
import { useUser } from '~/context/UserContext';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
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
                addToLocalStorage(currentUser.uid);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faMoon} />,
            title: 'Dark mode',
        },
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            onClick: () => {
                handleLogout();
            },
        },
    ];

    const MENU_ITEMS_ADD = [
        {
            icon: <FontAwesomeIcon icon={faSquarePlus} />,
            title: 'Post',
        },
        {
            icon: <FontAwesomeIcon icon={faCamera} />,
            title: 'Story',
        },
    ];

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
                        <Menu items={MENU_ITEMS_ADD} offset={[45, 8]}>
                            <span>
                                <CircleButton children={<FontAwesomeIcon icon={faPlus} />} />
                            </span>
                        </Menu>

                        <Menu items={MENU_ITEMS_USER}>
                            <img className={cx('user-avt')} alt="Vu Minh Hieu" src={currentUser.photoURL} />
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
