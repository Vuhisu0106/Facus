import moment from 'moment';
import { useEffect } from 'react';
import { onSnapshot, where, collection, query } from 'firebase/firestore';

import { db } from '~/firebase/config';
import PostLayout from '~/components/PostLayout';
import { useAuth } from '~/context/AuthContext';
import styles from './Home.module.scss';
import { useApp } from '~/context/AppContext';
import { useDispatch, useSelector } from 'react-redux';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';

function PostList() {
    const { currentUser } = useAuth();
    const { currentUserInfo } = useApp();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postNcomment.posts);

    useEffect(() => {
        const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
        const q = query(collection(db, 'post'), where('poster.uid', 'in', a));
        const getPost = onSnapshot(q, (querySnapshot) => {
            dispatch(resetPost());
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data() });
            });
            dispatch(setPost([...posts]));
        });

        return getPost;
    }, [currentUser, currentUserInfo?.following]);

    return (
        <div>
            {post
                ?.slice()
                .sort((a, b) => b.date - a.date)
                .map((post) => (
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
        </div>
    );
}

export default PostList;
