import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { checkDark } = useUI();

    return (
        <div className={cx('wrapper', checkDark())}>
            <Header className={cx('header')} />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default DefaultLayout;
