import classNames from 'classnames/bind';
import { useState } from 'react';
import { useUI } from '~/context/UIContext';

import StatusModal from '~/components/Modal/Modal/StatusModal';
import styles from './RoundAccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SetStatusModal from '~/components/Modal/Modal/SetStatusModal';

const cx = classNames.bind(styles);
function RoundAccountItem({ className, userName, avt, status, bigText, addStatus }) {
    const { checkDark } = useUI();
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [isSetStatusVisible, setIsSetStatusVisible] = useState(false);
    const classes = cx('wrapper', checkDark(), {
        [className]: className,
    });
    return (
        <div className={classes}>
            {isStatusModalVisible && (
                <StatusModal
                    userName={userName}
                    avt={avt}
                    status={status}
                    onCloseStatusModal={() => {
                        setIsStatusModalVisible(false);
                    }}
                />
            )}
            {isSetStatusVisible && (
                <SetStatusModal
                    onClose={() => {
                        setIsSetStatusVisible(false);
                    }}
                />
            )}
            <div
                className={cx('user-avt')}
                onClick={() => {
                    addStatus ? setIsSetStatusVisible(true) : setIsStatusModalVisible(true);
                }}
            >
                <div className={cx('story-circle')}>
                    <img className={cx('user-img')} alt={userName} src={avt} />
                </div>

                <div className={cx('status-wrapper')}>
                    <div className={cx('status')}>
                        {!addStatus ? status.icon : <FontAwesomeIcon icon={faPlusCircle} />}
                    </div>
                </div>
            </div>
            <span className={cx('user-name', bigText && 'big-font')}>{addStatus ? 'Add status' : userName}</span>
        </div>
    );
}

export default RoundAccountItem;
