import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCamera, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import CircleAvatar from '../CircleAvatar';
import styles from './CommentItem.module.scss';
import { useAuth } from '~/context/AuthContext';
import Menu from '../Popper/Menu';
import Input from '../Input';
import ImageInputArea from '../Input/ImageInputArea';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, unlikeComment } from '~/features/PostAndComment/PostAndCommentSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase/config';

const cx = classNames.bind(styles);
function CommentItem({ data, editComment, toggleLikeComment, deleteComment }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);

    const [comment, setComment] = useState('');
    const [commentImg, setCommentImg] = useState('');

    const [cancelEdit, setCancelEdit] = useState(false);

    const [commenterInfo, setCommenterInfo] = useState({});

    const { currentUser } = useAuth();
    const dispatch = useDispatch();

    const editedComment = useSelector((state) => {
        const postComment = state.postNcomment.posts.find((post) => post.postId === data.postId).comment;
        return postComment.find((comment) => comment.commentId === data.commentId);
    });

    const MENU_COMMENT = [
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            title: 'Edit comment',
            onClick: () => {
                setIsEditComment(true);
                setIsModalVisible(false);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            title: 'Delete comment',
            onClick: () => {
                deleteComment(data);
            },
        },
    ];

    useEffect(() => {
        const getCommenterInfo = () => {
            const unsub = onSnapshot(doc(db, 'users', data?.commenter.uid), (doc) => {
                Object.keys(doc.data()).length > 0 && setCommenterInfo(doc.data());
            });
            return () => {
                unsub();
            };
        };

        data?.commenter.uid && getCommenterInfo();
    }, [data?.commenter.uid]);

    useEffect(() => {
        if (editedComment) {
            setComment(editedComment.content);
            setCommentImg(editedComment.img);
        }
    }, [editedComment, cancelEdit]);

    const handleLikeComment = async (commentId) => {
        if (data.like.indexOf(currentUser.uid) === -1) {
            data.like = [...data.like, currentUser.uid];
            toggleLikeComment({
                dataComment: data,
                postId: data.postId,
                commentId,
            });
            dispatch(likeComment({ currentUserUid: currentUser.uid, postId: data.postId, commentId }));
        } else {
            const likeIndex = data.like.indexOf(currentUser.uid);
            if (likeIndex !== -1) {
                var newLike = [...data.like];
                newLike.splice(likeIndex, 1);
                data.like = newLike;
            }
            dispatch(unlikeComment({ currentUserUid: currentUser.uid, postId: data.postId, commentId }));
            toggleLikeComment({
                dataComment: data,
                postId: data.postId,
                commentId,
            });
        }
    };

    //Edit comment
    const handleCommentInput = (e) => {
        const sendValueInput = e.target.value;

        if (!sendValueInput.startsWith(' ')) {
            setComment(sendValueInput);
        } else {
            return;
        }
    };

    const handleEditComment = async () => {
        setIsEditComment(false);
        const dataEdit = { postId: data.postId, commentId: data.commentId, comment, commentImg };
        //if prev comment already has image
        if (editedComment.img) {
            if (commentImg === editedComment.img) {
                await editComment({ ...dataEdit, commentImg: editedComment.img });
            } else if (!commentImg) {
                await editComment({ ...dataEdit, isImgChanged: false, isImgDeleted: true });
            } else {
                await editComment({ ...dataEdit, isImgChanged: true });
            }
        } else {
            if (commentImg) {
                await editComment({ ...dataEdit, isImgChanged: true, isImgAdded: true });
            } else {
                await editComment(dataEdit);
            }
        }
    };

    const editCommentJSX = () => {
        return (
            <>
                <Input
                    value={comment}
                    type="text"
                    rightIcon={<FontAwesomeIcon icon={faCamera} />}
                    onChangeRightBtn={(e) => {
                        setCommentImg(e.target.files[0]);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleEditComment();
                        }
                    }}
                    onChange={handleCommentInput}
                    rightBtnTypeFile
                />
                {commentImg && (
                    <ImageInputArea
                        src={typeof commentImg === 'object' ? URL.createObjectURL(commentImg) : commentImg}
                        onClickCancel={() => {
                            setCommentImg('');
                        }}
                    />
                )}
                <div className={cx('edit-cmt__footer--btns')}>
                    <span
                        onClick={() => {
                            setIsEditComment(false);
                            setCancelEdit(!cancelEdit);
                        }}
                    >
                        Cancel
                    </span>
                    <span
                        onClick={() => {
                            handleEditComment();
                        }}
                    >
                        Done
                    </span>
                </div>
            </>
        );
    };

    return (
        <div className={cx('wrapper')} key={data.commentId}>
            <CircleAvatar
                userUid={commenterInfo.uid}
                userName={commenterInfo.displayName}
                avatar={commenterInfo.photoURL}
                diameter="32px"
            />
            {isEditComment ? (
                <div className={cx('edit-cmt__content')}>{editCommentJSX()}</div>
            ) : (
                <div className={cx('comment__content--wrapper')}>
                    <div className={cx('comment__content--text-wrapper')}>
                        <div
                            className={cx(
                                'comment__content--text',
                                !data?.content && data?.img ? 'no-text-wrapper' : '',
                            )}
                        >
                            <div className={cx('comment__user-name')}>{commenterInfo.displayName}</div>
                            <div className={cx('comment__text--content')}>{data?.content}</div>

                            {/* Use data from rendering in this component (not from props of parents component) must check if they exist or not */}
                            {!data.img && data?.like?.length > 0 && (
                                <div className={cx('comment__reaction')}>
                                    <FontAwesomeIcon className={cx('comment__reaction--icon')} icon={faHeartSolid} />
                                    {data && data.like.length > 1 && (
                                        <div className={cx('comment__reaction--count')}>{data && data.like.length}</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {data.commenter.uid === currentUser.uid && (
                            <Menu
                                items={MENU_COMMENT}
                                placement={'bottom-start'}
                                isMenuVisible={isModalVisible}
                                onClickOutside={() => {
                                    setIsModalVisible(false);
                                }}
                            >
                                <div
                                    className={cx('comment-setting')}
                                    onClick={() => {
                                        setIsModalVisible(!isModalVisible);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEllipsis} />
                                </div>
                            </Menu>
                        )}
                    </div>

                    {data?.img && (
                        <div className={cx('comment__content--img')}>
                            <img
                                className={cx('comment__image')}
                                src={typeof data?.img === 'object' ? URL.createObjectURL(data?.img) : data?.img}
                                alt=""
                            />
                            {data.like && data.like.length > 0 && (
                                <div className={cx('comment__img--reaction')}>
                                    <FontAwesomeIcon className={cx('comment__reaction--icon')} icon={faHeartSolid} />
                                    {data?.like?.length > 1 && (
                                        <div className={cx('comment__reaction--count')}>{data?.like?.length}</div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={cx('comment__interact')}>
                        <button
                            className={cx('comment__like-btn')}
                            style={{
                                color: data.like && data.like.indexOf(currentUser.uid) !== -1 && '#fe2c55',
                            }}
                            onClick={() => handleLikeComment(data.commentId)}
                        >
                            Like
                        </button>
                        <button
                            className={cx('comment__reply-btn')}
                            onClick={() => {
                                console.log(data);
                            }}
                        >
                            Reply
                        </button>
                        <span>{data.createdAt && moment(data.createdAt).fromNow()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommentItem;
