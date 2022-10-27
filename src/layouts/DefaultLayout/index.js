import classNames from 'classnames/bind';
import { useApp } from '~/context/AppContext';

import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { checkDark } = useApp();

    return (
        <div className={cx('wrapper', checkDark())}>
            <Header className={cx('header')} />
            <div className={cx('container')}>{children}</div>
            {/* {isAddPostVisible && <AddPostModal />}
            {isEditProfileVisible && <EditProfileModal />}
            {isEditStatusModal && <SetStatusModal />} */}
        </div>
    );
}

export default DefaultLayout;
