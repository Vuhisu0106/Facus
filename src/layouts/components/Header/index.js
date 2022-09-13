import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faCamera, faHome, faMoon, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { useNavigate } from 'react-router-dom';

import styles from './Header.module.scss';
import Input from '~/components/Input';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons';
import config from '~/configs';
import { useState } from 'react';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function Header({ className }) {
    const [error, setError] = useState();
    const { currentUser, logout } = useAuth();
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
            title: currentUser.email,
        },
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: config.routes.profile,
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

                <Tippy
                    interactive
                    trigger="click"
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <Input placeHolder={'Search for creators...'} leftIcon={<FontAwesomeIcon icon={faSearch} />} />
                    </div>
                </Tippy>

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
                            <img
                                className={cx('user-avt')}
                                alt="Vu Minh Hieu"
                                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                            />
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
