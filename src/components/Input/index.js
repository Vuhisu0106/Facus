import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);
function Input({ className, placeHolder, leftIcon, rightIcon }) {
    return (
        <div className={cx('wrapper', { [className]: className })}>
            {leftIcon && <button className={cx('left-button')}>{leftIcon}</button>}
            <input placeholder={placeHolder}></input>
            {rightIcon && <button className={cx('right-button')}>{leftIcon}</button>}
        </div>
    );
}

export default Input;
