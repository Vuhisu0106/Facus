import classNames from 'classnames/bind';
import styles from '~/components/Loading/Loading.module.scss';

const cx = classNames.bind(styles);

function LoadingRoundAccItem() {
    return (
        <div className={cx('round-wrapper')}>
            <div className={cx('round-user-avt')}>
                <span className={cx('round-story-circle')}></span>
            </div>
            <span className={cx('round-user-name')}></span>
        </div>
    );
}

export default LoadingRoundAccItem;
