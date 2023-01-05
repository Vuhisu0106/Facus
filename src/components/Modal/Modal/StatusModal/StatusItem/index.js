import classNames from 'classnames/bind';
import { useState } from 'react';

import styles from './StatusItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import SetStatusModal from '../SetStatusModal';
import ViewStatusModal from '../ViewStatusModal';

const cx = classNames.bind(styles);
function StatusItem({ className, userName, avt, status, bigText, addStatus }) {
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
    const [isSetStatusVisible, setIsSetStatusVisible] = useState(false);
    const [imgLoading, setImgLoading] = useState(false);
    const classes = cx('wrapper', {
        [className]: className,
    });
    return (
        <div className={classes}>
            {isStatusModalVisible && (
                <ViewStatusModal
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
                    {imgLoading ? null : <div className={cx('user-img--loading')} />}
                    <img
                        className={cx('user-img')}
                        alt={userName}
                        src={avt}
                        style={imgLoading ? {} : { display: 'none' }}
                        onLoad={() => {
                            setImgLoading(true);
                        }}
                    />
                </div>

                <div className={cx('status__wrapper')}>
                    <div className={cx('status')}>
                        {!addStatus ? status.icon : <FontAwesomeIcon icon={faPlusCircle} />}
                    </div>
                </div>
            </div>
            <span className={cx('user-name', bigText && 'big-font')}>{addStatus ? 'Add status' : userName}</span>
        </div>
    );
}

export default StatusItem;
