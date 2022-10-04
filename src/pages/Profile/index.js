import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './Profile.module.scss';
import { faCamera, faCircle, faPen, faWrench } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import Posts from '~/layouts/components/Profile/Posts';
import Following from '~/layouts/components/Profile/Following';
import Follower from '~/layouts/components/Profile/Follower';
import CircleButton from '~/components/Button/CircleButton';
import Modal from '~/components/Modal';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
const NAV_LIST = ['Posts', 'Following', 'Follower'];
function Profile() {
    const [type, setType] = useState('Posts');
    const [profileLayout, setProfileLayout] = useState('Posts');

    const { currentUser } = useAuth();
    const { setIsEditProfileVisible } = useApp();

    const main = () => {
        if (profileLayout === 'Following') {
            return <Following />;
        }
        if (profileLayout === 'Follower') {
            return <Follower />;
        }
        return <Posts />;
    };

    useEffect(() => {
        setProfileLayout(type);
    }, [type]);

    return (
        <div className={cx('container')}>
            <div className={cx('profile-main-part')}>
                <img className={cx('profile-cover-photo')} src={currentUser.photoURL} alt="Vu Hieu" />
                <div className={cx('profile-main-part-center')}>
                    <div className={cx('profile-main-part-right')}>
                        <div className={cx('avatar')}>
                            <CircleButton
                                className={cx('change-avt-btn')}
                                children={<FontAwesomeIcon icon={faCamera} />}
                            />
                            <img className={cx('profile-avt')} alt="Vu Minh Hieu" src={currentUser.photoURL} />
                        </div>
                        <div>
                            <h1 className={cx('profile-name')}>{currentUser.displayName}</h1>
                            <div className={cx('profile-follow-info')}>
                                <span className={cx('profile-following')}>1 following</span>
                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                <span className={cx('profile-follower')}>0 follower</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('profile-main-part-left')}>
                        <Button
                            primary
                            className={cx('edit-account-btn')}
                            leftIcon={<FontAwesomeIcon icon={faWrench} />}
                        >
                            Edit account
                        </Button>
                        <Button
                            primary
                            className={cx('edit-profile-btn')}
                            leftIcon={<FontAwesomeIcon icon={faPen} />}
                            onClick={() => {
                                setIsEditProfileVisible(true);
                            }}
                        >
                            Edit profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('profile-nav')}>
                <ul>
                    {NAV_LIST.map((items) => (
                        <Button
                            nav
                            active={type === items ? true : false}
                            key={items}
                            onClick={() => {
                                setType(items);
                            }}
                        >
                            {items}
                        </Button>
                    ))}
                </ul>
            </div>
            <div className={cx('profile-content')}>{main()}</div>
        </div>
    );
}

export default Profile;
