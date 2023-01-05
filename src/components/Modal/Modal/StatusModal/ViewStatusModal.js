import classNames from 'classnames/bind';

import styles from './StatusModal.module.scss';

import Modal from '../..';
import StatusItem from './StatusItem';

const cx = classNames.bind(styles);
function ViewStatusModal({ userName, avt, status, onCloseStatusModal }) {
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
                    <StatusItem className={cx('status')} userName={userName} avt={avt} status={status} bigText />
                    <p>{status.text}</p>
                </div>
            }
        />
    );
}

export default ViewStatusModal;
