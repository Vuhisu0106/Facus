import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);

function LoadingFollowAccItem() {
    return (
        <div className={cx('follow-account')}>
            <span className={cx('follow-account-avt')} />
            <div className={cx('follow-account-info')}>
                <span className={cx('follow-account-name')}></span>
                <span className={cx('follow-account-bio')}></span>
            </div>
        </div>
    );
}

export default LoadingFollowAccItem;
