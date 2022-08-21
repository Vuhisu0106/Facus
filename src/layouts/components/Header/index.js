import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowRightFromBracket,
    faCamera,
    faHome,
    faMoon,
    faPlus,
    faSearch,
    faVideoCamera,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './Header.module.scss';
import Input from '~/components/Input';
import CircleButton from '~/components/Button/CircleButton';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Menu from '~/components/Popper/Menu';
import { faSquarePlus, faUser } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
const MENU_ITEMS_USER = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/acc',
    },
    {
        icon: <FontAwesomeIcon icon={faMoon} />,
        title: 'Dark mode',
    },
    {
        icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
        title: 'Log out',
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

function Header() {
    return (
        <header className={cx('wrapper')}>
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
                        <CircleButton children={<FontAwesomeIcon icon={faHome} />} />
                        <CircleButton children={<FontAwesomeIcon icon={faFacebookMessenger} />} />
                        <Menu items={MENU_ITEMS_ADD} offset={[45, 8]}>
                            <span>
                                <CircleButton children={<FontAwesomeIcon icon={faPlus} />} />
                            </span>
                        </Menu>

                        <Menu items={MENU_ITEMS_USER}>
                            <img
                                className={cx('user-avt')}
                                alt="Vu Minh Hieu"
                                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-1/190902909_816262175957462_3602706991838518816_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DDz0xYBklwAAX8PQmo-&_nc_ht=scontent.fhan17-1.fna&oh=00_AT_1hdnNP4eOTC6mfTe4Dk_kcJwSZQ39eKbVSzO4mXe8LQ&oe=630AD1C5"
                            />
                        </Menu>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
