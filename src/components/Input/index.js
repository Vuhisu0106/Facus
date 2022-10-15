import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Input.module.scss';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Input({
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
                value={value}
                type={type}
                ref={inputRef}
                placeholder={placeHolder}
                autoFocus={autoFocus}
                {...props}
            ></input>
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
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
                            htmlFor="right-btn-input"
                            className={cx('right-input-file', { [classNameRightBtn]: classNameRightBtn })}
                        >
                            {rightIcon}
                        </label>
                        <input id="right-btn-input" type="file" onChange={onChangeRightBtn} />
                    </>
                ))}
        </div>
    );
}

export default Input;
