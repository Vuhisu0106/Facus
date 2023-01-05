import classNames from 'classnames/bind';
import { UserName } from '~/components/AccountItem';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ data, onClick, isFollowing = false }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('avatar')} src={data.photoURL} alt={data.displayName} />
            <div className={cx('info')}>
                <UserName userName={data.displayName} size={'medium'} isAdmin={data.isAdmin} />
                {isFollowing && <span className={cx('following')}>Following</span>}
            </div>
        </div>
    );
}

export default AccountItem;
