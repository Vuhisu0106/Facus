import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useApp } from '~/context/AppContext';
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
    disabled = false,
    ...passProps
}) {
    const { checkDark } = useApp();
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

    const classes = cx('wrapper', checkDark(), {
        [className]: className,
        primary,
        popper,
        nav,
        activeNav,
        disabled,
        long,
    });
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Comp>
    );
}

export default Button;
