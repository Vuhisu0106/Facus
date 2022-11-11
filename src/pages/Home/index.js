import classNames from 'classnames/bind';
import { useRef, useEffect, useState } from 'react';
import { onSnapshot, where, collection, query, deleteField, getDocs } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase/config';
import Sidebar from '~/layouts/components/Sidebar';
import PostLayout from '~/components/PostLayout';
import styles from './Home.module.scss';
import { useAuth } from '~/context/AuthContext';
import SuggestAccount from '~/components/SuggestAccount';
import ProfileCard from '~/components/ProfileCard';
import { useUI } from '~/context/UIContext';
import { deleteDocument, updateDocument } from '~/firebase/services';
import { useApp } from '~/context/AppContext';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';
import StatusesBar from '~/layouts/components/Home/StatusesBar';

const cx = classNames.bind(styles);
function Home() {
    // let currentScrollPosition = 0;
    // let scrollAmount = 320;
    const { currentUser } = useAuth();
    const { checkDark } = useUI();
    const { currentUserInfo } = useApp();

    const [postList, setPostList] = useState([]);
    const [statusFollowingList, setStatusFollowingList] = useState([]);

    // useEffect(() => {
    //     const getStatusFollowingList = async () => {
    //         // const statusUserList = currentUserFollowing;
    //         // statusUserList.push(currentUser.uid);
    //         console.log('log 1: ' + currentUserFollowing);

    //         // console.log('statusUserList1: ' + currentUserFollowing);
    //         // console.log('statusUserList2: ' + statusUserList);
    //         const q = query(collection(db, 'users'), where('uid', 'in', currentUserFollowing));

    //         try {
    //             const querySnapshot = await getDocs(q);
    //             setStatusFollowingList(querySnapshot.docs.map((doc) => doc.data()));
    //             //setLoading(false);
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     };
    //     getStatusFollowingList();
    // }, [currentUser]);

    useEffect(() => {
        const getPost = async () => {
            const a = [...currentUserInfo?.following, currentUserInfo?.uid];
            //a.push(currentUserInfo?.uid);
            console.log('loggg : ' + currentUserInfo?.following);
            const q = query(collection(db, 'post'), where('poster.uid', 'in', a));
            const qu = query(collection(db, 'users'), where('uid', 'in', a));

            //console.log('followpost:: ' + currentUserFollowing);

            const unsub = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setPostList(posts);

                //console.log('Current cities in CA: ', postList);
            });

            const unsub2 = onSnapshot(qu, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setStatusFollowingList(posts);

                //console.log('Current cities in CA: ', postList);
            });

            return () => {
                unsub();
                unsub2();
            };
        };

        getPost();
    }, [currentUserInfo]);

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    //Delete post
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
        <Grid wide className={cx('wrapper', checkDark())}>
            <GridRow className={cx('wrapper', checkDark())}>
                <GridColumn l={3.25} m={0} s={0} className={cx('left-sidebar')}>
                    <ProfileCard />
                </GridColumn>

                <GridColumn l={5.5} m={7.5} className={cx('content')}>
                    <StatusesBar data={statusFollowingList} />
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
                </GridColumn>

                <GridColumn l={3.25} m={4.5} s={0} className={cx('right-sidebar')}>
                    <SuggestAccount label="Suggested to you" />
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Home;
