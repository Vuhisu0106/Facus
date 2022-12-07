import classNames from 'classnames/bind';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useEffect, useState } from 'react';
import { useApp } from '~/context/AppContext';
import { useUI } from '~/context/UIContext';
import AccountItem from './AccountItem';

import styles from './Home.module.scss';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);
function SuggestAccount({ label }) {
    const { currentUser } = useAuth();
    const { checkDark } = useUI();
    const { currentUserInfo } = useApp();
    const [suggestFollowList, setSuggestFollowList] = useState([]);

    useEffect(() => {
        const getSuggestFollowList = async () => {
            const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
            const q = query(collection(db, 'users'), where('uid', 'not-in', a), limit(6));
            try {
                const querySnapshot = await getDocs(q);
                setSuggestFollowList(querySnapshot.docs.map((doc) => doc.data()));
                //setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getSuggestFollowList();
    }, [currentUser, currentUserInfo?.following]);

    return (
        <div className={cx('wrapper', checkDark('dark-suggest-account'))}>
            <div className={cx('label')}>
                <p>{label}</p>
            </div>
            <div className="account-list">
                {suggestFollowList?.map((account) => (
                    <AccountItem
                        key={account?.uid}
                        uid={account?.uid}
                        displayName={account?.displayName}
                        photoURL={account?.photoURL}
                        follower={account?.follower?.length}
                    />
                ))}
            </div>
        </div>
    );
}

export default SuggestAccount;
