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
        // const getPost = () => {
        //     const unsub = onSnapshot(doc(db, 'userPost', where(documentId(), 'in', followingList)), (doc) => {
        //         setPostList(doc.data());
        //     });

        //     return () => {
        //         unsub();
        //     };
        // };

        // followingList && getPost();

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

            // const postDocsSnap = await getDocs(q);

            // postDocsSnap.forEach((doc) => {
            //     console.log('doc' + doc.data()); // "doc1", "doc2" and "doc3"
            // });
        };

        getPost();
    }, [currentUser.uid, followingList]);

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>
                <div className={cx('horizontal-scroll')} ref={horizontalRef}>
                    <button className={cx('btn-scroll-left')}>{<FontAwesomeIcon icon={faChevronLeft} />}</button>
                    <div className={cx('feeling-container')} ref={storyRef}>
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
                        <RoundAccountItem
                            avt={
                                'https://scontent.fhan15-2.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=aOrAX3b2VlgAX85MgLN&_nc_ht=scontent.fhan15-2.fna&oh=00_AT91QUBc3D1eLrd5bZSDnYY-JxtamKZ23dqDBRSBgrIqxw&oe=6340E2CF'
                            }
                            userName={'Vu Hieu'}
                        />
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
            <Sidebar />
        </div>
    );
}

export default Home;
