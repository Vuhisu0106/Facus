import classNames from 'classnames/bind';
import { StyleRoot } from 'radium';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function GridRow({ noGutters, className, children }) {
    const classes = cx('row', noGutters && 'no-gutters', { [className]: className });
    return (
        <div
            className={classes}
            // style={{
            //     //col

            //     backgroundColor: 'red',

            //     //>= Tablet
            //     '@media (min-width: 740px)': {
            //         backgroundColor: 'yellow',
            //     },

            //     //PC medium resolution >
            //     '@media (min-width: 1024px)': {
            //         backgroundColor: 'green',
            //     },

            //     //Tablet - PC low resolution
            // }}
        >
            {children}
        </div>
    );
}

export default GridRow;
