import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import { doc, onSnapshot, arrayUnion, serverTimestamp, Timestamp, updateDoc, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { storage } from '~/firebase';
import Modal from '..';
import styles from '~/components/Modal/Modal.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faGlobeAsia, faImage, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '~/context/AuthContext';
import Button from '~/components/Button';
import { useApp } from '~/context/AppContext';
import { useState } from 'react';
import { db } from '~/firebase';

const cx = classNames.bind(styles);
function AddPostModal() {
    const { currentUser } = useAuth();

    const [caption, setCaption] = useState('');
    const [img, setImg] = useState(null);

    const {
        isAddPostVisible,
        setIsAddPostVisible,
        addPhotoVisible,
        setAddPhotoVisible,
        buttonActive,
        setButtonActive,
    } = useApp();

    const handleCaption = (e) => {
        const captionValueInput = e.target.value;

        if (!captionValueInput.startsWith(' ')) {
            setCaption(captionValueInput);
        } else {
            return;
        }
    };

    const handlePost = async () => {
        setIsAddPostVisible(false);
        let uuId = uuid();
        if (img) {
            const storageRef = ref(storage, uuid());
            //const uploadTask = await uploadBytesResumable(storageRef, img);

            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'userPost', currentUser.uid), {
                        [uuId]: {
                            postId: uuId,
                            poster: {
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            },
                            caption: caption,
                            img: downloadURL,
                            date: serverTimestamp(),
                            like: [],
                            comment: [],
                        },
                    });

                    await setDoc(doc(db, 'post', uuId), {
                        postId: uuId,
                        poster: {
                            uid: currentUser.uid,
                            displayName: currentUser.displayName,
                            photoURL: currentUser.photoURL,
                        },
                        caption: caption,
                        img: downloadURL,
                        date: serverTimestamp(),
                        like: [],
                        comment: [],
                    });
                });
            });
        } else if (!caption) {
            return;
        } else {
            await updateDoc(doc(db, 'userPost', currentUser.uid), {
                [uuId]: {
                    postId: uuId,
                    poster: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    caption: caption,
                    date: serverTimestamp(),
                    like: [],
                    comment: [],
                },
            });
            await setDoc(doc(db, 'post', uuId), {
                postId: uuId,
                poster: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                caption: caption,

                date: serverTimestamp(),
                like: [],
                comment: [],
            });
        }

        setCaption('');
        setImg(null);
    };

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
                                setButtonActive(false);
                                setImg(null);
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
                            placeholder={`What's on your mind, ${currentUser.displayName}?`}
                            onChange={handleCaption}
                        ></textarea>
                        {addPhotoVisible && (
                            <div className={cx('add-photo-container')}>
                                {!img ? (
                                    <label htmlFor="photo-upload" className={cx('add-photo-wrapper')}>
                                        <CircleButton
                                            className={cx('close-upload-btn')}
                                            children={<FontAwesomeIcon icon={faXmark} />}
                                            onClick={() => {
                                                setAddPhotoVisible(false);
                                                setButtonActive(false);
                                                setImg(null);
                                            }}
                                        />
                                        <div className={cx('upload-icon')}>
                                            <FontAwesomeIcon icon={faFileCirclePlus} />
                                        </div>

                                        <h3>Add photo</h3>
                                        <span>or drag and drop</span>
                                    </label>
                                ) : (
                                    <div className={cx('select-photo-wrapper')}>
                                        <img className={cx('select-photo')} src={URL.createObjectURL(img)} alt="img" />
                                        <CircleButton
                                            className={cx('cancel-photo-btn')}
                                            children={<FontAwesomeIcon icon={faXmark} />}
                                            onClick={() => {
                                                setImg(null);
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <input id="photo-upload" type="file" onChange={(e) => setImg(e.target.files[0])}></input>
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
                        <Button children={'Post'} className={cx('post-btn')} onClick={handlePost} />
                    </div>
                </div>
            }
        />
    );
}

export default AddPostModal;
