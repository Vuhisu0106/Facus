import classNames from 'classnames/bind';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { where, collection, query, getDocs } from 'firebase/firestore';

import { db } from '~/firebase/config';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';
import styles from './Home.module.scss';

import { useAuth } from '~/context/AuthContext';
import { useApp } from '~/context/AppContext';
import { LoadingRoundAccItem } from '~/components/Loading';

const cx = classNames.bind(styles);
function StatusesBar({ followingList }) {
    const { currentUser } = useAuth();
    const { currentUserInfo } = useApp();

    const [statusFollowingList, setStatusFollowingList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        // const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
        // console.log(a);
        // const q = query(collection(db, 'users'), where('uid', 'in', a));
        // const getStatus = onSnapshot(q, (querySnapshot) => {
        //     const statuses = [];
        //     querySnapshot.forEach((doc) => {
        //         statuses.push(doc.data());
        //     });
        //     setStatusFollowingList(statuses);
        //     setLoading(false);
        // });

        // return getStatus;

        const getStatus = async () => {
            //const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
            const q = query(collection(db, 'users'), where('uid', 'in', followingList));
            try {
                const querySnapshot = await getDocs(q);
                const statuses = [];
                querySnapshot.forEach((doc) => {
                    statuses.push({ ...doc.data() });
                });
                setStatusFollowingList([...statuses]);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        followingList.length > 0 && getStatus();
    }, [followingList]);

    return (
        <div className={cx('horizontal-scroll')}>
            <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button>
            {loading ? (
                <div className={cx('loading-status-container')}>
                    {Array(10)
                        .fill(0)
                        .map((item, index) => (
                            <LoadingRoundAccItem key={index} />
                        ))}
                </div>
            ) : (
                <div className={cx('status-container')}>
                    {/* Check if current user having status, add status button will not be shown */}
                    {!statusFollowingList?.find((list) => list.uid === currentUser.uid)?.status && (
                        <RoundAccountItem addStatus avt={currentUserInfo.photoURL} />
                    )}

                    {statusFollowingList?.map(
                        (list) =>
                            list.status && (
                                <RoundAccountItem
                                    key={list.uid}
                                    avt={list.photoURL}
                                    userName={list.displayName}
                                    status={list.status}
                                    statusIcon={list.status.icon}
                                />
                            ),
                    )}
                </div>
            )}
            <button className={cx('btn-scroll-right')}>{<FontAwesomeIcon icon={faChevronRight} />}</button>
        </div>
    );
}

export default StatusesBar;
