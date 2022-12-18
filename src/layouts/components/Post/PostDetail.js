// import classNames from 'classnames/bind';
// import styles from './Post.module.scss';

// import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { useState, useRef } from 'react';
// import { Timestamp } from 'firebase/firestore';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { v4 as uuid } from 'uuid';
// import { storage } from '~/firebase/config';
// import { faHeart as faHeartRegular, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
// import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
// import { faComment } from '@fortawesome/free-regular-svg-icons';
// import { useAuth } from '~/context/AuthContext';
// import CircleAvatar from '../CircleAvatar';
// import CommentItem from '../CommentItem';
// import Menu from '../Popper/Menu';
// import AddPostModal from '../Modal/Modal/AddPostModal';
// import { updateDocument } from '~/firebase/services';
// import { useDispatch, useSelector } from 'react-redux';
// import { setImageInputState } from '~/features/Modal/ModalSlice';
// import {
//     deleteCommentFunction,
//     deletePostFunction,
//     editCommentFunction,
//     editPostFunction,
//     likePostFunction,
// } from '~/utils';
// import {
//     addComment,
//     deleteComment,
//     deletePost,
//     editComment,
//     editPost,
//     likePost,
// } from '~/features/PostAndComment/PostAndCommentSlice';
// import CommentInput from '../Input/CommentInput';

// const cx = classNames.bind(styles);
// function PostDetail({ userId, postId, userName, userAvt, timeStamp, postImg, postCaption, like, postPage }) {
//     const [comment, setComment] = useState('');
//     const [commentImg, setCommentImg] = useState('');
//     const [commentVisible, setCommentVisible] = useState(false);
//     const commentInputRef = useRef();

//     const dispatch = useDispatch();
//     const { currentUser } = useAuth();

//     const postCommentBefore = useSelector(
//         (state) => state.postNcomment.posts.find((post) => post.postId === postId).comment,
//     );
//     const postComment = postCommentBefore.map((postCmt) => {
//         return { ...postCmt, createdAt: postCmt.createdAt.toDate() };
//     });

//     return (
//         <div className={cx('post-wrapper')}>
//             <div className={cx('post-header')}>
//                 <img className={cx('user-avt')} alt={userName} src={userAvt} />
//                 <div className={cx('post-header-info')}>
//                     <p className={cx('user-name')}>{userName}</p>
//                     <p className={cx('time-post')}>{timeStamp}</p>
//                 </div>
//             </div>
//             <div className={cx('post-content')}>
//                 <div className={cx('post-caption')}>
//                     <p>{postCaption}</p>
//                 </div>
//                 {!postPage
//                     ? postImg && (
//                           <div className={cx('post-image')}>
//                               <a href={`/post/${postId}`}>
//                                   <img
//                                       alt={userName}
//                                       src={typeof postImg === 'object' ? URL.createObjectURL(postImg) : postImg}
//                                   />
//                               </a>
//                           </div>
//                       )
//                     : ''}
//             </div>
//             <div className={cx('post-interaction')}>
//                 {(like.length > 0 || postComment.length > 0) && (
//                     <div className={cx('post-interaction-detail')}>
//                         {like.length > 0 && (
//                             <div className={cx('post-reaction-detail')}>
//                                 <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeartSolid} />{' '}
//                                 {like && like.indexOf(currentUser.uid) !== -1
//                                     ? like.length === 1
//                                         ? 'You'
//                                         : 'You and ' + (like.length - 1)
//                                     : like.length}
//                             </div>
//                         )}

//                         {postComment.length > 0 && (
//                             <div className={cx('post-comment-detail')}>
//                                 <span onClick={handleOnClickCommentBtn}>
//                                     {!postComment
//                                         ? ''
//                                         : postComment.length + ' ' + (postComment.length > 1 ? 'comments' : 'comment')}
//                                 </span>
//                             </div>
//                         )}
//                     </div>
//                 )}
//                 <div className={cx('post-interact')}>
//                     <button
//                         className={cx('reaction-btn')}
//                         onClick={() => {
//                             //likePost(currentUser.uid, like, postId, userId);
//                             handleLikePost();
//                         }}
//                     >
//                         {like && like.indexOf(currentUser.uid) !== -1 ? (
//                             <>
//                                 <FontAwesomeIcon icon={faHeartSolid} style={{ color: '#fe2c55' }} />
//                                 <span style={{ color: '#fe2c55' }}>Like</span>
//                             </>
//                         ) : (
//                             <>
//                                 <FontAwesomeIcon icon={faHeartRegular} />
//                                 <span>Like</span>
//                             </>
//                         )}
//                     </button>
//                     <button
//                         className={cx('comment-btn')}
//                         onClick={() => {
//                             handleOnClickCommentBtn();
//                         }}
//                     >
//                         <FontAwesomeIcon icon={faComment} />
//                         <span>Comment</span>
//                     </button>
//                 </div>
//                 <div className={cx('comment-bar')}>
//                     <CircleAvatar
//                         className={cx('user-avt-comment')}
//                         userName={currentUser.displayName}
//                         avatar={currentUser.photoURL}
//                     />

//                     <CommentInput
//                         commentValue={comment}
//                         commentInputRef={commentInputRef}
//                         handleCommentInput={handleCommentInput}
//                         handleAddComment={() => {
//                             handleAddComment();
//                         }}
//                         commentImg={commentImg}
//                         onChangeImage={(e) => {
//                             setCommentImg(e.target.files[0]);
//                         }}
//                         cancelImage={() => {
//                             setCommentImg('');
//                         }}
//                     />
//                 </div>
//                 {commentVisible && (
//                     <div
//                         className={cx(!postPage ? 'comment-list' : 'comment-list-for-post-page')}
//                         //style={{ overflowY: !postPage ? 'none' : viewport.device === MOBILE && 'hidden' }}
//                         style={{ overflowY: !postPage ? 'none' : 'hidden' }}
//                     >
//                         {postComment &&
//                             postComment
//                                 ?.slice()
//                                 .sort((a, b) => b.createdAt - a.createdAt)
//                                 .map((comments) => (
//                                     <CommentItem
//                                         key={comments.commentId}
//                                         data={comments}
//                                         editComment={handleEditComment}
//                                         toggleLikeComment={handleToggleLikeComment}
//                                         deleteComment={handleDeleteComment}
//                                     />
//                                 ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default PostDetail;
