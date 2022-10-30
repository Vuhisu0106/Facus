import classNames from 'classnames/bind';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useEffect, useState } from 'react';
import { useApp } from '~/context/AppContext';
import { useAuth } from '~/context/AuthContext';
import { useUI } from '~/context/UIContext';
import AccountItem from './AccountItem';

import styles from './SuggestAccount.module.scss';

const cx = classNames.bind(styles);
function SuggestAccount({ label }) {
    const { checkDark } = useUI();
    const { currentUserFollowing } = useApp();
    const { currentUser } = useAuth();
    const [suggestFollowList, setSuggestFollowList] = useState([]);

    useEffect(() => {
        const getSuggestFollowList = async () => {
            const q = query(collection(db, 'users'), where('uid', 'not-in', currentUserFollowing), limit(6));
            console.log('suggest follow: ' + currentUserFollowing);
            try {
                const querySnapshot = await getDocs(q);
                setSuggestFollowList(querySnapshot.docs.map((doc) => doc.data()));
                //setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getSuggestFollowList();
    }, [currentUser]);

    return (
        <div className={cx('wrapper', checkDark())}>
            <div className={cx('label')}>
                <p>{label}</p>
            </div>
            <div className="account-list">
                {suggestFollowList?.map((account) => (
                    <AccountItem key={account.uid} displayName={account.displayName} photoURL={account.photoURL} />
                ))}
            </div>
        </div>
    );
}

export default SuggestAccount;
