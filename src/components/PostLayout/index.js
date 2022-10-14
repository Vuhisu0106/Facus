import { faCamera, faEllipsis, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { doc, onSnapshot, arrayUnion, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '~/firebase';

import styles from './PostLayout.module.scss';
import Input from '~/components/Input';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { useUser } from '~/context/UserContext';
import { useAuth } from '~/context/AuthContext';
import CircleAvatar from '../CircleAvatar';
import CircleButton from '../Button/CircleButton';

const cx = classNames.bind(styles);
function PostLayout({ userId, postId, userName, userAvt, timeStamp, postImg, postCaption, likeCount, commentCount }) {
    const { addToLocalStorage } = useUser();
    const { currentUser } = useAuth();

    const [postDetail, setPostDetail] = useState({});

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
                                <span>{commentCount}</span>
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
                    <button className={cx('comment-btn')}>
                        <FontAwesomeIcon icon={faComment} />
                        <span>Comment</span>
                    </button>
                </div>
                <div className={cx('comment-bar')}>
                    <CircleAvatar userName={userName} avatar={userAvt} />
                    <Input placeHolder={'Write comment here...'} rightIcon={<FontAwesomeIcon icon={faCamera} />} />
                </div>
                <div className={cx('comment-list')}>
                    <div className={cx('comment-element')}>
                        <CircleAvatar
                            userName={currentUser.displayName}
                            avatar={currentUser.photoURL}
                            diameter="32px"
                        />
                        <div className={cx('comment-element-content')}>
                            <div className={cx('comment-content-n-setting')}>
                                <div className={cx('comment-content-wrapper')}>
                                    <div className={cx('comment-content')}>Hello, this is a post comment</div>
                                </div>
                                <CircleButton
                                    className={cx('comment-setting')}
                                    children={<FontAwesomeIcon icon={faEllipsis} />}
                                />
                            </div>

                            <img className={cx('comment-image')} src={currentUser.photoURL} alt="" />

                            <div className={cx('comment-interact')}>
                                <button>Like</button>
                                <button>Reply</button>
                                <span>12 min</span>
                            </div>
                        </div>
                    </div>

                    <div className={cx('comment-element')}>
                        <CircleAvatar
                            userName={currentUser.displayName}
                            avatar={currentUser.photoURL}
                            diameter="32px"
                        />
                        <div className={cx('comment-element-content')}>
                            <div className={cx('comment-content-n-setting')}>
                                <div className={cx('comment-content-wrapper')}>
                                    <div className={cx('comment-content')}>Hello, this is a post comment</div>
                                </div>
                                <CircleButton
                                    className={cx('comment-setting')}
                                    children={<FontAwesomeIcon icon={faEllipsis} />}
                                />
                            </div>

                            <img className={cx('comment-image')} src={currentUser.photoURL} alt="" />

                            <div className={cx('comment-interact')}>
                                <button>Like</button>
                                <button>Reply</button>
                                <span>12 min</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostLayout;
