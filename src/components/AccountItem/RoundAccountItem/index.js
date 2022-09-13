import classNames from 'classnames/bind';

import styles from './RoundAccountItem.module.scss';
const cx = classNames.bind(styles);
function RoundAccountItem({ userName, avt, happy, sad, sleepy }) {
    const badgeClasses = cx('badge', {
        [classNames]: classNames,
        happy,
        sad,
        sleepy,
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('user-avt')}>
                <div className={cx('story-circle')}>
                    <img className={cx('user-img')} alt={userName} src={avt} />
                </div>
                <span className={badgeClasses}></span>
            </div>
            <span className={cx('user-name')}>{userName}</span>
        </div>
    );
}

export default RoundAccountItem;
