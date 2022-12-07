import { faCamera, faEllipsis, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { serverTimestamp, collection, query, where, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { db } from '~/firebase/config';

import { storage } from '~/firebase/config';
import styles from './PostLayout.module.scss';
import Input from '~/components/Input';
import { faHeart as faHeartRegular, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/context/AuthContext';
import CircleAvatar from '../CircleAvatar';
import CommentItem from '../CommentItem';
import { useUI } from '~/context/UIContext';
import Menu from '../Popper/Menu';
import ImageInputArea from '../Input/ImageInputArea';
import AddPostModal from '../Modal/Modal/AddPostModal';
import { setDocument } from '~/firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import { useViewport } from '../Hook';
import { deleteCommentFunction, deletePost, editPost, likePost } from '~/utils';
import { addComment, deleteComment, setComments } from '~/features/PostAndComment/PostAndCommentSlice';

const cx = classNames.bind(styles);
function PostLayout({
    className,
    userId,
    postId,
    userName,
    userAvt,
    timeStamp,
    postImg,
    postCaption,
    like,
    commentCount,
    postPage,
}) {
    const { currentUser } = useAuth();
    const { checkDark } = useUI();

    const [popperVisible, setPopperVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    //Comment
    const [comment, setComment] = useState('');
    const [commentImg, setCommentImg] = useState(null);
    const [commentList, setCommentList] = useState([]);
    const [commentVisible, setCommentVisible] = useState(false);
    const [isAddComment, setIsAddComment] = useState(false);

    const commentInputRef = useRef();

    const dispatch = useDispatch();
    const postComment = useSelector((state) => state.postNcomment.posts.find((post) => post.postId === postId).comment);

    const viewPort = useViewport();
    const isSmall = viewPort.width <= 740;

    const classes = cx('post-wrapper', checkDark(), { [className]: className });

    useEffect(() => {
        const unSub = async () => {
            const q = query(collection(db, 'comment'), where('postId', '==', postId));
            try {
                const querySnapshot = await getDocs(q);

                const comments = [];
                querySnapshot.forEach((doc) => {
                    comments.push(doc.data());
                });
                dispatch(
                    setComments({
                        postId: postId,
                        comments: comments.map((comment) => {
                            return { ...comment, createdAt: comment.createdAt.toDate() };
                        }),
                    }),
                );

                // setCommentList(
                //     querySnapshot.docs.map((doc) => {
                //         const data = doc.data();

                //         return { ...data, createdAt: data.createdAt.toDate() };
                //     }),
                // );
                //setLoading(false);
            } catch (err) {
                console.log(err);
                //setLoading(false);
            }
        };

        unSub();
    }, [postId]);

    const handleCommentInput = (e) => {
        const sendValueInput = e.target.value;

        if (!sendValueInput.startsWith(' ')) {
            setComment(sendValueInput);
        } else {
            return;
        }
    };

    const handleOnClickCommentBtn = () => {
        commentInputRef.current.focus();
        (!isSmall || !postPage) && setCommentVisible(true);
    };

    const handleComment = async () => {
        let uuId = uuid();

        const data = {
            commentId: uuId,
            postId: postId,
            commenter: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
            },
            content: comment,
            createdAt: serverTimestamp(),
            like: [],
        };

        if (commentImg) {
            const storageRef = ref(storage, uuId);

            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    // const data = {
                    //     commentId: uuId,
                    //     postId: postId,
                    //     commenter: {
                    //         uid: currentUser.uid,
                    //         displayName: currentUser.displayName,
                    //         photoURL: currentUser.photoURL,
                    //     },
                    //     content: comment,
                    //     img: downloadURL,
                    //     createdAt: serverTimestamp(),
                    //     like: [],
                    // };
                    await setDocument('comment', uuId, {
                        ...data,
                        img: downloadURL,
                    });
                    dispatch(addComment({ postId: postId, comment: { ...data, createdAt: new Date() } }));
                    // setCommentList([
                    //     ...commentList,
                    //     {
                    //         ...data,
                    //         createdAt: new Date(),
                    //     },
                    // ]);
                });
            });
        } else if (!comment && !commentImg) {
            return;
        } else {
            await setDocument('comment', uuId, {
                ...data,
            });
            dispatch(addComment({ postId: postId, comment: { ...data, createdAt: new Date() } }));
            // await setDocument('comment', uuId, {
            //     commentId: uuId,
            //     postId: postId,
            //     commenter: {
            //         uid: currentUser.uid,
            //         displayName: currentUser.displayName,
            //         photoURL: currentUser.photoURL,
            //     },

            //     content: comment,
            //     createdAt: serverTimestamp(),
            //     like: [],
            // });
        }

        setComment('');
        setCommentImg(null);
        setIsAddComment(!isAddComment);
        console.log(uuId);
    };

    const handleDeleteComment = async (data) => {
        const filteredComments = postComment.filter((x) => x.commentId !== data.commentId);
        if (window.confirm('Do you want delete this comment?')) {
            try {
                await deleteCommentFunction(data);
                console.log({ postId, filteredComments });
                if (postId && filteredComments) {
                    dispatch(deleteComment({ postId, filteredComments }));
                }
                //setCommentList((cmtList) => cmtList.filter((x) => x.commentId !== commentId));
            } catch (error) {
                console.log(error);
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleEditPost = async (caption, img, isImgChanged, isImgDeleted) => {
        // if (img) {
        //     if (isImgChanged) {
        //         await deleteFileStorage(postId);
        //     }
        //     const storageRef = ref(storage, postId);

        //     //const uploadTask = await uploadBytesResumable(storageRef, img);
        //     await uploadBytesResumable(storageRef, img).then(() => {
        //         getDownloadURL(storageRef).then(async (downloadURL) => {
        //             await updateDocument('userPost', currentUser.uid, {
        //                 [postId + '.caption']: caption,
        //                 [postId + '.img']: downloadURL,
        //             });

        //             await updateDocument('post', postId, {
        //                 caption: caption,
        //                 img: downloadURL,
        //             });
        //         });
        //     });
        //     console.log('1');
        // } else if (!caption && !img) {
        //     return;
        // } else if (isImgDeleted) {
        //     await deleteFileStorage(postId);
        //     await updateDocument('userPost', currentUser.uid, {
        //         [postId + '.caption']: caption,
        //         [postId + '.img']: '',
        //     });
        //     await updateDocument('post', postId, {
        //         caption: caption,
        //         img: '',
        //     });
        //     console.log('3');
        // } else {
        //     console.log('4');
        //     await updateDocument('userPost', currentUser.uid, {
        //         [postId + '.caption']: caption,
        //     });
        //     await updateDocument('post', postId, {
        //         caption: caption,
        //     });
        // }
        await editPost({ currentUser, postId, caption, img, isImgChanged, isImgDeleted });
        setOpenModal(false);
    };

    const MENU_POST = [
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            title: 'Edit post',
            onClick: () => {
                setPopperVisible(false);
                setOpenModal(true);
                dispatch(setImageInputState({ addPhotoVisible: true, buttonActive: true }));
            },
        },
        {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            title: 'Delete post',
            onClick: () => {
                setPopperVisible(false);
                deletePost(postId, currentUser.uid);
            },
        },
    ];

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className={classes}>
            {openModal && (
                <AddPostModal
                    editPostId={postId}
                    edit
                    editPostFunc={handleEditPost}
                    onCloseAddPostModal={() => {
                        setOpenModal(false);
                    }}
                />
            )}
            <div className={cx('post-header')}>
                <img className={cx('user-avt')} alt={userName} src={userAvt} />
                <div className={cx('post-header-info')}>
                    <p className={cx('user-name')}>{userName}</p>
                    <p className={cx('time-post')}>{timeStamp}</p>
                </div>
                {currentUser.uid === userId && (
                    <Menu
                        items={MENU_POST}
                        isMenuVisible={popperVisible}
                        onClickOutside={() => {
                            setPopperVisible(false);
                        }}
                    >
                        <div
                            className={cx('more-btn')}
                            onClick={() => {
                                setPopperVisible(!popperVisible);
                            }}
                        >
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </Menu>
                )}
            </div>
            <div className={cx('post-content')}>
                <div className={cx('post-caption')}>
                    <p>{postCaption}</p>
                </div>
                {!postPage
                    ? postImg && (
                          <div className={cx('post-image')}>
                              <a href={`/post/${postId}`}>
                                  <img alt={userName} src={postImg} />
                              </a>
                          </div>
                      )
                    : ''}
            </div>
            <div className={cx('post-interaction')}>
                {(like.length > 0 || postComment.length > 0) && (
                    <div className={cx('post-interaction-detail')}>
                        {like.length > 0 && (
                            <div className={cx('post-reaction-detail')}>
                                <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeartSolid} />{' '}
                                {like && like.indexOf(currentUser.uid) !== -1
                                    ? like.length === 1
                                        ? 'You'
                                        : 'You and ' + (like.length - 1)
                                    : like.length}
                            </div>
                        )}

                        {postComment.length > 0 && (
                            <div className={cx('post-comment-detail')}>
                                <span onClick={handleOnClickCommentBtn}>
                                    {!postComment
                                        ? ''
                                        : postComment.length + ' ' + (postComment.length > 1 ? 'comments' : 'comment')}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <div className={cx('post-interact')}>
                    <button
                        className={cx('reaction-btn')}
                        onClick={() => {
                            likePost(currentUser.uid, like, postId, userId);
                        }}
                    >
                        {like && like.indexOf(currentUser.uid) !== -1 ? (
                            <>
                                <FontAwesomeIcon icon={faHeartSolid} style={{ color: '#fe2c55' }} />
                                <span style={{ color: '#fe2c55' }}>Like</span>
                            </>
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faHeartRegular} />
                                <span>Like</span>
                            </>
                        )}
                    </button>
                    <button
                        className={cx('comment-btn')}
                        onClick={() => {
                            handleOnClickCommentBtn();
                            //console.log('comment list: ' + commentList.length);
                        }}
                    >
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comment</span>
                    </button>
                </div>
                <div className={cx('comment-bar')}>
                    <CircleAvatar
                        className={cx('user-avt-comment')}
                        userName={currentUser.displayName}
                        avatar={currentUser.photoURL}
                    />

                    <div className={cx('comment-input-area')}>
                        {isSmall ? (
                            <Input
                                className={cx('comment-input')}
                                value={comment}
                                type="text"
                                placeHolder={'Write comment here...'}
                                inputRef={commentInputRef}
                                leftIcon={<FontAwesomeIcon icon={faCamera} />}
                                onChange={handleCommentInput}
                                leftBtnTypeFile
                                onChangeLeftBtn={(e) => {
                                    setCommentImg(e.target.files[0]);
                                }}
                                rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                                onClickRightBtn={() => {
                                    handleComment();
                                }}
                            />
                        ) : (
                            <Input
                                className={cx('comment-input')}
                                value={comment}
                                type="text"
                                placeHolder={'Write comment here...'}
                                inputRef={commentInputRef}
                                rightIcon={<FontAwesomeIcon icon={faCamera} />}
                                onChange={handleCommentInput}
                                rightBtnTypeFile
                                onChangeRightBtn={(e) => {
                                    setCommentImg(e.target.files[0]);
                                }}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        handleComment();
                                    }
                                }}
                            />
                        )}
                        {commentImg && (
                            <ImageInputArea
                                src={URL.createObjectURL(commentImg)}
                                onClickCancel={() => {
                                    setCommentImg(null);
                                }}
                            />
                        )}
                    </div>
                </div>
                {commentVisible && (
                    <div
                        className={cx(!postPage ? 'comment-list' : 'comment-list-for-post-page')}
                        style={{ overflowY: !postPage ? 'none' : isSmall && 'hidden' }}
                    >
                        {postComment &&
                            postComment
                                ?.slice()
                                .sort((a, b) => b.createdAt - a.createdAt)
                                .map((comments) => (
                                    <CommentItem
                                        key={comments.commentId}
                                        data={comments}
                                        deleteComment={handleDeleteComment}
                                    />
                                ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostLayout;
