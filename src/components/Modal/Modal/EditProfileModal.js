import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '~/components/Modal/Modal.module.scss';
import Modal from '..';
import CircleButton from '~/components/Button/CircleButton';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function EditProfileModal() {
    const { currentUser } = useAuth();
    const { setIsEditProfileVisible } = useApp();
    return (
        <Modal
            children={
                <div className={cx('edit-profile-wrapper')}>
                    <div className={cx('edit-profile-header')}>
                        <h2>Edit profile</h2>
                        <CircleButton
                            className={cx('close-modal-btn')}
                            children={<FontAwesomeIcon icon={faXmark} />}
                            onClick={() => {
                                setIsEditProfileVisible(false);
                            }}
                        />
                    </div>
                    <div className={cx('edit-profile-body')}>
                        {/* Edit profile picture */}
                        <div className={cx('edit-profile-picture')}>
                            <div className={cx('edit-title')}>
                                <h3>Profile picture</h3>
                            </div>
                            <div className={cx('edit-body')}>
                                <label
                                    htmlFor="profile-picture-upload"
                                    className={cx('profile-picture-upload-label')}
                                    style={{
                                        backgroundImage:
                                            "url('https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TlrXkLguNiwAX9C0W8-&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uPs-UN0BJjlLmtqgC-cWg9IeMNSu0S4IwrNM2SMo69Q&oe=636086CF')",
                                    }}
                                >
                                    <div className={cx('profile-picture-upload-hover')}>
                                        <FontAwesomeIcon
                                            className={cx('profile-picture-upload-icon')}
                                            icon={faCamera}
                                        />
                                    </div>
                                </label>

                                <input id="profile-picture-upload" type="file"></input>
                            </div>
                        </div>
                        {/* Edit cover photo */}
                        <div className={cx('edit-cover-photo')}>
                            <div className={cx('edit-title')}>
                                <h3>Cover photo</h3>
                            </div>
                            <div className={cx('edit-body')}>
                                <label
                                    htmlFor="cover-photo-upload"
                                    className={cx('cover-photo-upload-label')}
                                    style={{
                                        backgroundImage:
                                            "url('https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/97948524_559253204991695_2663173301714550784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-anRIl0YNr8AX-QhaxA&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_rj_6Nzibe3VpF0dtFudr51_DhqiJy4RWsIMC6BX93Ww&oe=63626BD3')",
                                    }}
                                >
                                    <div className={cx('cover-photo-upload-hover')}>
                                        <FontAwesomeIcon className={cx('cover-photo-upload-icon')} icon={faCamera} />
                                    </div>
                                </label>

                                <input id="cover-photo-upload" type="file"></input>
                            </div>
                        </div>
                        {/* <div className={cx('edit-current-city')}>
                            <div className={cx('edit-title')}>
                                <h3>Customize your intro</h3>
                                <button></button>
                            </div>
                            <div className={cx('edit-current-city-body')}></div>
                        </div> */}
                    </div>
                    <div className={cx('edit-profile-footer')}>
                        <Button children={'Save'} className={cx('save-btn')} />
                    </div>
                </div>
            }
        />
    );
}

export default EditProfileModal;
