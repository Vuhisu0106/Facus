import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({
    to,
    href,
    primary = false,
    popper = false,
    nav = false,
    long = false,
    children,
    leftIcon,
    rightIcon,
    onClick,
    className,
    activeNav = false,
    landingNav = false,
    activeLandingNav = false,
    disabled = false,
    notified = 'false',
    ...passProps
}) {
    let Comp = 'button';

    const props = {
        onClick,
        ...passProps,
    };

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        primary,
        popper,
        nav,
        activeNav,
        landingNav,
        activeLandingNav,
        disabled,
        long,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
            {notified === 'true' && <span className={cx('btn__noti')}></span>}
        </Comp>
    );
}

export default Button;
