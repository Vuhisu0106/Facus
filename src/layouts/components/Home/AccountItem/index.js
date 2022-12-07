import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from '~/layouts/components/Home/Home.module.scss';
import { useAuth } from '~/context/AuthContext';
import { LoadingIcon } from '~/components/Icon';
import { useState } from 'react';
import { follow } from '~/utils/FollowUtils';

const cx = classNames.bind(styles);

function AccountItem({ uid, displayName, photoURL, follower, onClick }) {
    const { currentUser } = useAuth();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        try {
            await follow(currentUser.uid, uid);
        } catch (error) {
            console.log(error);
        }
    };

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
                    <span className={cx('follower')}>
                        {follower ? (follower < 2 ? follower + ' follower' : follower + ' followers') : '0 follower'}
                    </span>
                </div>
            </div>
            {loading ? (
                <LoadingIcon />
            ) : (
                <button
                    className={cx('follow')}
                    onClick={() => {
                        handleFollow();
                        console.log(typeof uid);
                    }}
                >
                    Follow
                </button>
            )}
        </div>
    );
}

export default AccountItem;
