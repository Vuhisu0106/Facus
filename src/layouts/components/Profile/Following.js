import classNames from 'classnames/bind';
import { useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/firebase';
import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';
import { useState } from 'react';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function Following() {
    const [followingList, setFollowingList] = useState();
    var selectUser = localStorage.getItem('selectUser');

    const { checkDark } = useApp();

    useEffect(() => {
        const getFollowingList = () => {
            const unsub = onSnapshot(doc(db, 'following', selectUser), (doc) => {
                setFollowingList(doc.data());
            });

            return () => {
                unsub();
            };
        };

        selectUser && getFollowingList();
    }, [selectUser]);

    return (
        <WrapperModal className={cx('following', checkDark())}>
            <h2>Following</h2>
            {followingList &&
                Object.entries(followingList).map((following) => (
                    <div key={following[0]} className={cx('account')}>
                        <img
                            className={cx('account-avt')}
                            alt={following[1].userInfo.displayName}
                            src={following[1].userInfo.photoURL}
                        />
                        <div className={cx('account-info')}>
                            <h1 className={cx('account-name')}>{following[1].userInfo.displayName}</h1>
                            <span className={cx('account-bio')}>Hello World</span>
                        </div>
                    </div>
                ))}
        </WrapperModal>
    );
}

export default Following;
