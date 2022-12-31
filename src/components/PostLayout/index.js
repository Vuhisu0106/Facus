import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useRef, useMemo, useEffect } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

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
    addCommentFunction,
    deleteCommentFunction,
    deletePostFunction,
    editCommentFunction,
    editPostFunction,
    likePostFunction,
} from '~/utils';
import CommentInput from '../Input/CommentInput';
import { db } from '~/firebase/config';
import { useApp } from '~/context/AppContext';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

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
    isPostPage = false,
}) {
    const [posterInfo, setPosterInfo] = useState({});
    const [imgLoading, setImgLoading] = useState(false);

    const [popperVisible, setPopperVisible] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    //Comment
    const [comment, setComment] = useState('');
    const [commentImg, setCommentImg] = useState('');
    const [commentVisible, setCommentVisible] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const commentInputRef = useRef();

    const dispatch = useDispatch();

    const postCommentBefore = useSelector(
        (state) => state.postNcomment.posts.find((post) => post.postId === postId).comment,
    );
    const postComment = postCommentBefore.map((postCmt) => {
        return { ...postCmt, createdAt: postCmt.createdAt.toDate() };
    });

    const { currentUser } = useAuth();
    const { currentUserInfo } = useApp();
    const classes = cx('post-wrapper', { [className]: className });

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        const getPosterInfo = () => {
            const unsub = onSnapshot(doc(db, 'users', userId), (doc) => {
                Object.keys(doc.data()).length > 0 && setPosterInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        userId && getPosterInfo();
    }, [userId]);

    const handleEditPost = async (caption, img, isImgAdded, isImgChanged, isImgDeleted) => {
        await editPostFunction({ currentUser, postId, caption, img, isImgAdded, isImgChanged, isImgDeleted });
        toast.success('Edit post successfully');
        setOpenModal(false);
    };

    const handleLikePost = async () => {
        await likePostFunction(currentUser.uid, like, postId);
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        setCommentVisible(true);
    };

    const handleAddComment = async () => {
        setCommentLoading(true);
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
            img: commentImg,
            createdAt: Timestamp.now(),
            like: [],
        };

        await addCommentFunction(postComment, data, commentImg);
        setCommentLoading(false);
        setComment('');
        setCommentImg('');
        setCommentVisible(true);
    };

    const handleEditComment = async (data) => {
        const updatedComments = postCommentBefore.map((cmt) => {
            return cmt.commentId === data.commentId ? { ...cmt, content: data.comment, img: data.commentImg } : cmt;
        });
        await editCommentFunction(data, updatedComments);
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
        const filterComments = postCommentBefore.filter((x) => x.commentId !== data.commentId);
        if (window.confirm('Do you want delete this comment?')) {
            try {
                await deleteCommentFunction(data, filterComments);
            } catch (error) {
                console.log(error);
            }
        }
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////////////

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
            onClick: async () => {
                setPopperVisible(false);
                try {
                    await deletePostFunction(postId, currentUser.uid);
                    toast.success('Delete post successfully');
                } catch (error) {
                    console.log(error);
                    toast.success('Fail to delete post');
                }
            },
        },
    ];

    const commentInput = () => {
        return (
            <div className={cx('comment__bar')}>
                <CircleAvatar
                    className={cx('comment__user-avt')}
                    userUid={currentUserInfo.uid}
                    userName={currentUserInfo.displayName}
                    avatar={currentUserInfo.photoURL}
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
                    loading={commentLoading}
                />
            </div>
        );
    };

    const commentListMemo = useMemo(() => {
        return (
            <>
                {postComment
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
            </>
        );
    }, [postComment]);

    const commentListJSX = () => {
        return (
            <>
                {commentVisible && (
                    <div
                        className={cx(isPostPage ? 'comment-list-for-post-page' : 'comment-list')}
                        style={{ overflowY: isPostPage ? 'scroll' : 'none' }}
                    >
                        {commentListMemo}
                    </div>
                )}
            </>
        );
    };

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
            <div className={cx('post__header')}>
                <CircleAvatar
                    className={cx('post__user-avt')}
                    userUid={posterInfo.uid}
                    userName={posterInfo.displayName}
                    avatar={posterInfo.photoURL}
                    diameter={'40px'}
                />
                <div className={cx('post__header-info')}>
                    <p className={cx('post__user-name')}>{posterInfo.displayName}</p>
                    <p className={cx('post__time-post')}>{timeStamp}</p>
                </div>
                {currentUser.uid === userId && !isPostPage && (
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
            <div className={cx('post__content')}>
                <div className={cx('post__content--caption')}>
                    <p>{postCaption}</p>
                </div>
                {!isPostPage
                    ? postImg && (
                          <div className={cx('post__content--img')}>
                              {imgLoading ? null : <div className={cx('loading-post-img')} />}
                              <Link to={`/post/${postId}`}>
                                  <img
                                      alt={posterInfo.displayName}
                                      src={typeof postImg === 'object' ? URL.createObjectURL(postImg) : postImg}
                                      style={imgLoading ? {} : { display: 'none' }}
                                      onLoad={() => {
                                          setImgLoading(true);
                                      }}
                                  />
                              </Link>
                          </div>
                      )
                    : ''}
            </div>
            <div className={cx('post__interaction')}>
                {(like.length > 0 || postComment.length > 0) && (
                    <div className={cx('post__interaction--detail')}>
                        {like.length > 0 && (
                            <div className={cx('post__reaction')}>
                                <FontAwesomeIcon className={cx('post__reaction--icon')} icon={faHeartSolid} />{' '}
                                {like && like.indexOf(currentUser.uid) !== -1
                                    ? like.length === 1
                                        ? 'You'
                                        : `You and ${like.length - 1} others`
                                    : like.length}
                            </div>
                        )}

                        {postComment.length > 0 && (
                            <div className={cx('post__comment--count')}>
                                <span onClick={handleOnClickCommentBtn}>
                                    {!postComment
                                        ? ''
                                        : postComment.length + ' ' + (postComment.length > 1 ? 'comments' : 'comment')}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <div className={cx('post__interact')}>
                    <button
                        className={cx('reaction-btn')}
                        onClick={() => {
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

                <div className={cx('post__comment-area')}>
                    {isPostPage ? (
                        <>
                            {commentListJSX()}
                            {commentInput()}
                        </>
                    ) : (
                        <>
                            {commentInput()}
                            {commentListJSX()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostLayout;
