import classNames from 'classnames/bind';
import Modal from '~/components/Modal';
import AddPostModal from '~/components/Modal/Modal/AddPostModal';
import EditProfileModal from '~/components/Modal/Modal/EditProfileModal';
import SetStatusModal from '~/components/Modal/Modal/SetStatusModal';
import { useApp } from '~/context/AppContext';

import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { isAddPostVisible, isEditProfileVisible, isEditStatusModal, checkDark } = useApp();

    return (
        <div className={cx('wrapper', checkDark())}>
            <Header className={cx('header')} />
            <div className={cx('container')}>{children}</div>
            {isAddPostVisible && <AddPostModal />}
            {isEditProfileVisible && <EditProfileModal />}
            {isEditStatusModal && <SetStatusModal />}
        </div>
    );
}

export default DefaultLayout;
