import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';
import CircleButton from '../Button/CircleButton';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function Modal({ title, children, onClose }) {
    const { checkDark } = useApp();
    return (
        <div className={cx('container', checkDark())}>
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <h2>{title}</h2>
                    <CircleButton
                        className={cx('close-modal-btn')}
                        children={<FontAwesomeIcon icon={faXmark} />}
                        onClick={onClose}
                    />
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;
