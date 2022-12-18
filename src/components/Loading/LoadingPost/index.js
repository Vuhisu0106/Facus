import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);

function LoadingPost() {
    return (
        <div className={cx('post-wrapper')}>
            <div className={cx('post-header')}>
                <div className={cx('post-user-avt')} />
                <div className={cx('post-header-info')}>
                    <div className={cx('post-user-name')} />
                    <div className={cx('time-post')} />
                </div>
            </div>
            <div className={cx('post-content')}>
                <div className={cx('post-caption')}></div>
                <div className={cx('post-image')}></div>
            </div>
            <div className={cx('post-interaction')}>
                <div className={cx('post-reaction')}></div>
                <div className={cx('post-comment')}></div>
            </div>
        </div>
    );
}

export default LoadingPost;
