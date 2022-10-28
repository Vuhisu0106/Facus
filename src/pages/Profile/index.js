import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { onSnapshot, doc, serverTimestamp, deleteField } from 'firebase/firestore';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import { faCircle, faMessage, faPen, faUserMinus, faUserPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import Posts from '~/layouts/components/Profile/Posts';
import Following from '~/layouts/components/Profile/Following';
import Follower from '~/layouts/components/Profile/Follower';
import { useUI } from '~/context/UIContext';
import { useUser } from '~/context/UserContext';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import SetStatusModal from '~/components/Modal/Modal/SetStatusModal';
import EditProfileModal from '~/components/Modal/Modal/EditProfileModal';
import { updateDocument } from '~/firebase/services';
import { useApp } from '~/context/AppContext';

const cx = classNames.bind(styles);
const NAV_LIST = ['Posts', 'Following', 'Follower'];
function Profile() {
    const [selectedUser, setSelectedUser] = useState('');
    const [following, setFollowing] = useState(false);
    const [type, setType] = useState('Posts');
    const [profileLayout, setProfileLayout] = useState('Posts');
    //const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    const [followingList, setFollowingList] = useState();
    const [followerList, setFollowerList] = useState();

    const { currentUser } = useAuth();
    const { data } = useUser();
    const { checkDark } = useUI();
    const { currentUserFollowing } = useApp();

    let params = useParams();

    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    const main = () => {
        if (profileLayout === 'Following') {
            return <Following list={followingList} />;
        }
        if (profileLayout === 'Follower') {
            return <Follower list={followerList} />;
        }
        return <Posts selectedUser={selectedUser} isCurrentUser={params.id === currentUser.uid ? true : false} />;
    };

    useEffect(() => {
        setProfileLayout(type);
    }, [type]);

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

    //following data
    useEffect(() => {
        const getFollowingList = () => {
            const unsub = onSnapshot(doc(db, 'following', params.id), (doc) => {
                doc.data() ? setFollowingList(doc.data()) : setFollowingList({});
            });

            return () => {
                unsub();
            };
        };

        params.id && getFollowingList();
    }, [params.id]);

    //follower data
    useEffect(() => {
        const getFollowerList = () => {
            const unsub = onSnapshot(doc(db, 'follower', params.id), (doc) => {
                doc.data() ? setFollowerList(doc.data()) : setFollowerList({});
            });

            return () => {
                unsub();
            };
        };

        params.id && getFollowerList();
    }, [params.id]);

    useEffect(() => {
        if (currentUserFollowing.indexOf(params.id) > -1) {
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
            await updateDocument('following', currentUser.uid, {
                [selectedUser.uid + '.userInfo']: {
                    uid: selectedUser.uid,
                    displayName: selectedUser.displayName,
                    photoURL: selectedUser.photoURL,
                },
                [selectedUser.uid + '.date']: serverTimestamp(),
            });

            await updateDocument('follower', selectedUser.uid, {
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
            await updateDocument('following', currentUser.uid, {
                [selectedUser.uid]: deleteField(),
            });

            await updateDocument('follower', selectedUser.uid, {
                [currentUser.uid]: deleteField(),
            });
        } catch (error) {
            console.log(error);
        }
        setFollowing(false);
    };

    return (
        <div className={cx('wrapper', checkDark())}>
            {statusModalVisible && (
                <SetStatusModal
                    onClose={() => {
                        setStatusModalVisible(false);
                    }}
                />
            )}
            {profileModalVisible && (
                <EditProfileModal
                    onClose={() => {
                        setProfileModalVisible(false);
                    }}
                />
            )}
            <div className={cx('profile-main-part')}>
                <img className={cx('profile-cover-photo')} src={selectedUser.photoURL} alt="Vu Hieu" />
                <div className={cx('profile-main-part-center')}>
                    <div className={cx('profile-main-part-right')}>
                        <div className={cx('avatar')}>
                            <div
                                className={cx('set-status-wrapper')}
                                onMouseEnter={toggleHover}
                                onMouseLeave={toggleHover}
                            >
                                {params.id === currentUser.uid ? (
                                    hovered ? (
                                        <div
                                            className={cx('hovered-set-status-btn')}
                                            onClick={() => {
                                                setStatusModalVisible(true);
                                                console.log(selectedUser.status);
                                            }}
                                        >
                                            {selectedUser.status ? (
                                                selectedUser.status.icon
                                            ) : (
                                                <FontAwesomeIcon icon={faFaceSmile} />
                                            )}
                                            <div className={cx('set-status')}>
                                                {selectedUser.status ? selectedUser.status.text : 'Set status'}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className={cx('set-status-btn')}>
                                            {selectedUser.status ? (
                                                selectedUser.status.icon
                                            ) : (
                                                <FontAwesomeIcon icon={faFaceSmile} />
                                            )}
                                        </div>
                                    )
                                ) : (
                                    ''
                                )}
                            </div>
                            <img className={cx('profile-avt')} alt="Vu Minh Hieu" src={selectedUser.photoURL} />
                        </div>
                        <div>
                            <h1 className={cx('profile-name')}>{selectedUser.displayName}</h1>
                            <div className={cx('profile-follow-info')}>
                                <span className={cx('profile-following')}>
                                    {followingList ? Object.keys(followingList).length : '0'} following
                                </span>
                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                <span className={cx('profile-follower')}>
                                    {followerList ? Object.keys(followerList).length : '0'} follower
                                </span>
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
                                className={cx('edit-profile-btn')}
                                leftIcon={<FontAwesomeIcon icon={faPen} />}
                                children={'Edit profile'}
                                onClick={() => {
                                    setProfileModalVisible(true);
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
                                    leftIcon={<FontAwesomeIcon icon={faUserMinus} />}
                                    children={'Unfollow'}
                                    onClick={() => {
                                        handleUnfollow();
                                    }}
                                />
                            )}

                            <Button
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
                            activeNav={type === items ? true : false}
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
