import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import CircleButton from '~/components/Button/CircleButton';
import styles from '~/components/Input/Input.module.scss';

const cx = classNames.bind(styles);
function ImageInputArea({ src, onClickCancel }) {
    return (
        <div className={cx('image-sending-comment')}>
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
