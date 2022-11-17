import classNames from 'classnames/bind';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { onSnapshot, where, collection, query, deleteField } from 'firebase/firestore';

import { db } from '~/firebase/config';
import PostLayout from '~/components/PostLayout';
import { useAuth } from '~/context/AuthContext';
import { deleteDocument, updateDocument } from '~/firebase/services';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
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

    const handleDeletePost = async (postId) => {
        if (window.confirm('Do you want delete this post?')) {
            try {
                await deleteDocument('post', postId);
                await updateDocument('userPost', currentUser.uid, {
                    [postId]: deleteField(),
                });

                setPostList((cmtList) => cmtList.filter((x) => x.postId !== postId));
            } catch (error) {
                console.log(error);
            }
        }
    };
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
                        postImg={post.img && post.img}
                        postCaption={post.caption}
                        likeCount={post.like.length}
                        commentCount={post.comment.length}
                        deletePostFunc={handleDeletePost}
                    />
                ))}
        </div>
    );
}

export default PostList;
