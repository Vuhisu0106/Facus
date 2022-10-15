import { faCamera, faEllipsis, faSearch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import { doc, onSnapshot, arrayUnion, updateDoc, arrayRemove, serverTimestamp, setDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { db } from '~/firebase';
import moment from 'moment';

import { storage } from '~/firebase';
import styles from './PostLayout.module.scss';
import Input from '~/components/Input';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '~/context/UserContext';
import { useAuth } from '~/context/AuthContext';
import CircleAvatar from '../CircleAvatar';
import CircleButton from '../Button/CircleButton';
import { async } from '@firebase/util';

const cx = classNames.bind(styles);
function PostLayout({ userId, postId, userName, userAvt, timeStamp, postImg, postCaption, likeCount, commentCount }) {
    const { addToLocalStorage } = useUser();
    const { currentUser } = useAuth();

    const [postDetail, setPostDetail] = useState({});
    const [comment, setComment] = useState('');
    const [commentVisible, setCommentVisible] = useState(false);
    const [commentImg, setCommentImg] = useState(null);

    const commentInputRef = useRef();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'post', postId), (doc) => {
            doc.exists() && setPostDetail(doc.data());
        });

        return () => {
            unSub();
        };
    }, [postId]);

    const handleLike = async () => {
        console.log(postDetail);
        if (postDetail.like.indexOf(currentUser.uid) === -1) {
            await updateDoc(doc(db, 'post', postId), {
                like: arrayUnion(currentUser.uid),
            });
            await updateDoc(doc(db, 'userPost', userId), {
                [postId + '.like']: arrayUnion(currentUser.uid),
            });
        } else {
            await updateDoc(doc(db, 'post', postId), {
                like: arrayRemove(currentUser.uid),
            });
            await updateDoc(doc(db, 'userPost', userId), {
                [postId + '.like']: arrayRemove(currentUser.uid),
            });
        }
    };

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

    const handleComment = async () => {
        let uuId = uuid();
        if (commentImg) {
            const storageRef = ref(storage, uuid());
            //const uploadTask = await uploadBytesResumable(storageRef, img);

            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'post', postId), {
                        comment: arrayUnion({
                            commentId: uuId,
                            commenter: {
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            },
                            content: comment,
                            img: downloadURL,
                            createdAt: new Date(),
                            like: [],
                        }),
                    });

                    await updateDoc(doc(db, 'userPost', userId), {
                        [postId + '.comment']: arrayUnion({
                            commentId: uuId,
                            commenter: {
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            },
                            content: comment,
                            img: downloadURL,
                            createdAt: new Date(),
                            like: [],
                        }),
                    });
                });
            });
        } else if (!comment && commentImg) {
            const storageRef = ref(storage, uuid());
            //const uploadTask = await uploadBytesResumable(storageRef, img);

            await uploadBytesResumable(storageRef, commentImg).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    await updateDoc(doc(db, 'post', postId), {
                        comment: arrayUnion({
                            commentId: uuId,
                            commenter: {
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            },

                            img: downloadURL,
                            createdAt: new Date(),
                            like: [],
                        }),
                    });

                    await updateDoc(doc(db, 'userPost', userId), {
                        [postId + '.comment']: arrayUnion({
                            commentId: uuId,
                            commenter: {
                                uid: currentUser.uid,
                                displayName: currentUser.displayName,
                                photoURL: currentUser.photoURL,
                            },

                            img: downloadURL,
                            createdAt: new Date(),
                            like: [],
                        }),
                    });
                });
            });
        } else if (!comment && !commentImg) {
            return;
        } else {
            await updateDoc(doc(db, 'post', postId), {
                comment: arrayUnion({
                    commentId: uuId,
                    commenter: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    content: comment,
                    createdAt: new Date(),
                    like: [],
                }),
            });

            await updateDoc(doc(db, 'userPost', userId), {
                [postId + '.comment']: arrayUnion({
                    commentId: uuId,
                    commenter: {
                        uid: currentUser.uid,
                        displayName: currentUser.displayName,
                        photoURL: currentUser.photoURL,
                    },
                    content: comment,
                    createdAt: new Date(),
                    like: [],
                }),
            });
        }

        setComment('');
        setCommentImg(null);
        // setCaption('');
        // setImg(null);
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div className={cx('post-wrapper')}>
            <div className={cx('post-header')}>
                <img className={cx('user-avt')} alt={userName} src={userAvt} />
                <div className={cx('post-header-info')}>
                    <p className={cx('user-name')}>{userName}</p>
                    <p className={cx('time-post')}>{timeStamp}</p>
                </div>
                <div className={cx('more-btn')}>
                    <FontAwesomeIcon icon={faEllipsis} />
                </div>
            </div>
            <div className={cx('post-content')}>
                <div className={cx('post-caption')}>
                    <p>{postCaption}</p>
                </div>
                {postImg && (
                    <div className={cx('post-image')}>
                        <a
                            href={`/post/${postId}`}
                            id=""
                            onClick={() => {
                                addToLocalStorage('selectPost', postId);
                            }}
                        >
                            <img alt={userName} src={postImg} />
                        </a>
                    </div>
                )}
            </div>
            <div className={cx('post-interaction')}>
                {(likeCount > 0 || commentCount > 0) && (
                    <div className={cx('post-interaction-detail')}>
                        {likeCount > 0 && (
                            <div className={cx('post-reaction-detail')}>
                                <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeartSolid} />{' '}
                                {postDetail.like && postDetail.like.indexOf(currentUser.uid) !== -1
                                    ? likeCount === 1
                                        ? 'You'
                                        : 'You and ' + (likeCount - 1)
                                    : likeCount}
                            </div>
                        )}

                        {commentCount > 0 && (
                            <div className={cx('post-comment-detail')}>
                                <span onClick={handleOnClickCommentBtn}>
                                    {commentCount} {(commentCount = 0 ? '' : commentCount > 1 ? 'comments' : 'comment')}
                                </span>
                            </div>
                        )}
                    </div>
                )}
                <div className={cx('post-interact')}>
                    <button className={cx('reaction-btn')} onClick={handleLike}>
                        {postDetail.like && postDetail.like.indexOf(currentUser.uid) !== -1 ? (
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
                    <button className={cx('comment-btn')} onClick={handleOnClickCommentBtn}>
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
                        <Input
                            className={cx('comment-input')}
                            value={comment}
                            type="text"
                            placeHolder={'Write comment here...'}
                            inputRef={commentInputRef}
                            rightIcon={<FontAwesomeIcon icon={faCamera} />}
                            onChange={handleCommentInput}
                            rightBtnTypeFile
                            onChangeRightBtn={(e) => setCommentImg(e.target.files[0])}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleComment();
                                }
                            }}
                        />
                        {commentImg && (
                            <div className={cx('image-sending-comment')}>
                                <img className={cx('select-photo')} src={URL.createObjectURL(commentImg)} alt="img" />
                                <CircleButton
                                    className={cx('cancel-photo-btn')}
                                    children={<FontAwesomeIcon icon={faXmark} />}
                                    onClick={() => {
                                        setCommentImg(null);
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
                {commentVisible && (
                    <div className={cx('comment-list')}>
                        {postDetail.comment &&
                            postDetail.comment
                                ?.sort((a, b) => b.createdAt - a.createdAt)
                                .map((comment) => (
                                    <div className={cx('comment-element')} key={comment.commentId}>
                                        <CircleAvatar
                                            userName={comment.commenter.displayName}
                                            avatar={comment.commenter.photoURL}
                                            diameter="32px"
                                        />
                                        <div className={cx('comment-element-content')}>
                                            <div className={cx('comment-content-n-setting')}>
                                                <div className={cx('comment-content-wrapper')}>
                                                    <div className={cx('comment-user-name')}>
                                                        {comment.commenter.displayName}
                                                    </div>
                                                    <div className={cx('comment-content')}>{comment.content}</div>
                                                </div>
                                                {!comment.img && comment.like.length > 0 && (
                                                    <div className={cx('reaction-cmt')}>
                                                        <FontAwesomeIcon
                                                            className={cx('reaction-cmt-icon')}
                                                            icon={faHeartSolid}
                                                        />
                                                        {comment.like.length > 1 && (
                                                            <div className={cx('reaction-cmt-count')}>
                                                                {comment.like.length}
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                <CircleButton
                                                    className={cx('comment-setting')}
                                                    children={<FontAwesomeIcon icon={faEllipsis} />}
                                                />
                                            </div>

                                            {comment.img && (
                                                <div className={cx('comment-img-n-reaction')}>
                                                    <img className={cx('comment-image')} src={comment.img} alt="" />
                                                    {comment.like.length > 0 && (
                                                        <div className={cx('reaction-image-cmt')}>
                                                            <FontAwesomeIcon
                                                                className={cx('reaction-cmt-icon')}
                                                                icon={faHeartSolid}
                                                            />
                                                            {comment.like.length > 1 && (
                                                                <div className={cx('reaction-cmt-count')}>
                                                                    {comment.like.length}
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}

                                            <div className={cx('comment-interact')}>
                                                <button className={cx('like-comment-btn')}>Like</button>
                                                <button className={cx('reply-comment-btn')}>Reply</button>
                                                <span>
                                                    {comment.createdAt && moment(comment.createdAt.toDate()).fromNow()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostLayout;
