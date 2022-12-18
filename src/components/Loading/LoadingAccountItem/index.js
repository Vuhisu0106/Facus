import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);
function LoadingAccountItem() {
    return (
        <div className={cx('account-item')}>
            <div className={cx('account-info')}>
                <span className={cx('avatar')}></span>
                <div className={cx('info')}>
                    <span className={cx('name')} />
                    <span className={cx('follower')}></span>
                </div>
            </div>
        </div>
    );
}

export default LoadingAccountItem;
