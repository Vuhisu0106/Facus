import classNames from 'classnames/bind';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

import { db } from '~/firebase/config';
import { useEffect, useState } from 'react';

import AccountItem from './AccountItem';

import styles from './Home.module.scss';

import LoadingAccountItem from '~/components/Loading/LoadingAccountItem';

const cx = classNames.bind(styles);
function SuggestAccount({ label, followingList }) {
    const [suggestFollowList, setSuggestFollowList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getSuggestFollowList = async () => {
            const q = query(collection(db, 'users'), where('uid', 'not-in', followingList), limit(7));
            try {
                const querySnapshot = await getDocs(q);
                setSuggestFollowList(querySnapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };
        followingList.length > 0 && getSuggestFollowList();
    }, [followingList]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('label')}>
                <p>{label}</p>
            </div>
            <div className="account-list">
                {loading
                    ? Array(6)
                          .fill(0)
                          .map((item, index) => <LoadingAccountItem key={index} />)
                    : suggestFollowList?.map((account) => (
                          <AccountItem
                              key={account?.uid}
                              uid={account?.uid}
                              displayName={account?.displayName}
                              photoURL={account?.photoURL}
                              follower={account?.follower?.length}
                              isAdmin={account?.isAdmin}
                          />
                      ))}
            </div>
        </div>
    );
}

export default SuggestAccount;
