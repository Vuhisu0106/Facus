import classNames from 'classnames/bind';
import { useState, useEffect } from 'react';
import { onSnapshot, doc } from 'firebase/firestore';
import moment from 'moment';

import { db } from '~/firebase';
import Button from '~/components/Button';
import WrapperModal from '~/components/Wrapper';
import PostLayout from '~/components/PostLayout';
import styles from './Profile.module.scss';
import { useAuth } from '~/context/AuthContext';
import { useApp } from '~/context/AppContext';
import CircleAvatar from '~/components/CircleAvatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Posts({ isCurrentUser = false }) {
    const { currentUser } = useAuth();
    const { setIsAddPostVisible, setAddPhotoVisible, setButtonActive } = useApp();

    const [postList, setPostList] = useState([]);

    var selectUser = localStorage.getItem('selectUser');

    useEffect(() => {
        const getPost = () => {
            const unsub = onSnapshot(doc(db, 'post', selectUser), (doc) => {
                setPostList(doc.data());
            });

            return () => {
                unsub();
            };
        };

        selectUser && getPost();
    }, [selectUser]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <WrapperModal className={cx('intro')}>
                    <h2>Intro</h2>
                    <p>Hello world</p>
                    {isCurrentUser && <Button long>Edit bio</Button>}
                </WrapperModal>
                <WrapperModal className={cx('photo')}>
                    <h2>Photo</h2>
                    <p>No image found!</p>
                </WrapperModal>
            </div>
            <div className={cx('right-content')}>
                {isCurrentUser && (
                    <WrapperModal className={cx('add-post')}>
                        <div className={cx('add-post-top')}>
                            <CircleAvatar
                                className={cx('add-post-user-avt')}
                                userName={currentUser.displayName}
                                avatar={currentUser.photoURL}
                                diameter="40px"
                            />
                            <Button
                                className={cx('add-post-only-message-btn')}
                                children={"What's on your mind?"}
                                onClick={() => {
                                    setIsAddPostVisible(true);
                                    setAddPhotoVisible(false);
                                    setButtonActive(false);
                                }}
                            />
                        </div>
                        <div className={cx('add-post-bottom')}>
                            <Button
                                className={cx('add-post-with-video-btn')}
                                leftIcon={<FontAwesomeIcon icon={faVideo} />}
                                children={'Video'}
                            />
                            <Button
                                className={cx('add-post-with-photo-btn')}
                                leftIcon={<FontAwesomeIcon icon={faImage} />}
                                children={'Photo'}
                                onClick={() => {
                                    setIsAddPostVisible(true);
                                    setAddPhotoVisible(true);
                                    setButtonActive(true);
                                }}
                            />
                        </div>
                    </WrapperModal>
                )}
                {postList &&
                    Object.entries(postList)
                        ?.sort((a, b) => b[1].date - a[1].date)
                        .map((post) => (
                            <PostLayout
                                key={post[0]}
                                userId={post[1].poster.uid}
                                userName={post[1].poster.displayName}
                                userAvt={post[1].poster.photoURL}
                                timeStamp={post[1].date && moment(post[1].date.toDate()).fromNow()}
                                postImg={post[1].img && post[1].img}
                                postCaption={post[1].caption}
                                likeCount={post[1].like.length}
                                commentCount={post[1].comment.length}
                            />
                        ))}
            </div>
        </div>
    );
}

export default Posts;
