import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase';
import CircleButton from '../Button/CircleButton';
import CircleAvatar from '../CircleAvatar';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);
function CommentItem({ data }) {
    const [commentDetail, setCommentDetail] = useState({});
    useEffect(() => {
        const unSub = onSnapshot(doc(db, 'post', data.commentId), (doc) => {
            doc.exists() && setCommentDetail(doc.data());
        });

        return () => {
            unSub();
        };
    }, [data.commentId]);

    const handleLikeComment = async (commentId) => {
        //console.log(commentId);
        // if (postDetail.like.indexOf(currentUser.uid) === -1) {
        //     await updateDoc(doc(db, 'post', postId), {
        //         like: arrayUnion(currentUser.uid),
        //     });
        //     await updateDoc(doc(db, 'userPost', userId), {
        //         [postId + '.like']: arrayUnion(currentUser.uid),
        //     });
        // } else {
        //     await updateDoc(doc(db, 'post', postId), {
        //         like: arrayRemove(currentUser.uid),
        //     });
        //     await updateDoc(doc(db, 'userPost', userId), {
        //         [postId + '.like']: arrayRemove(currentUser.uid),
        //     });
        // }
    };
    return (
        <div className={cx('comment-element')} key={data.commentId}>
            <CircleAvatar userName={data.commenter.displayName} avatar={data.commenter.photoURL} diameter="32px" />
            <div className={cx('comment-element-content')}>
                <div className={cx('comment-content-n-setting')}>
                    <div className={cx('comment-content-wrapper')}>
                        <div className={cx('comment-user-name')}>{data.commenter.displayName}</div>
                        <div className={cx('comment-content')}>{data.content}</div>
                    </div>
                    {!data.img && data.like.length > 0 && (
                        <div className={cx('reaction-cmt')}>
                            <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                            {data.like.length > 1 && <div className={cx('reaction-cmt-count')}>{data.like.length}</div>}
                        </div>
                    )}
                    <CircleButton className={cx('comment-setting')} children={<FontAwesomeIcon icon={faEllipsis} />} />
                </div>

                {data.img && (
                    <div className={cx('comment-img-n-reaction')}>
                        <img className={cx('comment-image')} src={data.img} alt="" />
                        {data.like.length > 0 && (
                            <div className={cx('reaction-image-cmt')}>
                                <FontAwesomeIcon className={cx('reaction-cmt-icon')} icon={faHeartSolid} />
                                {data.like.length > 1 && (
                                    <div className={cx('reaction-cmt-count')}>{data.like.length}</div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                <div className={cx('comment-interact')}>
                    <button
                        className={cx('like-comment-btn')}
                        style={{ color: '#fe2c55' }}
                        onClick={() => handleLikeComment(data.commentId)}
                    >
                        Like
                    </button>
                    <button className={cx('reply-comment-btn')}>Reply</button>
                    <span>{data.createdAt && moment(data.createdAt.toDate()).fromNow()}</span>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;
