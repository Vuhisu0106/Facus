import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faGlobeAsia, faImage, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '..';
import styles from '~/components/Modal/Modal.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import Button from '~/components/Button';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function AddPostModal({ editPostId, edit, onCloseAddPostModal, addPostFunc, editPostFunc }) {
    const { currentUserInfo } = useApp();
    const dispatch = useDispatch();

    const [caption, setCaption] = useState('');
    const [img, setImg] = useState('');
    const [loading, setLoading] = useState(false);

    const editedPost = useSelector((state) => state.postNcomment.posts.find((post) => post.postId === editPostId));
    const { addPhotoVisible, buttonActive } = useSelector((state) => state.modal);

    useEffect(() => {
        if (editedPost) {
            setCaption(editedPost.caption);
            setImg(editedPost.img);
        }
    }, [editedPost]);

    const handleCaption = (e) => {
        const valueInput = e.target.value;
        if (!valueInput.startsWith(' ')) {
            setCaption(valueInput);
        } else {
            return;
        }
    };

    const handleAddPost = () => {
        addPostFunc(caption, img);
    };

    const handleEditPost = async () => {
        if (editedPost.img) {
            if (img === editedPost.img) {
                await editPostFunc(caption, img);
            } else if (!img) {
                await editPostFunc(caption, img, false, false, true);
            } else {
                await editPostFunc(caption, img, false, true);
            }
        } else {
            if (img) {
                await editPostFunc(caption, img, true, true);
            } else {
                await editPostFunc(caption, img);
            }
        }
    };

    return (
        <Modal
            title={edit ? 'Edit post' : 'Create post'}
            l={4.5}
            l_o={3.75}
            m={6}
            m_o={3}
            s={10}
            s_o={1}
            onClose={onCloseAddPostModal}
            children={
                <div className={cx('add-post-wrapper')}>
                    <div className={cx('add-post-header')}>
                        <div className={cx('add-post-user-info')}>
                            <img alt={currentUserInfo.displayName} src={currentUserInfo.photoURL} />
                            <div className={cx('user-info')}>
                                <h4>{currentUserInfo.displayName}</h4>
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
                            value={caption}
                            placeholder={`What's on your mind, ${currentUserInfo.displayName}?`}
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
                                                dispatch(
                                                    setImageInputState({
                                                        addPhotoVisible: false,
                                                        buttonActive: false,
                                                    }),
                                                );
                                                setImg('');
                                            }}
                                        />
                                        <div className={cx('upload-icon')}>
                                            <FontAwesomeIcon icon={faFileCirclePlus} />
                                        </div>

                                        <h3>Add photo</h3>
                                        <span>or drag and drop</span>
                                    </label>
                                ) : (
                                    <div className={cx('selected-photo-wrapper')}>
                                        <img src={typeof img === 'object' ? URL.createObjectURL(img) : img} alt="img" />
                                        <CircleButton
                                            className={cx('cancel-photo-btn')}
                                            children={<FontAwesomeIcon icon={faXmark} />}
                                            onClick={() => {
                                                setImg('');
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                setImg(e.target.files[0]);
                            }}
                        ></input>
                    </div>
                    <div className={cx('add-post-footer')}>
                        <div className={cx('btn-nav-footer')}>
                            <h4>Add photo or video into your post</h4>
                            <div className={cx('btn-footer-list')}>
                                <CircleButton
                                    className={cx('circle-btn-footer', buttonActive && 'active')}
                                    children={<FontAwesomeIcon icon={faImage} />}
                                    onClick={() => {
                                        dispatch(
                                            setImageInputState({
                                                addPhotoVisible: true,
                                                buttonActive: true,
                                            }),
                                        );
                                    }}
                                />
                                <CircleButton
                                    className={cx('circle-btn-footer')}
                                    children={<FontAwesomeIcon icon={faVideo} />}
                                />
                            </div>
                        </div>
                        <Button
                            disabled={!caption && !img}
                            children={!loading ? 'Post' : '...Loading'}
                            className={cx('post-btn')}
                            onClick={edit ? handleEditPost : handleAddPost}
                        />
                    </div>
                </div>
            }
        />
    );
}

export default AddPostModal;
