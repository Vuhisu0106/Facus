import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '~/components/Modal/Modal.module.scss';
import Modal from '..';
import CircleButton from '~/components/Button/CircleButton';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import { useUI } from '~/context/UIContext';
import { useState } from 'react';

const cx = classNames.bind(styles);
function EditProfileModal({ onClose }) {
    const { currentUser } = useAuth();
    const { checkDark } = useUI();

    const [avatar, setAvatar] = useState(null);
    const [coverPhoto, setCoverPhoto] = useState(null);
    return (
        <Modal
            title="Edit profile"
            onClose={onClose}
            children={
                <div className={cx('edit-profile-wrapper', checkDark('dark-edit-profile'))}>
                    <div className={cx('edit-profile-body')}>
                        {/* Edit profile picture */}
                        <div className={cx('edit-avatar')}>
                            <div className={cx('edit-title')}>
                                <h3>Profile picture</h3>
                            </div>

                            <div className={cx('edit-body')}>
                                <div className={cx('edit-avatar-wrapper')}>
                                    {/* Display blur wrapper and selected avatar  */}
                                    {!avatar ? (
                                        <>
                                            <label
                                                htmlFor="avatar-upload"
                                                className={cx('avatar-upload-label')}
                                                style={{
                                                    backgroundImage:
                                                        "url('https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=TlrXkLguNiwAX9C0W8-&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_uPs-UN0BJjlLmtqgC-cWg9IeMNSu0S4IwrNM2SMo69Q&oe=636086CF')",
                                                }}
                                            >
                                                <div className={cx('avatar-upload-hover')}>
                                                    <FontAwesomeIcon
                                                        className={cx('avatar-upload-icon')}
                                                        icon={faCamera}
                                                    />
                                                </div>
                                            </label>

                                            <input
                                                id="avatar-upload"
                                                type="file"
                                                onChange={(e) => setAvatar(e.target.files[0])}
                                            ></input>
                                        </>
                                    ) : (
                                        <>
                                            <div className={cx('blur-selected-avatar')}>
                                                <CircleButton
                                                    className={cx('cancel-avatar-btn')}
                                                    children={<FontAwesomeIcon icon={faXmark} />}
                                                    onClick={() => {
                                                        setAvatar(null);
                                                    }}
                                                />
                                            </div>
                                            <img
                                                className={cx('select-avatar')}
                                                src={URL.createObjectURL(avatar)}
                                                alt="img"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {/* Edit cover photo */}
                        <div className={cx('edit-cover-photo')}>
                            <div className={cx('edit-title')}>
                                <h3>Cover photo</h3>
                            </div>
                            <div className={cx('edit-body')}>
                                <div className={cx('edit-cover-photo-wrapper')}>
                                    {!coverPhoto ? (
                                        <>
                                            <label
                                                htmlFor="cover-photo-upload"
                                                className={cx('cover-photo-upload-label')}
                                                style={{
                                                    backgroundImage:
                                                        "url('https://scontent.fhan19-1.fna.fbcdn.net/v/t1.6435-9/97948524_559253204991695_2663173301714550784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=-anRIl0YNr8AX-QhaxA&_nc_ht=scontent.fhan19-1.fna&oh=00_AT_rj_6Nzibe3VpF0dtFudr51_DhqiJy4RWsIMC6BX93Ww&oe=63626BD3')",
                                                }}
                                            >
                                                <div className={cx('cover-photo-upload-hover')}>
                                                    <FontAwesomeIcon
                                                        className={cx('cover-photo-upload-icon')}
                                                        icon={faCamera}
                                                    />
                                                </div>
                                            </label>

                                            <input
                                                id="cover-photo-upload"
                                                type="file"
                                                onChange={(e) => setCoverPhoto(e.target.files[0])}
                                            ></input>
                                        </>
                                    ) : (
                                        <>
                                            <div className={cx('blur-selected-cover-photo')}>
                                                <CircleButton
                                                    className={cx('cancel-cover-photo-btn')}
                                                    children={<FontAwesomeIcon icon={faXmark} />}
                                                    onClick={() => {
                                                        setCoverPhoto(null);
                                                    }}
                                                />
                                            </div>
                                            <img
                                                className={cx('select-cover-photo')}
                                                src={URL.createObjectURL(coverPhoto)}
                                                alt="img"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
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
