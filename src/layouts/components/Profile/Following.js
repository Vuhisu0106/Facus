import classNames from 'classnames/bind';

import styles from './Profile.module.scss';
import AccountItem from '~/components/AccountItem';

const cx = classNames.bind(styles);
function Following() {
    return (
        <div>
            <h1>Following</h1>
            <AccountItem />
            <AccountItem />
            <AccountItem />
            <AccountItem />
        </div>
    );
}

export default Following;
