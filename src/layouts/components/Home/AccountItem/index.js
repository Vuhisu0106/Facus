import classNames from 'classnames/bind';

import styles from '~/layouts/components/Home/Home.module.scss';
import { useAuth } from '~/context/AuthContext';
import { LoadingIcon } from '~/components/Icon';
import { useState } from 'react';
import { follow } from '~/utils/FollowUtils';
import { UserAvatar, UserName } from '~/components/AccountItem';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function AccountItem({ uid, displayName, photoURL, follower, isAdmin }) {
    const { currentUser } = useAuth();

    const [loading, setLoading] = useState(false);

    const handleFollow = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            await follow(currentUser.uid, uid);
            toast.success(`Follow ${displayName} successfully`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div className={cx('account-item')}>
            <div className={cx('account-info')}>
                <UserAvatar
                    className={cx('avatar')}
                    userUid={uid}
                    userName={displayName}
                    avatar={photoURL}
                    diameter={'36px'}
                />
                <div className={cx('info')}>
                    <UserName userUid={uid} userName={displayName} size={'medium'} isAdmin={isAdmin} />
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
