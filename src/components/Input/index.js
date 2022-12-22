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
    onClickRightBtn, //on click function of right icon
    onClickLeftBtn,
    classNameRightBtn, //class name of right icon
    classNameLeftBtn,
    leftBtnTypeFile = false,
    rightBtnTypeFile = false, // if right icon is input type 'file', return true
    onChangeLeftBtn,
    onChangeRightBtn, // on change function of right icon
    inputRef, //input ref of input text
    onChange, // on change function of input text
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
            {/* {leftIcon && (
                <button
                    className={cx('left-button', { [classNameLeftBtn]: classNameLeftBtn })}
                    onClick={onClickLeftBtn}
                >
                    {leftIcon}
                </button>
            )} */}

            {leftIcon &&
                (!leftBtnTypeFile ? (
                    <button
                        className={cx('left-button', { [classNameLeftBtn]: classNameLeftBtn })}
                        onClick={onClickLeftBtn}
                    >
                        {leftIcon}
                    </button>
                ) : (
                    <>
                        <label
                            className={cx('left-input-file', { [classNameLeftBtn]: classNameLeftBtn })}
                            //onClick={onClickInputRight}
                        >
                            <input type="file" accept="image/*" onChange={onChangeLeftBtn} />
                            {leftIcon}
                        </label>
                    </>
                ))}
            <input
                className={inputClassName}
                value={value}
                type={type}
                ref={inputRef}
                placeholder={placeHolder}
                autoFocus={autoFocus}
                {...props}
            ></input>
            {loading && <LoadingIcon type={'comment-input'} />}
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
