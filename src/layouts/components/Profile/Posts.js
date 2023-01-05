import classNames from 'classnames/bind';
import { useState, useEffect, useMemo } from 'react';
import { query, collection, where, getDocs, Timestamp } from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faHouse, faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { db } from '~/firebase/config';
import Button from '~/components/Button';
import WrapperModal from '~/components/Wrapper';
import PostLayout from '~/components/PostLayout';
import styles from './Profile.module.scss';
import { useAuth } from '~/context/AuthContext';
import { UserAvatar } from '~/components/AccountItem';
import Input from '~/components/Input';
import AddPostModal from '~/components/Modal/Modal/AddPostModal';
import { updateDocument } from '~/firebase/services';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import { setBio } from '~/features/Profile/ProfileSlice';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';
import { addPostFunction } from '~/utils';
import { useApp } from '~/context/AppContext';
import { toast } from 'react-toastify';
import { LoadingPost } from '~/components/Loading';
import { LoadingIcon } from '~/components/Icon';

const cx = classNames.bind(styles);
function Posts({ selectedUser, isCurrentUser = false }) {
    const { currentUser } = useAuth();
    const { currentUserInfo, adminInfo } = useApp();
    const dispatch = useDispatch();
    const bio = useSelector((state) => state.profile.bio);
    const postList = useSelector((state) => state.postNcomment.posts);

    const [bioInput, setBioInput] = useState(bio || '');
    const [editBio, setEditBio] = useState(false);
    const [saveBioBtnDisable, setSaveBioBtnDisable] = useState(true);

    const [loading, setLoading] = useState(false);
    const [bioLoading, setBioLoading] = useState(false);

    //Add post modal
    const [openModal, setOpenModal] = useState(false);

    const postImgList = [];
    postList.forEach((data) => {
        if (data.img) return postImgList.push(data);
    });

    useEffect(() => {
        setLoading(true);
        const getPost = async () => {
            const q = query(collection(db, 'post'), where('poster.uid', '==', selectedUser.uid));

            try {
                dispatch(resetPost());
                const querySnapshot = await getDocs(q);
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data() });
                });
                dispatch(setPost([...posts]));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
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
        setBioLoading(true);
        try {
            await updateDocument('users', currentUser.uid, {
                bio: bioInput,
            });
            dispatch(
                setBio({
                    bio: bioInput,
                }),
            );
            setBioLoading(false);
        } catch (error) {
            toast.error('Fail to set bio');
            setBioLoading(false);
        }
        setEditBio(false);
    };

    //Add post
    const handleAddPost = async (caption, img) => {
        let uuId = uuid();
        const data = {
            postId: uuId,
            poster: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
            },
            caption: caption,
            date: Timestamp.now(),
            img: img,
            like: [],
            comment: [],
        };

        await addPostFunction(data, img);
    };

    const postListMemo = useMemo(() => {
        return (
            <>
                {postList.length > 0 ? (
                    <>
                        {postList
                            ?.slice()
                            .sort((a, b) => b.date - a.date)
                            .map((post) => (
                                <PostLayout
                                    key={post.postId}
                                    postId={post.postId}
                                    userId={post.poster.uid}
                                    userName={post.poster.displayName}
                                    userAvt={post.poster?.photoURL}
                                    timeStamp={post.date && moment(post.date.toDate()).fromNow()}
                                    postImg={post.img}
                                    postCaption={post.caption}
                                    like={post.like}
                                    comment={post.comment.length}
                                />
                            ))}
                        <h3>There are no more posts to show right now.</h3>
                    </>
                ) : (
                    <h1>No post found</h1>
                )}
            </>
        );
    }, [postList]);

    const adminInfoJSX = () => {
        return (
            <div className={cx('admin__intro')}>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faHouse} />
                    </span>
                    <h5>
                        Live in <span>Hanoi, Vietnam</span>
                    </h5>
                </div>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faGraduationCap} />
                    </span>
                    <h5>
                        Studies Software Engineering at <span>HUCE</span>
                    </h5>
                </div>
                <div>
                    <span>
                        <FontAwesomeIcon icon={faGithub} />
                    </span>
                    <a href="https://github.com/Vuhisu0106">https://github.com/Vuhisu0106</a>
                </div>
            </div>
        );
    };

    return (
        <Grid type={'profile'} className={cx('wrapper')}>
            {openModal && (
                <AddPostModal
                    onAddPost={handleAddPost}
                    onCloseAddPostModal={() => {
                        setOpenModal(false);
                    }}
                />
            )}
            <GridRow>
                <GridColumn l={4} l_o={1.5} m={5} m_o={0.5} s={11} s_o={0.5}>
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
                                        disabled={saveBioBtnDisable || bioLoading}
                                        className={cx('save-bio-btn')}
                                        children={bioLoading ? <LoadingIcon type={'button'} /> : 'Save'}
                                        onClick={handleSaveBio}
                                    />
                                </div>
                            </div>
                        )}

                        {adminInfo.uid === selectedUser.uid && adminInfoJSX()}
                    </WrapperModal>
                    <WrapperModal className={cx('photo')}>
                        <h2>Photo</h2>
                        {postImgList.length === 0 ? (
                            <p>No image found!</p>
                        ) : (
                            <div className={cx('photo-box')}>
                                {postImgList
                                    ?.slice()
                                    .sort((a, b) => b.date - a.date)
                                    .map((post) => (
                                        <div key={post.postId} className={cx('image-wrapper')}>
                                            <Link to={'/post/' + post.postId}>
                                                <img
                                                    src={
                                                        typeof post?.img === 'object'
                                                            ? URL.createObjectURL(post?.img)
                                                            : post?.img
                                                    }
                                                    alt={post.postId}
                                                />
                                            </Link>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </WrapperModal>
                </GridColumn>
                <GridColumn l={5} m={6} s={11} s_o={0.5} className={cx('right-content')}>
                    {isCurrentUser && (
                        <WrapperModal className={cx('add-post')}>
                            <div className={cx('add-post-top')}>
                                <UserAvatar
                                    className={cx('add-post-user-avt')}
                                    userUid={currentUserInfo.uid}
                                    userName={currentUserInfo.displayName}
                                    avatar={currentUserInfo.photoURL}
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
                                    onClick={() => {
                                        toast.error('Sorry, this feature is not ready');
                                    }}
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

                    {loading ? <LoadingPost /> : postListMemo}
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Posts;
