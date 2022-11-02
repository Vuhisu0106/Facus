import classNames from 'classnames/bind';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';

import styles from '~/components/Modal/Modal.module.scss';
import { useUI } from '~/context/UIContext';
import Modal from '..';

const cx = classNames.bind(styles);
function StatusModal({ userName, avt, status, onCloseStatusModal }) {
    const { checkDark } = useUI();
    return (
        <Modal
            title={'Status'}
            onClose={onCloseStatusModal}
            children={
                <div className={cx('status-wrapper', checkDark('dark-status-modal'))}>
                    <RoundAccountItem className={cx('status')} userName={userName} avt={avt} status={status} bigText />
                    <p>{status.text}</p>
                </div>
            }
        />
    );
}

export default StatusModal;
