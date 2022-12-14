import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);

function LoadingPost() {
    return (
        <div className={cx('post-wrapper')}>
            <div className={cx('post__header')}>
                <div className={cx('post-user-avt')} />
                <div className={cx('post__header-info')}>
                    <div className={cx('post-user-name')} />
                    <div className={cx('time-post')} />
                </div>
            </div>

            <div className={cx('post__interaction')}>
                <div className={cx('post-reaction__wrapper')}>
                    <div className={cx('post-reaction')}></div>
                </div>
                <div className={cx('post-comment__wrapper')}>
                    <div className={cx('post-comment')}></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingPost;
