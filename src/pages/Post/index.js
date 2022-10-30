import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faComment, faEllipsis, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase/config';
import WrapperModal from '~/components/Wrapper';
import Input from '~/components/Input';
import styles from './Post.module.scss';
import { useState, useEffect } from 'react';
import { useUI } from '~/context/UIContext';
import PostLayout from '~/components/PostLayout';

const cx = classNames.bind(styles);
function Post() {
    let params = useParams();
    const { checkDark } = useUI();

    const [postDetail, setPostDetail] = useState();

    useEffect(() => {
        const getPostDetail = () => {
            const unsub = onSnapshot(doc(db, 'post', localStorage.getItem('selectPost')), (doc) => {
                setPostDetail(doc.data());
                console.log(postDetail);
            });
            return () => {
                unsub();
            };
        };
        getPostDetail();
    }, [params.id]);

    return (
        postDetail && (
            <WrapperModal className={cx('container', checkDark())}>
                <div className={cx('post-img-wrapper')}>
                    <div className={cx('post-image')}>
                        <img alt={postDetail.poster.displayName} src={postDetail.img} />
                    </div>
                </div>
                {/* <div className={cx('post-detail')}>
                    <div className={cx('post-header')}>
                        <img
                            className={cx('user-avt')}
                            alt={postDetail.poster.displayName}
                            src={postDetail.poster.photoURL}
                        />
                        <div className={cx('post-header-info')}>
                            <p className={cx('user-name')}>{postDetail.poster.displayName}</p>
                            <p className={cx('time-post')}>
                                {postDetail.date && moment(postDetail.date.toDate()).fromNow()}
                            </p>
                        </div>
                        <div className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </div>
                    </div>
                    <div className={cx('post-content')}>
                        <div className={cx('post-caption')}>
                            <p>{postDetail.caption}</p>
                        </div>
                    </div>
                    <div className={cx('post-interaction')}>
                        {postDetail.like > 0 && postDetail.comment > 0 && (
                            <div className={cx('post-interaction-detail')}>
                                {postDetail.like.length > 0 && (
                                    <div className={cx('post-reaction-detail')}>
                                        <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeart} /> You and 8
                                        others
                                    </div>
                                )}
                                {postDetail.comment.length > 0 && (
                                    <div className={cx('post-comment-detail')}>
                                        <span>25 comments</span>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className={cx('post-interact')}>
                            <button className={cx('reaction-btn')}>
                                <FontAwesomeIcon icon={faHeart} />
                                <span>Like</span>
                            </button>
                            <button className={cx('comment-btn')}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>Comment</span>
                            </button>
                        </div>
                        <div className={cx('comment-bar')}>
                            <img alt={postDetail.poster.displayName} src={postDetail.poster.photoURL} />
                            <Input
                                placeHolder={'Write comment here...'}
                                rightIcon={<FontAwesomeIcon icon={faCamera} />}
                            />
                        </div>
                    </div>
                </div> */}
                <div className={cx('post-detail')}>
                    <PostLayout
                        postPage
                        key={postDetail.postId}
                        postId={postDetail.postId}
                        userId={postDetail?.poster?.uid}
                        userName={postDetail?.poster?.displayName}
                        userAvt={postDetail?.poster?.photoURL}
                        timeStamp={postDetail?.date && moment(postDetail?.date.toDate()).fromNow()}
                        postCaption={postDetail?.caption}
                        likeCount={postDetail?.like?.length}
                        //commentCount={post[1]?.comment?.length}
                    />
                </div>
            </WrapperModal>
        )
    );
}

export default Post;
