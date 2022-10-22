import classNames from 'classnames/bind';
import { useApp } from '~/context/AppContext';
import AccountItem from './AccountItem';

import styles from './SuggestAccount.module.scss';

const cx = classNames.bind(styles);
function SuggestAccount({ label }) {
    const { checkDark } = useApp();
    return (
        <div className={cx('wrapper', checkDark())}>
            <div className={cx('label')}>
                <p>{label}</p>
            </div>
            <div className="account-list">
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
                <AccountItem />
            </div>
        </div>
    );
}

export default SuggestAccount;
