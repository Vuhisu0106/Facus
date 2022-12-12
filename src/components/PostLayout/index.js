import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef } from 'react';
import { Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';

import { storage } from '~/firebase/config';
import styles from './PostLayout.module.scss';
import { faHeart as faHeartRegular, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useAuth } from '~/context/AuthContext';
import CircleAvatar from '../CircleAvatar';
import CommentItem from '../CommentItem';
import Menu from '../Popper/Menu';
import AddPostModal from '../Modal/Modal/AddPostModal';
import { updateDocument } from '~/firebase/services';
import { useDispatch, useSelector } from 'react-redux';
import { setImageInputState } from '~/features/Modal/ModalSlice';
import {
    deleteCommentFunction,
    deletePostFunction,
    editCommentFunction,
    editPostFunction,
    likePostFunction,
    unlikePostFunction,
} from '~/utils';
import {
    addComment,
    deleteComment,
    deletePost,
    editComment,
    editPost,
    likePost,
} from '~/features/PostAndComment/PostAndCommentSlice';
import CommentInput from '../Input/CommentInput';

const cx = classNames.bind(styles);
function PostLayout({ className, userId, postId, userName, userAvt, timeStamp, postImg, postCaption, like, postPage }) {
    const [popperVisible, setPopperVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    //Comment
    const [comment, setComment] = useState('');
    const [commentImg, setCommentImg] = useState('');
    const [commentVisible, setCommentVisible] = useState(false);
    const commentInputRef = useRef();

    const dispatch = useDispatch();
    // const postComment = useSelector((state) => {
    //     const postComment = state.postNcomment.posts.find((post) => post.postId === postId).comment;
    //     return postComment.map((postCmt) => {
    //         return { ...postCmt, createdAt: postCmt.createdAt.toDate() };
    //     });
    // });

    const postCommentBefore = useSelector(
        (state) => state.postNcomment.posts.find((post) => post.postId === postId).comment,
    );
    const postComment = postCommentBefore.map((postCmt) => {
        return { ...postCmt, createdAt: postCmt.createdAt.toDate() };
    });

    const { currentUser } = useAuth();
    const classes = cx('post-wrapper', { [className]: className });

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
        //(viewport.device !== MOBILE || !postPage) && setCommentVisible(true);
        !postPage && setCommentVisible(true);
    };

    const handleAddComment = async () => {
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
            createdAt: new Date(),
            like: [],
        };
        if (commentImg) {
            const storageRef = ref(storage, uuId);
            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDocument('post', data.postId, {
                        comment: [
                            ...postComment,
                            {
                                ...data,
                                img: downloadURL,
                            },
                        ],
                    });
                    dispatch(
                        addComment({
                            postId: postId,
                            comment: { ...data, img: downloadURL, createdAt: Timestamp.now() },
                        }),
                    );
                });
            });
        } else if (!comment && !commentImg) {
            return;
        } else {
            await updateDocument('post', data.postId, {
                comment: [
                    ...postComment,
                    {
                        ...data,
                    },
                ],
            });
            dispatch(addComment({ postId: postId, comment: { ...data, createdAt: Timestamp.now() } }));
        }
        setComment('');
        setCommentImg('');
    };

    const handleEditComment = async (data) => {
        const updatedComments = postCommentBefore.map((cmt) => {
            return cmt.commentId === data.commentId ? { ...cmt, content: data.comment, img: data.commentImg } : cmt;
        });
        await editCommentFunction(data, updatedComments);
        dispatch(editComment({ postId, updatedComments }));
    };

    const handleToggleLikeComment = async (data) => {
        const updateComments = postCommentBefore.map((cmt) => {
            return cmt.commentId === data.commentId ? data.dataComment : cmt;
        });
        await updateDocument('post', data.postId, {
            comment: [...updateComments],
        });
    };

    const handleDeleteComment = async (data) => {
        const filteredComments = postCommentBefore.filter((x) => x.commentId !== data.commentId);
        if (window.confirm('Do you want delete this comment?')) {
            try {
                await deleteCommentFunction(data, filteredComments);
                dispatch(deleteComment({ postId, filteredComments }));
            } catch (error) {
                console.log(error);
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    const handleEditPost = async (caption, img, isImgAdded, isImgChanged, isImgDeleted) => {
        await editPostFunction({ currentUser, postId, caption, img, isImgAdded, isImgChanged, isImgDeleted });
        dispatch(editPost({ postId, caption, img }));
        setOpenModal(false);
    };

    const handleLikePost = async () => {
        dispatch(likePost({ currentUserUid: currentUser.uid, like, postId }));
        likePostFunction(currentUser.uid, like, postId);
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
                deletePostFunction(postId, currentUser.uid);
                dispatch(deletePost({ postId }));
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
                {currentUser.uid === userId && !postPage && (
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
                                  <img
                                      alt={userName}
                                      src={typeof postImg === 'object' ? URL.createObjectURL(postImg) : postImg}
                                  />
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
                            //likePost(currentUser.uid, like, postId, userId);
                            handleLikePost();
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

                    <CommentInput
                        commentValue={comment}
                        commentInputRef={commentInputRef}
                        handleCommentInput={handleCommentInput}
                        handleAddComment={() => {
                            handleAddComment();
                        }}
                        commentImg={commentImg}
                        onChangeImage={(e) => {
                            setCommentImg(e.target.files[0]);
                        }}
                        cancelImage={() => {
                            setCommentImg('');
                        }}
                    />
                </div>
                {commentVisible && (
                    <div
                        className={cx(!postPage ? 'comment-list' : 'comment-list-for-post-page')}
                        //style={{ overflowY: !postPage ? 'none' : viewport.device === MOBILE && 'hidden' }}
                        style={{ overflowY: !postPage ? 'none' : 'hidden' }}
                    >
                        {postComment &&
                            postComment
                                ?.slice()
                                .sort((a, b) => b.createdAt - a.createdAt)
                                .map((comments) => (
                                    <CommentItem
                                        key={comments.commentId}
                                        data={comments}
                                        editComment={handleEditComment}
                                        toggleLikeComment={handleToggleLikeComment}
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
