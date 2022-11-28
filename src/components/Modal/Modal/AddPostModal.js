import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faGlobeAsia, faImage, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '..';
import styles from '~/components/Modal/Modal.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { useAuth } from '~/context/AuthContext';
import Button from '~/components/Button';
import { useUI } from '~/context/UIContext';
import { setImageInputState } from '~/features/Modal/ModalSlice';

const cx = classNames.bind(styles);
function AddPostModal({ edit, prevCaption, prevImg, onCloseAddPostModal, addPostFunc, editPostFunc }) {
    const { currentUser } = useAuth();

    const [caption, setCaption] = useState('');
    const [img, setImg] = useState(null);

    const [editCaption, setEditCaption] = useState(prevCaption || '');
    const [editImg, setEditImg] = useState(prevImg || null); //init img received from prev post (exist as a firebase link )
    const [postButtonDisable, setPostButtonDisable] = useState(true);

    const { checkDark } = useUI();

    const modal = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    useEffect(() => {
        setEditCaption(prevCaption);
        setEditImg(prevImg);
        //console.log('prevCaption: ' + prevCaption);
    }, [prevCaption, prevImg]);

    const handleCaption = (e) => {
        const captionValueInput = e.target.value;

        if (!captionValueInput.startsWith(' ')) {
            edit ? setEditCaption(captionValueInput) : setCaption(captionValueInput);
            setPostButtonDisable(false);
        } else {
            setPostButtonDisable(true);
        }
    };

    const handleAddPost = () => {
        addPostFunc(caption, img);
        setCaption('');
        setImg(null);
    };

    const handleEditPost = async () => {
        await editPostFunc(editCaption, img);
        setImg(null);
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
            onClose={() => {
                onCloseAddPostModal();
                setEditCaption(prevCaption || '');
                setEditImg(prevImg || null);
                setImg(null);
            }}
            children={
                <div className={cx('add-post-wrapper', checkDark('dark-add-post'))}>
                    <div className={cx('add-post-header')}>
                        <div className={cx('add-post-user-info')}>
                            <img alt={currentUser.displayName} src={currentUser.photoURL} />
                            <div className={cx('user-info')}>
                                <h4>{currentUser.displayName}</h4>
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
                            value={edit && editCaption}
                            placeholder={`What's on your mind, ${currentUser.displayName}?`}
                            onChange={handleCaption}
                        ></textarea>
                        {modal.addPhotoVisible && (
                            <div className={cx('add-photo-container')}>
                                {!img && !editImg ? (
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
                                    <div className={cx('selected-photo-wrapper')}>
                                        <img
                                            src={
                                                edit
                                                    ? img
                                                        ? URL.createObjectURL(img)
                                                        : editImg
                                                    : URL.createObjectURL(img)
                                            }
                                            alt="img"
                                        />
                                        <CircleButton
                                            className={cx('cancel-photo-btn')}
                                            children={<FontAwesomeIcon icon={faXmark} />}
                                            onClick={() => {
                                                setEditImg(null);
                                                setImg(null);
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
                            onChange={(e) => setImg(e.target.files[0])}
                        ></input>
                    </div>
                    <div className={cx('add-post-footer')}>
                        <div className={cx('btn-nav-footer')}>
                            <h4>Add photo or video into your post</h4>
                            <div className={cx('btn-footer-list')}>
                                <CircleButton
                                    className={cx('circle-btn-footer', modal.buttonActive && 'active')}
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
                            disabled={edit ? !editCaption : postButtonDisable}
                            children={'Post'}
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
