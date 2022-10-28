import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import Header from '~/layouts/components/Header';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    const { checkDark } = useUI();
    return (
        <div className={cx('wrapper', checkDark())}>
            <Header className={cx('header')} />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default HeaderOnly;
