import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './CircleButton.module.scss';

const cx = classNames.bind(styles);
function CircleButton({ to, href, children, onClick }) {
    let Comp = 'button';

    const classes = cx('wrapper');
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
            <span>{children}</span>
        </Comp>
    );
}

export default CircleButton;
