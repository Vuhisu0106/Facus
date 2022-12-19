import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CircleButton.module.scss';

const cx = classNames.bind(styles);
function CircleButton({ className, to, href, children, onClick, notified }) {
    let Comp = 'button';

    const classes = cx('wrapper', { [className]: className });
    const props = {
        onClick,
    };
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            <div className={cx('inside-wrapper')}>
                <span>{children}</span>
                {notified && <span className={cx('badge')}></span>}
            </div>
        </Comp>
    );
}

export default CircleButton;
