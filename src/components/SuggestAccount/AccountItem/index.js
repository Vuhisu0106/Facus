import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from '~/components/SuggestAccount/SuggestAccount.module.scss';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);

function AccountItem({ data, uid, displayName, photoURL, follower, onClick }) {
    const { currentUser } = useAuth();
    let navigate = useNavigate();

    return (
        <div className={cx('account-item')}>
            <div
                className={cx('account-info')}
                onClick={() => {
                    navigate(`/user/${uid}`);
                }}
            >
                <img className={cx('avatar')} src={photoURL} alt="Vũ Hiếu" />
                <div className={cx('info')}>
                    <h4 className={cx('name')}>
                        <span>{displayName}</span>
                        {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                    </h4>
                    <span className={cx('username')}>
                        {follower ? (follower < 2 ? follower + ' follower' : follower + ' followers') : '0 follower'}
                    </span>
                </div>
            </div>
            <button className={cx('follow')}> Follow </button>
        </div>
    );
}

export default AccountItem;
