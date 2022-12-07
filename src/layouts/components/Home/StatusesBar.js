import classNames from 'classnames/bind';
import { faChevronLeft, faChevronRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { onSnapshot, where, collection, query, deleteField, getDocs } from 'firebase/firestore';

import { db } from '~/firebase/config';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';
import styles from './Home.module.scss';
import { useUI } from '~/context/UIContext';
import { useAuth } from '~/context/AuthContext';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function StatusesBar({ listFollowingUid }) {
    const { checkDark } = useUI();
    const { currentUser } = useAuth();
    const { currentUserInfo } = useApp();

    const [statusFollowingList, setStatusFollowingList] = useState([]);
    const [loading, setLoading] = useState(false);

    // const statusList = [];
    // data.forEach((data) => {
    //     if (data.status) return statusList.push(data.status);
    // });

    useEffect(() => {
        setLoading(true);
        const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
        const q = query(collection(db, 'users'), where('uid', 'in', a));
        const getStatus = onSnapshot(q, (querySnapshot) => {
            const statuses = [];
            querySnapshot.forEach((doc) => {
                statuses.push(doc.data());
            });
            setStatusFollowingList(statuses);
            setLoading(false);
        });

        return getStatus;
    }, [currentUser, currentUserInfo?.following]);

    return (
        <div className={cx('horizontal-scroll', checkDark())}>
            {/* <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button> */}
            {loading ? (
                <h2>Loading</h2>
            ) : (
                <div className={cx('status-container')}>
                    {/* Check if current user having status, add status button will not be shown */}
                    {!statusFollowingList?.find((list) => list.uid === currentUser.uid)?.status && (
                        <RoundAccountItem addStatus avt={currentUser.photoURL} />
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
            {/* <button className={cx('btn-scroll-right')}>{<FontAwesomeIcon icon={faChevronRight} />}</button> */}
        </div>
    );
}

export default StatusesBar;
