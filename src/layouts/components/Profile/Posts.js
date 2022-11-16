import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { onSnapshot, doc, serverTimestamp, deleteField, arrayUnion } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import moment from 'moment';

import { db, storage } from '~/firebase/config';
import Button from '~/components/Button';
import WrapperModal from '~/components/Wrapper';
import PostLayout from '~/components/PostLayout';
import styles from './Profile.module.scss';
import { useAuth } from '~/context/AuthContext';
import { useUI } from '~/context/UIContext';
import CircleAvatar from '~/components/CircleAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';
import Input from '~/components/Input';
import AddPostModal from '~/components/Modal/Modal/AddPostModal';
import { deleteDocument, setDocument, updateDocument } from '~/firebase/services';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';
import { useDispatch, useSelector } from 'react-redux';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import { setBio } from '~/features/Profile/ProfileSlice';

const cx = classNames.bind(styles);
function Posts({ selectedUser, isCurrentUser = false }) {
    const { currentUser } = useAuth();
    const { checkDark } = useUI();

    const dispatch = useDispatch();
    const bio = useSelector((state) => state.profile.bio);

    const [postList, setPostList] = useState([]);
    const [bioInput, setBioInput] = useState(bio || '');
    const [editBio, setEditBio] = useState(false);
    const [saveBioBtnDisable, setSaveBioBtnDisable] = useState(true);

    //Add post modal
    const [openModal, setOpenModal] = useState(false);

    const postImgList = [];
    postList.forEach((data) => {
        if (data[1].img) return postImgList.push(data[1].img);
    });

    useEffect(() => {
        const getPost = () => {
            const unsub = onSnapshot(doc(db, 'userPost', selectedUser.uid), (doc) => {
                doc.data() ? setPostList(Object.entries(doc.data())) : setPostList([]);
            });

            return () => {
                unsub();
            };
        };

        selectedUser && getPost();
    }, [selectedUser]);

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
        setOpenModal(false);
        let uuId = uuid();
        if (img) {
            const storageRef = ref(storage, uuid());
            //const uploadTask = await uploadBytesResumable(storageRef, img);

            await uploadBytesResumable(storageRef, img).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDocument('userPost', currentUser.uid, {
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

                    await setDocument('post', uuId, {
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
            await updateDocument('userPost', currentUser.uid, {
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
            await setDocument('post', uuId, {
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
        <Grid type={'profile'} className={cx('wrapper', checkDark('dark-post'))}>
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
                                    ?.sort((a, b) => b[1].date - a[1].date)
                                    .map(
                                        (post) =>
                                            post[1].img && (
                                                <div key={post[0]}>
                                                    <a href={`/post/${post[0]}`}>
                                                        <img src={post[1]?.img} alt={post[0]} />
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
                            ?.sort((a, b) => b[1].date - a[1].date)
                            .map((post) => (
                                <PostLayout
                                    key={post[0]}
                                    postId={post[0]}
                                    userId={post[1]?.poster?.uid}
                                    userName={post[1]?.poster?.displayName}
                                    userAvt={post[1]?.poster?.photoURL}
                                    timeStamp={post[1]?.date && moment(post[1]?.date.toDate()).fromNow()}
                                    postImg={post[1]?.img && post[1]?.img}
                                    postCaption={post[1]?.caption}
                                    likeCount={post[1]?.like?.length}
                                    commentCount={post[1]?.comment?.length}
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
