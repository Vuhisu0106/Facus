import classNames from 'classnames/bind';

import styles from '~/components/SuggestAccount/SuggestAccount.module.scss';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function AccountItem({ data, displayName, photoURL, onClick }) {
    const { currentUser } = useAuth();
    return (
        <div className={cx('account-item')}>
            <div className={cx('account-info')}>
                <img className={cx('avatar')} src={photoURL} alt="Vũ Hiếu" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{displayName}</span>
                        {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                    </h4>
                    <span className={cx('username')}>Following</span>
                </div>
            </div>
            <button className={cx('follow')}>Follow</button>
        </div>
    );
}

export default AccountItem;
