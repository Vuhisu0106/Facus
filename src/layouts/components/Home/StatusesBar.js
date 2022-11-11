import classNames from 'classnames/bind';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';
import styles from './Home.module.scss';
import { useUI } from '~/context/UIContext';

const cx = classNames.bind(styles);
function StatusesBar({ data }) {
    const { checkDark } = useUI();
    return (
        <div className={cx('horizontal-scroll', checkDark())}>
            <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button>
            <div className={cx('status-container')}>
                {data?.map(
                    (list) =>
                        list.status && (
                            <RoundAccountItem
                                key={list.uid}
                                avt={list.photoURL}
                                userName={list.displayName}
                                status={list.status}
                            />
                        ),
                )}
            </div>
            <button className={cx('btn-scroll-right')}>{<FontAwesomeIcon icon={faChevronRight} />}</button>
        </div>
    );
}

export default StatusesBar;
