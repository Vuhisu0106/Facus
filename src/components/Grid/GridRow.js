import classNames from 'classnames/bind';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function GridRow({ noGutters, className, children }) {
    const classes = cx('row', noGutters && 'no-gutters', { [className]: className });
    return <div className={classes}>{children}</div>;
}

export default GridRow;
