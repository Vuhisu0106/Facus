import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';

import styles from '~/layouts/components/Home/Home.module.scss';
import { useAuth } from '~/context/AuthContext';
import { LoadingIcon } from '~/components/Icon';
import { useState } from 'react';
import { follow } from '~/utils/FollowUtils';
import CircleAvatar from '~/components/CircleAvatar';

const cx = classNames.bind(styles);

function AccountItem({ uid, displayName, photoURL, follower, onClick }) {
    const { currentUser } = useAuth();
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            await follow(currentUser.uid, uid);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
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
                <CircleAvatar
                    className={cx('avatar')}
                    userUid={uid}
                    userName={displayName}
                    avatar={photoURL}
                    diameter={'36px'}
                />
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
                <LoadingIcon className={cx('loading-icon')} type={'input'} />
            ) : (
                <button
                    className={cx('follow')}
                    onClick={() => {
                        handleFollow();
                    }}
                >
                    Follow
                </button>
            )}
        </div>
    );
}

export default AccountItem;
