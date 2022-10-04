import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';

import Modal from '..';
import styles from '~/components/Modal/Modal.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faGlobeAsia, faImage, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/context/AuthContext';
import Button from '~/components/Button';
import { useApp } from '~/context/AppContext';
import { useState } from 'react';

const cx = classNames.bind(styles);
function AddPostModal() {
    const { currentUser } = useAuth();
    const {
        isAddPostVisible,
        setIsAddPostVisible,
        addPhotoVisible,
        setAddPhotoVisible,
        buttonActive,
        setButtonActive,
    } = useApp();

    return (
        <Modal
            children={
                <div className={cx('add-post-wrapper')}>
                    <div className={cx('add-post-header')}>
                        <h2 className={cx('add-post-title')}>Create post</h2>
                        <CircleButton
                            className={cx('close-modal-btn')}
                            children={<FontAwesomeIcon icon={faXmark} />}
                            onClick={() => {
                                setIsAddPostVisible(false);
                                setIsAddPostVisible(false);
                                setButtonActive(false);
                            }}
                        />
                        <div className={cx('add-post-user-info')}>
                            <img className={cx('user-avt')} alt={currentUser.displayName} src={currentUser.photoURL} />
                            <div className={cx('user-info')}>
                                <h4 className={cx('user-name')}>{currentUser.displayName}</h4>
                                <Button
                                    children={'Global'}
                                    className={cx('global')}
                                    leftIcon={<FontAwesomeIcon icon={faGlobeAsia} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('add-post-body')}>
                        <textarea
                            className={cx('post-message-input')}
                            placeholder="What's on your mind, Vũ Hiếu?"
                        ></textarea>
                        {addPhotoVisible && (
                            <div className={cx('add-photo-container')}>
                                <label htmlFor="photo-upload" className={cx('add-photo-wrapper')}>
                                    <CircleButton
                                        className={cx('close-upload-btn')}
                                        children={<FontAwesomeIcon icon={faXmark} />}
                                        onClick={() => {
                                            setAddPhotoVisible(false);
                                            setButtonActive(false);
                                        }}
                                    />
                                    <div className={cx('upload-icon')}>
                                        <FontAwesomeIcon icon={faFileCirclePlus} />
                                    </div>

                                    <h3>Add photo</h3>
                                    <span>or drag and drop</span>
                                </label>
                            </div>
                        )}
                        <input id="photo-upload" type="file"></input>
                    </div>
                    <div className={cx('add-post-footer')}>
                        <div className={cx('btn-nav-footer')}>
                            <h4>Add photo or video into your post</h4>
                            <div className={cx('btn-footer-list')}>
                                <CircleButton
                                    className={cx('circle-btn-footer', buttonActive && 'active')}
                                    children={<FontAwesomeIcon icon={faImage} />}
                                    onClick={() => {
                                        setAddPhotoVisible(true);
                                        setButtonActive(true);
                                    }}
                                />
                                <CircleButton
                                    className={cx('circle-btn-footer')}
                                    children={<FontAwesomeIcon icon={faVideo} />}
                                />
                            </div>
                        </div>
                        <Button children={'Post'} className={cx('post-btn')} />
                    </div>
                </div>
            }
        />
    );
}

export default AddPostModal;
