import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';
import { useUI } from '~/context/UIContext';

const cx = classNames.bind(styles);
function Following({ list }) {
    const { checkDark } = useUI();

    return (
        <WrapperModal className={cx('following', checkDark())}>
            <h2>Following</h2>

            {Object.keys(list).length > 0 ? (
                list &&
                Object.entries(list).map((following) => (
                    <div key={following[0]} className={cx('account')}>
                        <img
                            className={cx('account-avt')}
                            alt={following[1].userInfo.displayName}
                            src={following[1].userInfo.photoURL}
                        />
                        <div className={cx('account-info')}>
                            <h1 className={cx('account-name')}>{following[1].userInfo.displayName}</h1>
                            <span className={cx('account-bio')}>Hello World</span>
                        </div>
                    </div>
                ))
            ) : (
                <h1>This user doesn't follow anyone</h1>
            )}
        </WrapperModal>
    );
}

export default Following;
