import classNames from 'classnames/bind';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { where, collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore';

import { db } from '~/firebase/config';
import PostLayout from '~/components/PostLayout';
import { useDispatch, useSelector } from 'react-redux';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingPost } from '~/components/Loading';
import styles from './Home.module.scss';
import { useAuth } from '~/context/AuthContext';

const cx = classNames.bind(styles);
function PostList({ followingList }) {
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postNcomment.posts);
    const { currentUser } = useAuth();

    const [last, setLast] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        setLoading(true);
        const getPost = async () => {
            const q = query(
                collection(db, 'post'),
                where('poster.uid', 'in', followingList),
                orderBy('date', 'desc'),
                limit(4),
            );
            try {
                dispatch(resetPost());
                const querySnapshot = await getDocs(q);
                //get last post we get
                const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
                setLast(lastVisible?.data());
                //get post list render in first time
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data() });
                });
                dispatch(setPost([...posts]));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        followingList.length > 0 && getPost();
    }, [currentUser, followingList]);

    const loadMorePost = async () => {
        const q = query(
            collection(db, 'post'),
            where('poster.uid', 'in', followingList),
            orderBy('date', 'desc'),
            startAfter(last['date']),
            limit(1),
        );

        try {
            const querySnapshot = await getDocs(q);
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data() });
            });

            if (lastVisible !== undefined) {
                setTimeout(() => {
                    dispatch(setPost([...post, ...posts]));
                }, 500);

                setLast(lastVisible.data());
            } else {
                setHasMore(false);
                console.log('Nothing to load');
                return;
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {loading ? <LoadingPost /> : <></>}
            {!loading &&
                (post?.length > 0 ? (
                    <>
                        <InfiniteScroll
                            dataLength={post.length}
                            next={loadMorePost}
                            hasMore={hasMore}
                            loader={<LoadingPost />}
                        >
                            {post?.slice().map((post) => (
                                <PostLayout
                                    key={post?.postId}
                                    postId={post?.postId}
                                    userId={post?.poster?.uid}
                                    userName={post?.poster?.displayName}
                                    userAvt={post?.poster?.photoURL}
                                    timeStamp={post?.date && moment(post?.date.toDate()).fromNow()}
                                    postImg={post?.img}
                                    postCaption={post?.caption}
                                    like={post?.like}
                                />
                            ))}
                        </InfiniteScroll>
                        {/* {showEndOfPost && (
                            <h3 className={cx('post-list__h3')}>There are no more posts to show right now.</h3>
                        )} */}
                        <h3 className={cx('post-list__h3')}>There are no more posts to show right now.</h3>
                    </>
                ) : (
                    <div className={cx('post-list__no-post')}>
                        <img src="images/status-feature.png" alt="" />
                        <h3 className={cx('post-list__h3')}>You don't post anything or don't follow anyone.</h3>
                    </div>
                ))}
        </div>
    );
}

export default PostList;
