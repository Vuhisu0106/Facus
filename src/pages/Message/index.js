import classNames from 'classnames/bind';
import Input from '~/components/Input';

import styles from './Message.module.scss';

const cx = classNames.bind(styles);
function Message() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('sidebar')}>
                    <Input className={cx('search')} />
                    <div className={cx('friend-avt')}></div>
                    <div className={cx('message-list')}></div>
                </div>
                <div className={cx('content')}>Its content</div>
            </div>
        </div>
    );
}

export default Message;
