import classNames from 'classnames/bind';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';

import styles from '~/components/Modal/Modal.module.scss';

import Modal from '..';

const cx = classNames.bind(styles);
function StatusModal({ userName, avt, status, onCloseStatusModal }) {
    return (
        <Modal
            title={'Status'}
            l={3}
            l_o={4.5}
            m={4}
            m_o={4}
            s={8}
            s_o={2}
            onClose={onCloseStatusModal}
            children={
                <div className={cx('status-wrapper')}>
                    <RoundAccountItem className={cx('status')} userName={userName} avt={avt} status={status} bigText />
                    <p>{status.text}</p>
                </div>
            }
        />
    );
}

export default StatusModal;
