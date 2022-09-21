import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data }) {
    return (
        <div className={cx('wrapper')}>
            <img className={cx('avatar')} src={data.photoURL} alt={data.displayName} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.displayName}</span>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </h4>
                <span className={cx('username')}>Following</span>
            </div>
        </div>
    );
}

export default AccountItem;
