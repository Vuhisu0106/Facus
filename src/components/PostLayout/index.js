import { faCamera, faComment, faEllipsis, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './PostLayout.module.scss';
import Input from '~/components/Input';

const cx = classNames.bind(styles);
function PostLayout({ userId, userName, userAvt, timeStamp, postImg, postCaption, likeCount, commentCount }) {
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
                        <a href="/post" id="">
                            <img alt={userName} src={postImg} />
                        </a>
                    </div>
                )}
            </div>
            <div className={cx('post-interaction')}>
                {likeCount > 0 ||
                    (commentCount > 0 && (
                        <div className={cx('post-interaction-detail')}>
                            {likeCount > 0 && (
                                <div className={cx('post-reaction-detail')}>
                                    <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeart} /> {likeCount}
                                </div>
                            )}
                            {commentCount > 0 && (
                                <div className={cx('post-comment-detail')}>
                                    <span>{commentCount}</span>
                                </div>
                            )}
                        </div>
                    ))}
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
                    <img alt={userName} src={userAvt} />
                    <Input placeHolder={'Write comment here...'} rightIcon={<FontAwesomeIcon icon={faCamera} />} />
                </div>
            </div>
        </div>
    );
}

export default PostLayout;
