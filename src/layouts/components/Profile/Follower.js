import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';
import { useUI } from '~/context/UIContext';

const cx = classNames.bind(styles);
function Follower({ list }) {
    const { checkDark } = useUI();
    return (
        <WrapperModal className={cx('follower', checkDark())}>
            <h2>Follower</h2>
            {Object.keys(list).length > 0 ? (
                list &&
                Object.entries(list).map((follower) => (
                    <div key={follower[0]} className={cx('account')}>
                        <img
                            className={cx('account-avt')}
                            alt={follower[1].userInfo.displayName}
                            src={follower[1].userInfo.photoURL}
                        />
                        <div className={cx('account-info')}>
                            <h1 className={cx('account-name')}>{follower[1].userInfo.displayName}</h1>
                            <span className={cx('account-bio')}>Hello World</span>
                        </div>
                    </div>
                ))
            ) : (
                <h2>This user has no follower</h2>
            )}
        </WrapperModal>
    );
}

export default Follower;
