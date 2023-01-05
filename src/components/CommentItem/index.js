import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCamera, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { memo, useEffect, useState } from 'react';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { UserAvatar, UserName } from '../AccountItem';
import styles from './CommentItem.module.scss';
import { useAuth } from '~/context/AuthContext';
import Menu from '../Popper/Menu';
import Input from '../Input';
import ImageInputArea from '../Input/ImageInputArea';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, unlikeComment } from '~/features/PostAndComment/PostAndCommentSlice';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '~/firebase/config';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
function CommentItem({ className, data, posterUid, onEditComment, onToggleLikeComment, onDeleteComment }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);
    const [comment, setComment] = useState('');
    const [commentImg, setCommentImg] = useState('');
    const [cancelEdit, setCancelEdit] = useState(false);
    const [commenterInfo, setCommenterInfo] = useState({});
    const [isReplyCmtVisible, setIsReplyCmtVisible] = useState(false);

    const { currentUser } = useAuth();
    const { adminInfo } = useApp();
    const dispatch = useDispatch();

    const editedComment = useSelector((state) => {
        const postComment = state.postNcomment.posts.find((post) => post.postId === data.postId).comment;
        return postComment.find((comment) => comment.commentId === data.commentId);
    });

    console.log('render cmt');

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
                onDeleteComment(data);
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
            onToggleLikeComment({
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
            onToggleLikeComment({
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
                await onEditComment({ ...dataEdit, commentImg: editedComment.img });
            } else if (!commentImg) {
                await onEditComment({ ...dataEdit, isImgChanged: false, isImgDeleted: true });
            } else {
                await onEditComment({ ...dataEdit, isImgChanged: true });
            }
        } else {
            if (commentImg) {
                await onEditComment({ ...dataEdit, isImgChanged: true, isImgAdded: true });
            } else {
                await onEditComment(dataEdit);
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

    const classes = cx('wrapper', { [className]: className });

    return (
        <div className={classes} key={data.commentId}>
            <div className={cx('comment__avt')}>
                <UserAvatar
                    userUid={commenterInfo.uid}
                    userName={commenterInfo.displayName}
                    avatar={commenterInfo.photoURL}
                    diameter="32px"
                />
            </div>
            {isEditComment ? (
                <div className={cx('edit-cmt__content')}>{editCommentJSX()}</div>
            ) : (
                <div className={cx('comment__wrapper')}>
                    <div className={cx('comment__content--wrapper')}>
                        <div className={cx('comment__content--text-wrapper')}>
                            <div
                                className={cx(
                                    'comment__content--text',
                                    !data?.content && data?.img ? 'no-text-wrapper' : '',
                                )}
                            >
                                <UserName
                                    userUid={commenterInfo.uid}
                                    userName={commenterInfo.displayName}
                                    size={'small'}
                                    isCreator={data.commenter.uid === posterUid}
                                    isAdmin={commenterInfo.isAdmin}
                                />
                                <div className={cx('comment__text--content')}>{data?.content}</div>

                                {/* Use data from rendering in this component (not from props of parents component) must check if they exist or not */}
                                {!data.img && data?.like?.length > 0 && (
                                    <div className={cx('comment__reaction')}>
                                        <FontAwesomeIcon
                                            className={cx('comment__reaction--icon')}
                                            icon={faHeartSolid}
                                        />
                                        {data && data.like.length > 1 && (
                                            <div className={cx('comment__reaction--count')}>
                                                {data && data.like.length}
                                            </div>
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
                                        className={cx('comment__setting')}
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
                                        <FontAwesomeIcon
                                            className={cx('comment__reaction--icon')}
                                            icon={faHeartSolid}
                                        />
                                        {data?.like?.length > 1 && (
                                            <div className={cx('comment__reaction--count')}>{data?.like?.length}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        {
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
                                    style={{
                                        color: isReplyCmtVisible && '#fe2c55',
                                    }}
                                    onClick={() => {
                                        setIsReplyCmtVisible(!isReplyCmtVisible);
                                    }}
                                >
                                    Reply
                                </button>
                                <span>{data.createdAt && moment(data.createdAt).fromNow()}</span>
                            </div>
                        }
                        {isReplyCmtVisible && <div className={cx('reply-comment__border')}></div>}
                    </div>
                    {/* Reply commment */}

                    {isReplyCmtVisible && (
                        <div className={cx('reply-comment')}>
                            <div className={cx('reply-comment__avt')}>
                                <UserAvatar
                                    userUid={adminInfo.uid}
                                    userName={adminInfo.displayName}
                                    avatar={adminInfo.photoURL}
                                    diameter="32px"
                                />
                            </div>
                            <div className={cx('reply-comment__content--text-wrapper')}>
                                <div className={cx('comment__content--text')}>
                                    <UserName
                                        userName={adminInfo.displayName}
                                        userUid={adminInfo.uid}
                                        size={'small'}
                                        isAdmin={true}
                                    />
                                    <div className={cx('comment__text--content')}>
                                        Sorry, this feature is not ready :v
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default memo(CommentItem);
