import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import { faCircle, faMessage, faPen, faUserMinus, faUserPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import Posts from '~/layouts/components/Profile/Posts';
import Following from '~/layouts/components/Profile/Following';
import Follower from '~/layouts/components/Profile/Follower';
import { useUI } from '~/context/UIContext';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import SetStatusModal from '~/components/Modal/Modal/SetStatusModal';
import EditProfileModal from '~/components/Modal/Modal/EditProfileModal';
import { useApp } from '~/context/AppContext';

import { useDispatch } from 'react-redux';
import { setProfileInfo } from '~/features/Profile/ProfileSlice';
import { follow, unfollow } from '~/utils/FollowUtils';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { handleSelectChat } from '~/utils';
import { changeChatUser } from '~/features/Chat/ChatSlice';

const cx = classNames.bind(styles);
const NAV_LIST = ['Posts', 'Following', 'Follower'];
function Profile() {
    const [selectedUser, setSelectedUser] = useState('');
    const [type, setType] = useState('Posts');
    const [profileLayout, setProfileLayout] = useState('Posts');
    //const [currentUserFollowing, setCurrentUserFollowing] = useState([]);
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [profileModalVisible, setProfileModalVisible] = useState(false);

    const [followLoading, setFollowingLoading] = useState(false);

    const { currentUser } = useAuth();
    const { checkDark } = useUI();
    const { currentUserInfo } = useApp();

    const navigate = useNavigate();
    let params = useParams();
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState(false);
    const toggleHover = () => setHovered(!hovered);

    const main = () => {
        if (profileLayout === 'Following') {
            return <Following list={selectedUser.following} />;
        }
        if (profileLayout === 'Follower') {
            return <Follower list={selectedUser.follower} />;
        }
        return <Posts selectedUser={selectedUser} isCurrentUser={params.id === currentUser.uid ? true : false} />;
    };

    useEffect(() => {
        setProfileLayout(type);
        console.log(1);
    }, [type]);

    useEffect(() => {
        const getSelectedUser = () => {
            setType('Posts');
            const unsub = onSnapshot(doc(db, 'users', params.id), (doc) => {
                setSelectedUser(doc.data());
                dispatch(
                    setProfileInfo({
                        status: {
                            icon: doc.data()?.status?.icon,
                            text: doc.data()?.status?.text,
                        },
                        bio: doc.data()?.bio,
                        photoURL: doc.data()?.photoURL,
                        coverPhotoURL: doc.data()?.coverPhotoURL,
                    }),
                );
            });
            return () => {
                unsub();
            };
        };

        params.id && getSelectedUser();
    }, [params.id]);

    const handleFollow = async () => {
        try {
            setFollowingLoading(true);
            await follow(currentUser.uid, selectedUser.uid);
        } catch (error) {
            console.log(error);
        }
        setFollowingLoading(false);
    };

    const handleUnfollow = async () => {
        try {
            setFollowingLoading(true);
            await unfollow(currentUser.uid, selectedUser.uid);
        } catch (error) {
            console.log(error);
        }
        setFollowingLoading(false);
    };

    const handleMessage = async () => {
        await handleSelectChat(currentUser, selectedUser);
        dispatch(
            changeChatUser({
                currentUser: currentUser,
                selectUser: selectedUser,
            }),
        );
        navigate('/message');
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
                <Grid type={'profile'}>
                    <GridRow>
                        <GridColumn l={12} m={12} s={12}>
                            <img
                                className={cx('profile-cover-photo')}
                                src={selectedUser?.coverPhotoURL || selectedUser?.photoURL}
                                alt="Vu Hieu"
                            />
                        </GridColumn>

                        <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={11} s_o={0.5}>
                            <div className={cx('profile-main-part-center')}>
                                <div className={cx('profile-main-part-center-2')}>
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
                                                                console.log(selectedUser?.status);
                                                            }}
                                                        >
                                                            {selectedUser?.status ? (
                                                                selectedUser?.status?.icon
                                                            ) : (
                                                                <FontAwesomeIcon icon={faFaceSmile} />
                                                            )}
                                                            <div className={cx('set-status')}>
                                                                {selectedUser?.status
                                                                    ? selectedUser?.status?.text
                                                                    : 'Set status'}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={cx('set-status-btn')}>
                                                            {selectedUser?.status ? (
                                                                selectedUser?.status.icon
                                                            ) : (
                                                                <FontAwesomeIcon icon={faFaceSmile} />
                                                            )}
                                                        </div>
                                                    )
                                                ) : selectedUser?.status ? (
                                                    hovered ? (
                                                        <div className={cx('hovered-set-status-btn')}>
                                                            {selectedUser?.status?.icon}
                                                            <div className={cx('set-status')}>
                                                                {selectedUser?.status?.text}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className={cx('set-status-btn')}>
                                                            {selectedUser.status.icon}
                                                        </div>
                                                    )
                                                ) : (
                                                    ''
                                                )}
                                            </div>
                                            <img
                                                className={cx('profile-avt')}
                                                alt="Vu Minh Hieu"
                                                src={selectedUser?.photoURL}
                                            />
                                        </div>
                                        <div className={cx('profile-name-follow')}>
                                            <h1 className={cx('profile-name')}>{selectedUser.displayName}</h1>
                                            <div className={cx('profile-follow-info')}>
                                                <span className={cx('profile-following')}>
                                                    {selectedUser?.following?.length > 0
                                                        ? selectedUser?.following?.length
                                                        : '0'}{' '}
                                                    following
                                                </span>
                                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                                <span className={cx('profile-follower')}>
                                                    {selectedUser?.follower?.length > 0
                                                        ? selectedUser?.follower?.length
                                                        : '0'}{' '}
                                                    follower
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
                                            {followLoading ? (
                                                <Button
                                                    primary
                                                    className={cx('follow-btn')}
                                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                                    children={'Loading...'}
                                                />
                                            ) : currentUserInfo?.following?.indexOf(params.id) > -1 ? (
                                                <Button
                                                    primary
                                                    className={cx('unfollow-btn')}
                                                    leftIcon={<FontAwesomeIcon icon={faUserMinus} />}
                                                    children={'Unfollow'}
                                                    onClick={() => {
                                                        handleUnfollow();
                                                    }}
                                                />
                                            ) : (
                                                <Button
                                                    primary
                                                    className={cx('follow-btn')}
                                                    leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                                    children={'Follow'}
                                                    onClick={() => {
                                                        handleFollow();
                                                    }}
                                                />
                                            )}

                                            <Button
                                                className={cx('chat-btn')}
                                                leftIcon={<FontAwesomeIcon icon={faMessage} />}
                                                children={'Message'}
                                                onClick={handleMessage}
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>

            <div className={cx('profile-nav')}>
                <Grid type={'profile'} className={cx('profile-nav-grid')}>
                    <GridRow>
                        <GridColumn l={10} l_o={1} m={11} m_o={0.5} s={11} s_o={0.5}>
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
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
            <div className={cx('profile-content')}>{main()}</div>
        </div>
    );
}

export default Profile;
