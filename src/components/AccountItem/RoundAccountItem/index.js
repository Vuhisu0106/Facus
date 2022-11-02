import classNames from 'classnames/bind';
import { useState } from 'react';
import { useUI } from '~/context/UIContext';

import StatusModal from '~/components/Modal/Modal/StatusModal';
import styles from './RoundAccountItem.module.scss';

const cx = classNames.bind(styles);
function RoundAccountItem({ className, userName, avt, status, bigText }) {
    const { checkDark } = useUI();
    const [isStatusModalVisible, setIsStatusModalVisible] = useState(false);
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
            <div
                className={cx('user-avt')}
                onClick={() => {
                    setIsStatusModalVisible(true);
                }}
            >
                <div className={cx('story-circle')}>
                    <img className={cx('user-img')} alt={userName} src={avt} />
                </div>
                {/* <Tippy
                    //interactive="true"
                    placement={'bottom-end'}
                    //offset={'10, 10'}
                    render={(attrs) => (
                        <div tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <p>{status.text}</p>
                            </PopperWrapper>
                        </div>
                    )}
                > */}
                <div className={cx('status-wrapper')}>
                    <div className={cx('status')}>{status.icon}</div>
                </div>
                {/* </Tippy> */}
            </div>
            <span className={cx('user-name', bigText && 'big-font')}>{userName}</span>
        </div>
    );
}

export default RoundAccountItem;
