import classNames from 'classnames/bind';

import styles from './CircleAvatar.module.scss';

const cx = classNames.bind(styles);
function CircleAvatar({ className, userName, avatar, diameter }) {
    const classes = cx('user-avt', {
        [className]: className,
    });
    return (
        <img
            className={classes}
            alt={userName}
            src={avatar}
            style={{ height: diameter, width: diameter }}
            onClick={() => {}}
        />
    );
}

export default CircleAvatar;
