import classNames from 'classnames/bind';
import { faChevronLeft, faChevronRight, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';
import styles from './Home.module.scss';
import { useUI } from '~/context/UIContext';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);
function StatusesBar({ data }) {
    const { checkDark } = useUI();
    const { currentUser } = useAuth();
    const statusList = [];
    data.forEach((data) => {
        if (data.status) return statusList.push(data.status);
    });

    return (
        <div className={cx('horizontal-scroll', checkDark())}>
            {/* <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button> */}

            <div className={cx('status-container')}>
                {statusList.length > 0 ? (
                    data?.map(
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
                    )
                ) : (
                    <RoundAccountItem addStatus avt={currentUser.photoURL} />
                )}
            </div>
            {/* <button className={cx('btn-scroll-right')}>{<FontAwesomeIcon icon={faChevronRight} />}</button> */}
        </div>
    );
}

export default StatusesBar;
