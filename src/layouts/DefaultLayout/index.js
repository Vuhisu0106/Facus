import classNames from 'classnames/bind';
import Modal from '~/components/Modal';
import AddPostModal from '~/components/Modal/Modal/AddPostModal';
import EditProfileModal from '~/components/Modal/Modal/EditProfileModal';
import { useApp } from '~/context/AppContext';

import Header from '~/layouts/components/Header';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const { isAddPostVisible, isEditProfileVisible } = useApp();
    return (
        <div className={cx('wrapper')}>
            <Header className={cx('header')} />
            <div className={cx('container')}>{children}</div>
            {isAddPostVisible && <AddPostModal />}
            {isEditProfileVisible && <EditProfileModal />}
        </div>
    );
}

export default DefaultLayout;
