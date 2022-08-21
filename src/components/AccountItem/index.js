import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-1/190902909_816262175957462_3602706991838518816_n.jpg?stp=cp0_dst-jpg_p40x40&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DDz0xYBklwAAX8PQmo-&_nc_ht=scontent.fhan17-1.fna&oh=00_AT_1hdnNP4eOTC6mfTe4Dk_kcJwSZQ39eKbVSzO4mXe8LQ&oe=630AD1C5"
                alt="Hieu"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Vu Hieu</span>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </h4>
                <span className={cx('username')}>Following</span>
            </div>
        </div>
    );
}

export default AccountItem;
