import classNames from 'classnames/bind';
import { StyleRoot } from 'radium';

import styles from './Grid.module.scss';

const cx = classNames.bind(styles);

function GridColumn({ s, s_o, m, m_o, l, l_o, className, children }) {
    const classes = cx('col', { [className]: className });

    return (
        <StyleRoot
            className={classes}
            style={{
                //col

                '@media (max-width: 740px)': {
                    display: s === 0 && 'none',
                    flex: s !== 0 && `0 0 calc((100%/12)*${s})`,
                    maxWidth: s !== 0 && `calc((100%/12)*${s})`,
                    //col with margin
                    marginLeft: `calc((100%/12)*${s_o})`,
                },

                //>= Tablet
                '@media (min-width: 740px) and (max-width: 1024px)': {
                    flex: m !== 0 && `0 0 calc((100%/12)*${m})`,
                    maxWidth: m !== 0 && `calc((100%/12)*${m})`,
                    display: m === 0 ? 'none' : 'block',
                    marginLeft: m_o !== 0 && `calc((100%/12)*${m_o})`,
                    // left: fixedLeft && `calc((100vw - 984px) / 2)`,
                    // right: fixedRight && `calc((100vw - 984px) / 2)`,
                },

                //PC medium resolution >
                '@media (min-width: 1024px)': {
                    flex: l !== 0 && `0 0 calc((100%/12)*${l})`,
                    maxWidth: l !== 0 && `calc((100%/12)*${l})`,
                    width: l !== 0 && `calc((100%/12)*${l})`,
                    minWidth: l !== 0 && `calc((100%/12)*${l})`,
                    display: l === 0 ? 'none' : 'block',
                    marginLeft: l_o !== 0 && `calc((100%/12)*${l_o})`,
                    // left: fixedLeft && `calc((100vw - 984px) / 2)`,
                    // right: fixedRight && `calc((100vw - 984px) / 2)`,
                },
            }}
        >
            {children}
        </StyleRoot>
    );
}

export default GridColumn;
