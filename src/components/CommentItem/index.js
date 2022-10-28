import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faCamera, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, onSnapshot, arrayUnion, arrayRemove, deleteField } from 'firebase/firestore';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';

import { storage } from '~/firebase/config';
import { db } from '~/firebase/config';
import CircleAvatar from '../CircleAvatar';
import styles from './CommentItem.module.scss';
import { useAuth } from '~/context/AuthContext';
import { useUI } from '~/context/UIContext';
import Menu from '../Popper/Menu';
import Input from '../Input';
import ImageInputArea from '../Input/ImageInputArea';
import { updateDocument } from '~/firebase/services';

const cx = classNames.bind(styles);
function CommentItem({ data, deleteComment }) {
    const [commentDetail, setCommentDetail] = useState({});
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditComment, setIsEditComment] = useState(false);
    const [comment, setComment] = useState(commentDetail?.content || data.content || '');
    const [commentImg, setCommentImg] = useState(commentDetail?.img || data.img || null);
    const [isEditCommentImg, setIsEditCommentImg] = useState(false);

    const { currentUser } = useAuth();
    const { checkDark } = useUI();

    const MENU_COMMENT = [
        {
            icon: <FontAwesomeIcon icon={faPenToSquare} />,
            title: 'Edit comment',
            onClick: () => {
                setIsEditComment(true);
                setIsModalVisible(false);
                setIsEditCommentImg(false);
                setCommentImg(commentDetail?.img || data.img || null);
                setComment(commentDetail?.content || data.content || '');
            },
        },
        {
            icon: <FontAwesomeIcon icon={faTrashCan} />,
            title: 'Delete comment',
            onClick: () => {
                deleteComment(data.commentId);
            },
        },
    ];
    /////////////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'comment', data.commentId), (doc) => {
            doc.exists() && setCommentDetail(doc.data());
        });

        return () => {
            unSub();
        };
    }, [data.commentId]);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    const handleLikeComment = async (commentId) => {
        if (commentDetail.like.indexOf(currentUser.uid) === -1) {
            await updateDocument('comment', data.commentId, {
                like: arrayUnion(currentUser.uid),
            });
        } else {
            await updateDocument('comment', data.commentId, {
                like: arrayRemove(currentUser.uid),
            });
        }
    };

    const onClickOutside = () => {
        setIsModalVisible(false);
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
        if (isEditComment && commentImg) {
            const storageRef = ref(storage, data.commentId);

            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDocument('comment', data.commentId, {
                        content: comment,
                        img: downloadURL,
                    });
                });
            });
        } else if (isEditComment && !comment && commentImg) {
            const storageRef = ref(storage, data.commentId);
            //const uploadTask = await uploadBytesResumable(storageRef, img);

            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDocument('comment', data.commentId, {
                        img: downloadURL,
                    });
                });
            });
        } else if (!comment && !commentImg) {
            return;
        } else {
            await updateDocument('comment', data.commentId, {
                content: comment,
                img: deleteField(),
            });
        }

        setIsEditComment(false);
    };

    return (
        <div className={cx('comment-element', checkDark())} key={data.commentId}>
            <CircleAvatar userName={data.commenter.displayName} avatar={data.commenter.photoURL} diameter="32px" />
            {isEditComment ? (
                <div className={cx('edit-comment-content')}>
                    <Input
                        value={comment}
                        type="text"
                        rightIcon={<FontAwesomeIcon icon={faCamera} />}
                        onChangeRightBtn={(e) => {
                            setCommentImg(e.target.files[0]);
                            setIsEditCommentImg(true);
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
                            src={!isEditCommentImg ? commentImg : URL.createObjectURL(commentImg)}
                            onClickCancel={() => {
                                setCommentImg(null);
                            }}
                        />
                    )}

                    <span
                        onClick={() => {
                            setIsEditComment(false);
                            setComment(commentDetail?.content || data.content || '');
                            setCommentImg(commentDetail?.img || data.img || null);
                        }}
                    >
                        Cancel
                    </span>
                </div>
            ) : (
                <div className={cx('comment-element-content')}>
                    <div className={cx('comment-content-n-setting')}>
                        <div
                            className={cx(
                                'comment-content-wrapper',
                                !commentDetail?.content && commentDetail?.img ? 'no-text-wrapper' : '',
                            )}
                        >
                            <div className={cx('comment-user-name')}>{commentDetail?.commenter?.displayName}</div>
                            <div className={cx('comment-content')}>{commentDetail?.content}</div>

                            {/* Use data from rendering in this component (not from props of parents component) must check if they exist or not */}
                            {!commentDetail.img && commentDetail.like && commentDetail.like.length > 0 && (
                                <div className={cx('reaction-cmt')}>
                                    <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                                    {commentDetail && commentDetail.like.length > 1 && (
                                        <div className={cx('reaction-cmt-count')}>
                                            {commentDetail && commentDetail.like.length}
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
                                onClickOutside={onClickOutside}
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

                    {commentDetail?.img && (
                        <div className={cx('comment-img-n-reaction')}>
                            <img className={cx('comment-image')} src={commentDetail?.img} alt="" />
                            {commentDetail.like && commentDetail.like.length > 0 && (
                                <div className={cx('reaction-image-cmt')}>
                                    <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                                    {commentDetail && commentDetail.like.length > 1 && (
                                        <div className={cx('reaction-cmt-count')}>
                                            {commentDetail && commentDetail.like.length}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={cx('comment-interact')}>
                        <button
                            className={cx('like-comment-btn')}
                            style={{
                                color:
                                    commentDetail.like &&
                                    commentDetail.like.indexOf(currentUser.uid) !== -1 &&
                                    '#fe2c55',
                            }}
                            onClick={() => handleLikeComment(data.commentId)}
                        >
                            Like
                        </button>
                        <button className={cx('reply-comment-btn')}>Reply</button>
                        <span>{data.createdAt && moment(data.createdAt.toDate()).fromNow()}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CommentItem;
