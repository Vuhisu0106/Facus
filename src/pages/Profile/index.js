import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { onSnapshot, doc, updateDoc, serverTimestamp, deleteField } from 'firebase/firestore';

import { db } from '~/firebase';
import styles from './Profile.module.scss';
import { faCamera, faCircle, faMessage, faPen, faUserPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import Posts from '~/layouts/components/Profile/Posts';
import Following from '~/layouts/components/Profile/Following';
import Follower from '~/layouts/components/Profile/Follower';
import CircleButton from '~/components/Button/CircleButton';
import { useApp } from '~/context/AppContext';
import { useUser } from '~/context/UserContext';

const cx = classNames.bind(styles);
const NAV_LIST = ['Posts', 'Following', 'Follower'];
function Profile() {
    const [selectedUser, setSelectedUser] = useState('');
    const [following, setFollowing] = useState(false);
    const [type, setType] = useState('Posts');
    const [profileLayout, setProfileLayout] = useState('Posts');
    const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

    const { currentUser } = useAuth();
    const { data } = useUser();
    const { setIsEditProfileVisible } = useApp();

    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    const main = () => {
        if (profileLayout === 'Following') {
            return <Following />;
        }
        if (profileLayout === 'Follower') {
            return <Follower />;
        }
        return <Posts isCurrentUser={params.id === currentUser.uid ? true : false} />;
    };

    useEffect(() => {
        setProfileLayout(type);
    }, [type]);

    useEffect(() => {
        const getFollowing = () => {
            const unsub = onSnapshot(doc(db, 'following', currentUser.uid), (doc) => {
                setCurrentUserFollowing(
                    Object.entries(doc.data()).map((follow) => {
                        return follow[0];
                    }),
                );

                localStorage.setItem(
                    'FollowingList',
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
        const getSelectedUser = () => {
            const unsub = onSnapshot(doc(db, 'users', params.id), (doc) => {
                setSelectedUser(doc.data());
            });

            return () => {
                unsub();
            };
        };

        params.id && getSelectedUser();
    }, [params.id]);

    useEffect(() => {
        console.log(data);
        //console.log(localStorage.getItem('FollowingList'));
        if (localStorage.getItem('FollowingList').indexOf(params.id) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [params.id, data]);

    // useEffect(() => {
    //     function checkFollow() {
    //         const item = localStorage.getItem('userData');

    //         if (currentUserFollowing.indexOf(params.id) > -1) {
    //             setFollowing(true);
    //         } else {
    //             setFollowing(false);
    //         }
    //     }

    //     window.addEventListener('storage', checkFollow);

    //     return () => {
    //         window.removeEventListener('storage', checkFollow);
    //     };
    // }, [params.id]);

    const handleFollow = async () => {
        try {
            await updateDoc(doc(db, 'following', currentUser.uid), {
                [selectedUser.uid + '.userInfo']: {
                    uid: selectedUser.uid,
                    displayName: selectedUser.displayName,
                    photoURL: selectedUser.photoURL,
                },
                [selectedUser.uid + '.date']: serverTimestamp(),
            });

            await updateDoc(doc(db, 'follower', selectedUser.uid), {
                [currentUser.uid + '.userInfo']: {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    photoURL: currentUser.photoURL,
                },
                [currentUser.uid + '.date']: serverTimestamp(),
            });
        } catch (error) {
            console.log(error);
        }
        setFollowing(true);
    };

    const handleUnfollow = async () => {
        try {
            await updateDoc(doc(db, 'following', currentUser.uid), {
                [selectedUser.uid]: deleteField(),
            });

            await updateDoc(doc(db, 'follower', selectedUser.uid), {
                [currentUser.uid]: deleteField(),
            });
        } catch (error) {
            console.log(error);
        }
        setFollowing(false);
    };

    return (
        <div className={cx('container')}>
            <div className={cx('profile-main-part')}>
                <img className={cx('profile-cover-photo')} src={selectedUser.photoURL} alt="Vu Hieu" />
                <div className={cx('profile-main-part-center')}>
                    <div className={cx('profile-main-part-right')}>
                        <div className={cx('avatar')}>
                            <CircleButton
                                className={cx('change-avt-btn')}
                                children={<FontAwesomeIcon icon={faCamera} />}
                            />
                            <img className={cx('profile-avt')} alt="Vu Minh Hieu" src={selectedUser.photoURL} />
                        </div>
                        <div>
                            <h1 className={cx('profile-name')}>{selectedUser.displayName}</h1>
                            <div className={cx('profile-follow-info')}>
                                <span className={cx('profile-following')}>1 following</span>
                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                <span className={cx('profile-follower')}>0 follower</span>
                            </div>
                        </div>
                    </div>

                    {params.id === currentUser.uid ? (
                        <div className={cx('profile-main-part-left')}>
                            <Button
                                primary
                                className={cx('edit-account-btn')}
                                leftIcon={<FontAwesomeIcon icon={faWrench} />}
                                children={'Edit account'}
                            />

                            <Button
                                primary
                                className={cx('edit-profile-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPen} />}
                                children={'Edit profile'}
                                onClick={() => {
                                    setIsEditProfileVisible(true);
                                }}
                            />
                        </div>
                    ) : (
                        <div className={cx('profile-main-part-left')}>
                            {!following ? (
                                <Button
                                    primary
                                    className={cx('follow-btn')}
                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                    children={'Follow'}
                                    onClick={() => {
                                        handleFollow();
                                    }}
                                />
                            ) : (
                                <Button
                                    primary
                                    className={cx('unfollow-btn')}
                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                    children={'Following'}
                                    onClick={() => {
                                        handleUnfollow();
                                    }}
                                />
                            )}

                            <Button
                                primary
                                className={cx('chat-btn')}
                                leftIcon={<FontAwesomeIcon icon={faMessage} />}
                                children={'Message'}
                                onClick={() => {}}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div className={cx('profile-nav')}>
                <ul>
                    {NAV_LIST.map((items) => (
                        <Button
                            className={cx('profile-nav-btn')}
                            nav
                            active={type === items ? true : false}
                            key={items}
                            onClick={() => {
                                setType(items);
                            }}
                        >
                            {items}
                        </Button>
                    ))}
                </ul>
            </div>
            <div className={cx('profile-content')}>{main()}</div>
        </div>
    );
}

export default Profile;
