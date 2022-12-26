import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from '~/components/Modal/Modal.module.scss';
import Modal from '..';
import CircleButton from '~/components/Button/CircleButton';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';

import { useState } from 'react';

import { useSelector } from 'react-redux';
import { setProfilePhoto } from '~/utils';
import { toast } from 'react-toastify';
import { LoadingIcon } from '~/components/Icon';

const cx = classNames.bind(styles);
function EditProfileModal({ onClose }) {
    const { currentUser } = useAuth();

    const profile = useSelector((state) => state.profile);

    const [avatar, setAvatar] = useState(null);
    const [isAvatarChange, setIsAvatarChange] = useState(false);
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [iscoverPhotoChange, setIsCoverPhotoChange] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSavePhoto = async () => {
        setLoading(true);
        await setProfilePhoto(currentUser, avatar, coverPhoto, isAvatarChange, iscoverPhotoChange);
        setLoading(false);
        onClose();
        toast.success('Update photo successfully');
    };
    return (
        <Modal
            title="Edit profile"
            l={4.5}
            l_o={3.75}
            m={6}
            m_o={3}
            s={10}
            s_o={1}
            onClose={() => {
                onClose();
                setIsAvatarChange(false);
                setIsCoverPhotoChange(false);
            }}
            children={
                <div className={cx('edit-profile-wrapper')}>
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
                                                    backgroundImage: `url(${profile.photoURL})`,
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
                                                accept="image/*"
                                                onChange={(e) => {
                                                    setAvatar(e.target.files[0]);
                                                    setIsAvatarChange(true);
                                                }}
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
                                                        setIsAvatarChange(false);
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
                                                    backgroundImage: `url(${
                                                        profile.coverPhotoURL || profile.photoURL
                                                    })`,
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
                                                accept="image/*"
                                                onChange={(e) => {
                                                    setCoverPhoto(e.target.files[0]);
                                                    setIsCoverPhotoChange(true);
                                                }}
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
                                                        setIsCoverPhotoChange(false);
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
                        <Button
                            children={loading ? <LoadingIcon type={'button'} /> : 'Save'}
                            className={cx('save-btn')}
                            disabled={loading}
                            onClick={() => {
                                handleSavePhoto();
                            }}
                        />
                    </div>
                </div>
            }
        />
    );
}

export default EditProfileModal;
