import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import styles from './Header.module.scss';
import Input from '~/components/Input';
import CircleButton from '~/components/Button/CircleButton';

const cx = classNames.bind(styles);

function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner-wrapper')}>
                <div className={cx('logo')}>facus</div>

                <Input
                    className={cx('search')}
                    placeHolder={'Search for cretors...'}
                    leftIcon={<FontAwesomeIcon icon={faSearch} />}
                />

                <div className={cx('actions')}>
                    <div className={cx('actions-btn')}>
                        <CircleButton children={<FontAwesomeIcon icon={faPlusSquare} />} />
                        <CircleButton children={<FontAwesomeIcon icon={faVideoCamera} />} />
                        <img
                            className={cx('user-avt')}
                            alt="Vu Minh Hieu"
                            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-1/190902909_816262175957462_3602706991838518816_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DDz0xYBklwAAX8PQmo-&_nc_ht=scontent.fhan17-1.fna&oh=00_AT_1hdnNP4eOTC6mfTe4Dk_kcJwSZQ39eKbVSzO4mXe8LQ&oe=630AD1C5"
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
