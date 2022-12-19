import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);
function LoadingChatItem() {
    return (
        <div className={cx('chat-account-item')}>
            <div className={cx('chat-account-info')}>
                <span className={cx('chat-avatar')}></span>
                <div className={cx('chat-info')}>
                    <span className={cx('chat-name')} />
                    <span className={cx('chat-follower')}></span>
                </div>
            </div>
        </div>
    );
}

export default LoadingChatItem;
