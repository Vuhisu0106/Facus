import moment from 'moment';
import { useState, useEffect } from 'react';
import { onSnapshot, where, collection, query } from 'firebase/firestore';

import { db } from '~/firebase/config';
import PostLayout from '~/components/PostLayout';
import { useAuth } from '~/context/AuthContext';
import styles from './Home.module.scss';

function PostList({ listFollowingUid }) {
    const [postList, setPostList] = useState([]);
    const { currentUser } = useAuth();

    useEffect(() => {
        const getPost = async () => {
            const q = query(collection(db, 'post'), where('poster.uid', 'in', listFollowingUid));
            const unsub = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setPostList(posts);
            });

            return () => {
                unsub();
            };
        };

        getPost();
    }, [listFollowingUid]);

    return (
        <div>
            {postList
                ?.sort((a, b) => b.date - a.date)
                .map((post) => (
                    <PostLayout
                        key={post.postId}
                        postId={post.postId}
                        userId={post.poster.uid}
                        userName={post.poster.displayName}
                        userAvt={post.poster.photoURL}
                        timeStamp={post.date && moment(post.date.toDate()).fromNow()}
                        postImg={post?.img}
                        postCaption={post.caption}
                        like={post?.like}
                        commentCount={post.comment.length}
                    />
                ))}
        </div>
    );
}

export default PostList;
