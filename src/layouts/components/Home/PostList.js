import moment from 'moment';
import { useState, useEffect } from 'react';
import { onSnapshot, where, collection, query } from 'firebase/firestore';

import { db } from '~/firebase/config';
import PostLayout from '~/components/PostLayout';
import { useAuth } from '~/context/AuthContext';
import styles from './Home.module.scss';
import { useApp } from '~/context/AppContext';
import { useDispatch } from 'react-redux';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';

function PostList() {
    const [postList, setPostList] = useState([]);
    const { currentUser } = useAuth();
    const { currentUserInfo } = useApp();
    const dispatch = useDispatch();

    useEffect(() => {
        const a = [...(currentUserInfo?.following || []), currentUserInfo?.uid || []];
        const q = query(collection(db, 'post'), where('poster.uid', 'in', a));
        const getPost = onSnapshot(q, (querySnapshot) => {
            dispatch(resetPost());
            const posts = [];
            querySnapshot.forEach((doc) => {
                posts.push({ ...doc.data(), comment: [] });
            });
            dispatch(setPost([...posts]));
            setPostList(posts);
        });

        return getPost;
    }, [currentUser, currentUserInfo?.following]);

    return (
        <div>
            {postList
                ?.sort((a, b) => b.date - a.date)
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
                        commentCount={post?.comment.length}
                    />
                ))}
        </div>
    );
}

export default PostList;
