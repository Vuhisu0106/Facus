import classNames from 'classnames/bind';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useEffect, useState } from 'react';
import { useApp } from '~/context/AppContext';
import { useUI } from '~/context/UIContext';
import AccountItem from './AccountItem';

import styles from './SuggestAccount.module.scss';

const cx = classNames.bind(styles);
function SuggestAccount({ label }) {
    const { checkDark } = useUI();
    const { currentUserInfo } = useApp();
    const [suggestFollowList, setSuggestFollowList] = useState([]);

    useEffect(() => {
        const getSuggestFollowList = async () => {
            const a = currentUserInfo?.following;
            const q = query(collection(db, 'users'), where('uid', 'not-in', a), limit(6));
            //console.log('suggest follow: ' + currentUserInfo);
            try {
                const querySnapshot = await getDocs(q);
                setSuggestFollowList(querySnapshot.docs.map((doc) => doc.data()));
                //setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        getSuggestFollowList();
    }, [currentUserInfo]);

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
