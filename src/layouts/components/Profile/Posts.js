import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, deleteField } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

import { db } from '~/firebase/config';
import Button from '~/components/Button';
import WrapperModal from '~/components/Wrapper';
import PostLayout from '~/components/PostLayout';
import styles from './Profile.module.scss';
import { useAuth } from '~/context/AuthContext';
import CircleAvatar from '~/components/CircleAvatar';
import Input from '~/components/Input';
import AddPostModal from '~/components/Modal/Modal/AddPostModal';
import { deleteDocument, updateDocument } from '~/firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import { setBio } from '~/features/Profile/ProfileSlice';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';
import { addPost } from '~/utils';

const cx = classNames.bind(styles);
function Posts({ selectedUser, isCurrentUser = false }) {
    const { currentUser } = useAuth();
    const dispatch = useDispatch();
    const bio = useSelector((state) => state.profile.bio);
    //const post = useSelector((state) => state.postNcomment.posts.find((post) => post.poster.uid === selectedUser.uid));
    // const post = useSelector((state) =>
    //     state.postNcomment.posts.filter((post) => post.poster.uid === selectedUser.uid),
    // );

    const postList = useSelector((state) => state.postNcomment.posts);

    const [bioInput, setBioInput] = useState(bio || '');
    const [editBio, setEditBio] = useState(false);
    const [saveBioBtnDisable, setSaveBioBtnDisable] = useState(true);

    //Add post modal
    const [openModal, setOpenModal] = useState(false);

    const postImgList = [];
    postList.forEach((data) => {
        if (data.img) return postImgList.push(data.img);
    });

    useEffect(() => {
        const getPost = () => {
            const unsub = onSnapshot(doc(db, 'userPost', selectedUser.uid), (doc) => {
                console.log('something happening');
                dispatch(resetPost());
                const posts = [];
                if (doc.data()) {
                    Object.entries(doc.data()).forEach((post) => {
                        posts.push({ ...post[1], comment: [] });
                    });
                } else {
                    return;
                }
                dispatch(setPost(posts));
            });
            return () => {
                unsub();
            };
        };
        selectedUser && getPost();
    }, [selectedUser.uid]);

    const handleEditBio = (e) => {
        const editValueInput = e.target.value;

        if (!editValueInput.startsWith(' ')) {
            setBioInput(editValueInput);
            setSaveBioBtnDisable(false);
        } else {
            setSaveBioBtnDisable(true);
        }
    };

    const handleSaveBio = async () => {
        await updateDocument('users', currentUser.uid, {
            bio: bioInput,
        });
        dispatch(
            setBio({
                bio: bioInput,
            }),
        );
        setEditBio(false);
    };

    //Add post
    const handleAddPost = async (caption, img) => {
        await addPost(currentUser, caption, img);
        setOpenModal(false);
    };

    const handleDeletePost = async (postId) => {
        if (window.confirm('Do you want delete this post?')) {
            try {
                await deleteDocument('post', postId);
                await updateDocument('userPost', currentUser.uid, {
                    [postId]: deleteField(),
                });

                //setPostList((cmtList) => cmtList.filter((x) => x.postId !== postId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Grid type={'profile'} className={cx('wrapper')}>
            {openModal && (
                <AddPostModal
                    addPostFunc={handleAddPost}
                    onCloseAddPostModal={() => {
                        setOpenModal(false);
                    }}
                />
            )}
            <GridRow>
                <GridColumn l={4} l_o={1.5} m={5} m_o={0.5} s={11} s_o={0.5} className={cx('left-content')}>
                    <WrapperModal className={cx('intro')}>
                        <h2>Intro</h2>

                        {!editBio ? (
                            <>
                                {selectedUser?.bio ? <p>{selectedUser?.bio}</p> : <p>Hello world</p>}
                                {isCurrentUser && (
                                    <Button
                                        className={cx('edit-bio-btn')}
                                        long
                                        onClick={() => {
                                            setEditBio(true);
                                            console.log(bio);
                                        }}
                                    >
                                        Edit bio
                                    </Button>
                                )}
                            </>
                        ) : (
                            <div className={cx('edit-bio')}>
                                <Input
                                    value={bioInput}
                                    className={cx('bio-input')}
                                    placeHolder={'Type your bio...'}
                                    onChange={handleEditBio}
                                />
                                <div className={cx('edit-bio-btns')}>
                                    <Button
                                        className={cx('cancel-bio-btn')}
                                        children={'Cancel'}
                                        onClick={() => {
                                            setBioInput(bio);
                                            setEditBio(false);
                                        }}
                                    />
                                    <Button
                                        disabled={saveBioBtnDisable}
                                        className={cx('save-bio-btn')}
                                        children={'Save'}
                                        onClick={() => {
                                            handleSaveBio();
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </WrapperModal>
                    <WrapperModal className={cx('photo')}>
                        <h2>Photo</h2>
                        {!postImgList.length ? (
                            <p>No image found!</p>
                        ) : (
                            <div className={cx('photo-box')}>
                                {postList
                                    ?.slice()
                                    .sort((a, b) => b.date - a.date)
                                    .map(
                                        (post) =>
                                            post?.img && (
                                                <div key={post.postId} className={cx('image-wrapper')}>
                                                    <a href={`/post/${post.postId}`}>
                                                        <img src={post?.img} alt={post.postId} />
                                                    </a>
                                                </div>
                                            ),
                                    )}
                            </div>
                        )}
                    </WrapperModal>
                </GridColumn>
                <GridColumn l={5} m={6} s={11} s_o={0.5} className={cx('right-content')}>
                    {isCurrentUser && (
                        <WrapperModal className={cx('add-post')}>
                            <div className={cx('add-post-top')}>
                                <CircleAvatar
                                    className={cx('add-post-user-avt')}
                                    userName={currentUser.displayName}
                                    avatar={currentUser.photoURL}
                                    diameter="40px"
                                />
                                <Button
                                    className={cx('add-post-only-message-btn')}
                                    children={"What's on your mind?"}
                                    onClick={() => {
                                        setOpenModal(true);
                                        dispatch(setImageInputState({ addPhotoVisible: false, buttonActive: false }));
                                    }}
                                />
                            </div>
                            <div className={cx('add-post-bottom')}>
                                <Button
                                    className={cx('add-post-with-video-btn')}
                                    leftIcon={<FontAwesomeIcon icon={faVideo} />}
                                    children={'Video'}
                                />
                                <Button
                                    className={cx('add-post-with-photo-btn')}
                                    leftIcon={<FontAwesomeIcon icon={faImage} />}
                                    children={'Photo'}
                                    onClick={() => {
                                        setOpenModal(true);
                                        dispatch(setImageInputState({ addPhotoVisible: true, buttonActive: true }));
                                    }}
                                />
                            </div>
                        </WrapperModal>
                    )}

                    {postList.length > 0 ? (
                        postList
                            ?.slice()
                            .sort((a, b) => b.date - a.date)
                            .map((post) => (
                                <PostLayout
                                    key={post.postId}
                                    postId={post.postId}
                                    userId={post?.poster?.uid}
                                    userName={post?.poster?.displayName}
                                    userAvt={post?.poster?.photoURL}
                                    timeStamp={post?.date && moment(post?.date.toDate()).fromNow()}
                                    postImg={post?.img}
                                    postCaption={post?.caption}
                                    like={post?.like}
                                    comment={post?.comment?.length}
                                    deletePostFunc={handleDeletePost}
                                />
                            ))
                    ) : (
                        <h1>No post found</h1>
                    )}
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Posts;
