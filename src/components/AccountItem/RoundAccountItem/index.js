import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import styles from './RoundAccountItem.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);
function RoundAccountItem({ userName, avt, status }) {
    const { checkDark } = useUI();

    return (
        <div className={cx('wrapper', checkDark())}>
            <div className={cx('user-avt')}>
                <div className={cx('story-circle')}>
                    <img className={cx('user-img')} alt={userName} src={avt} />
                </div>
                <Tippy
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
                >
                    <div className={cx('status-wrapper')}>
                        <div className={cx('status')}>{status.icon}</div>
                    </div>
                </Tippy>
            </div>
            <span className={cx('user-name')}>{userName}</span>
        </div>
    );
}

export default RoundAccountItem;
