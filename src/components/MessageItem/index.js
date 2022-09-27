import classNames from 'classnames/bind';

import styles from './MessageItem.module.scss';

const cx = classNames.bind(styles);
function MessageItem({ userAvt, userName, closestMess, unreadMessCount, closestMessTime, onClick }) {
    return (
        <div className={cx('wrapper')} onClick={onClick}>
            <img className={cx('user-avt')} alt={userName} src={userAvt} />

            <div className={cx('message-content')}>
                <div className={cx('mess-detail')}>
                    <div className={cx('mess-top-content')}>
                        <h4 className={cx('user-name')}>{userName}</h4>
                        <span className={cx('closest-mess-time')}>{closestMessTime}</span>
                    </div>

                    <div className={cx('mess-bottom-content')}>
                        <span className={cx('closest-mess')}>{closestMess}</span>
                        <span className={cx('unread-count')}>{unreadMessCount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessageItem;
