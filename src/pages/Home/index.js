import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef, useEffect, useState } from 'react';
import { onSnapshot, doc, where, collection, query, getDocs } from 'firebase/firestore';
import { documentId } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase';
import Sidebar from '~/layouts/components/Sidebar';
import PostLayout from '~/components/PostLayout';
import styles from './Home.module.scss';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';
import { useAuth } from '~/context/AuthContext';
import SuggestAccount from '~/components/SuggestAccount';

const cx = classNames.bind(styles);
function Home() {
    // let currentScrollPosition = 0;
    // let scrollAmount = 320;
    const { currentUser } = useAuth();
    const [followingList, setFollowingList] = useState([]);
    const [postList, setPostList] = useState([]);

    const storyRef = useRef('');
    const horizontalRef = useRef();

    useEffect(() => {
        const getFollowing = () => {
            const unsub = onSnapshot(doc(db, 'following', currentUser.uid), (doc) => {
                setFollowingList(
                    Object.entries(doc.data()).map((follow) => {
                        return follow[0];
                    }),
                );
            });
            return () => {
                unsub();
            };
        };

        currentUser.uid && getFollowing();
    }, [currentUser.uid]);

    useEffect(() => {
        const getPost = async () => {
            const postFromId = localStorage.getItem('FollowingList').split(',');
            postFromId.push(currentUser.uid);
            const q = query(collection(db, 'post'), where('poster.uid', 'in', postFromId));

            const unsub = onSnapshot(q, (querySnapshot) => {
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push(doc.data());
                });
                setPostList(posts);

                //console.log('Current cities in CA: ', postList);
            });

            return () => {
                unsub();
            };
        };

        getPost();
    }, [currentUser.uid, followingList]);

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    return (
        <div className={cx('container')}>
            <Sidebar children={<SuggestAccount label="Suggested to you" />} className={cx('left-sidebar')} />

            <div className={cx('content')}>
                <div className={cx('horizontal-scroll')} ref={horizontalRef}>
                    <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button>
                    <div className={cx('feeling-container')} ref={storyRef}>
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                        <RoundAccountItem avt={currentUser.photoURL} userName={'Vu Hieu'} />
                    </div>
                    <button className={cx('btn-scroll-right')}>{<FontAwesomeIcon icon={faChevronRight} />}</button>
                </div>

                {postList &&
                    postList
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
                            />
                        ))}
            </div>
            <Sidebar children={<SuggestAccount label="Suggested to you" />} className={cx('right-sidebar')} />
        </div>
    );
}

export default Home;
