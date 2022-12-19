import classNames from 'classnames/bind';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data, onClick, isFollowing = false }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('avatar')} src={data.photoURL} alt={data.displayName} />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>{data.displayName}</span>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </h4>
                {isFollowing && <span className={cx('following')}>Following</span>}
            </div>
        </div>
    );
}

export default AccountItem;
