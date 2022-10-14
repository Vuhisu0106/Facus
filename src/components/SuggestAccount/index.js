import classNames from 'classnames/bind';
import AccountItem from './AccountItem';

import styles from './SuggestAccount.module.scss';

const cx = classNames.bind(styles);
function SuggestAccount({ label }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('label')}>
                <p>{label}</p>
            </div>
            <div className="account-list">
                <AccountItem />
                <AccountItem />
                <AccountItem />
            </div>
        </div>
    );
}

export default SuggestAccount;
