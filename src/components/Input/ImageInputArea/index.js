import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import CircleButton from '~/components/Button/CircleButton';
import styles from '~/components/Input/Input.module.scss';

const cx = classNames.bind(styles);
function ImageInputArea({ className, src, onClickCancel }) {
    const classes = cx('image-sending-comment', {
        [className]: className,
    });
    return (
        <div className={classes}>
            <img className={cx('select-photo')} src={src} alt="" />
            <CircleButton
                className={cx('cancel-photo-btn')}
                children={<FontAwesomeIcon icon={faXmark} />}
                onClick={onClickCancel}
            />
        </div>
    );
}

export default ImageInputArea;
