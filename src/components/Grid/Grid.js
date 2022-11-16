import classNames from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function Grid({ full, wide, profile, chat, type, className, children }) {
    const classes = cx('grid', type, { [className]: className });
    return <div className={classes}>{children}</div>;
}

export default Grid;
