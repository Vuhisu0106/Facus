import classNames from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function Grid({ full, wide, profile, chat, className, children }) {
    const classes = cx('grid', wide && 'wide', profile && 'profile', chat && 'chat', { [className]: className });
    return <div className={classes}>{children}</div>;
}

export default Grid;
