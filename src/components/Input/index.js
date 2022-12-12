import classNames from 'classnames/bind';

import styles from './Input.module.scss';
import { LoadingIcon } from '../Icon';

const cx = classNames.bind(styles);
function Input({
    inputClassName,
    onClickInputRight,
    className,
    value,
    type,
    placeHolder,
    leftIcon,
    rightIcon,
    onClickRightBtn,
    onClickLeftBtn,
    classNameRightBtn,
    classNameLeftBtn,
    leftBtnTypeFile = false,
    rightBtnTypeFile = false,
    onChangeLeftBtn,
    onChangeRightBtn,
    inputRef,
    onChange,
    autoFocus,
    loading = false,
    ...passProps
}) {
    //const inputRef = useRef();

    const props = {
        onChange,
        ...passProps,
    };

    return (
        <div className={cx('wrapper', { [className]: className })}>
            {leftIcon && (
                <button
                    className={cx('left-button', { [classNameLeftBtn]: classNameLeftBtn })}
                    onClick={onClickLeftBtn}
                >
                    {leftIcon}
                </button>
            )}
            <input
                className={inputClassName}
                value={value}
                type={type}
                ref={inputRef}
                placeholder={placeHolder}
                autoFocus={autoFocus}
                {...props}
            ></input>
            {loading && <LoadingIcon />}
            {rightIcon &&
                (!rightBtnTypeFile ? (
                    <button
                        className={cx('right-button', { [classNameRightBtn]: classNameRightBtn })}
                        onClick={onClickRightBtn}
                    >
                        {rightIcon}
                    </button>
                ) : (
                    <>
                        <label
                            className={cx('right-input-file', { [classNameRightBtn]: classNameRightBtn })}
                            onClick={onClickInputRight}
                        >
                            <input type="file" accept="image/*" onChange={onChangeRightBtn} />
                            {rightIcon}
                        </label>
                    </>
                ))}
        </div>
    );
}

export default Input;
