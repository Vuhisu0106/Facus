import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CircleAvatar.module.scss';

const cx = classNames.bind(styles);
function CircleAvatar({ className, userUid, userName, avatar, diameter }) {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const classes = cx('user-avt', {
        [className]: className,
    });
    return (
        <>
            {loading ? null : <div className={cx('user-avt--loading')} style={{ height: diameter, width: diameter }} />}
            <img
                className={classes}
                alt={userName}
                src={avatar}
                style={{ display: loading ? 'block' : 'none', height: diameter, width: diameter }}
                onClick={() => {
                    navigate(`/user/${userUid}`);
                }}
                onLoad={() => {
                    setLoading(true);
                }}
            />
        </>
    );
}

export default CircleAvatar;
