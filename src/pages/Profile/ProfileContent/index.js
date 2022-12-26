import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onSnapshot, doc } from 'firebase/firestore';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import { faCircle, faMessage, faPen, faUserMinus, faUserPlus, faWrench } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';

import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import SetStatusModal from '~/components/Modal/Modal/SetStatusModal';
import EditProfileModal from '~/components/Modal/Modal/EditProfileModal';
import { useApp } from '~/context/AppContext';

import { useDispatch } from 'react-redux';
import { setProfileInfo } from '~/features/Profile/ProfileSlice';
import { follow, unfollow } from '~/utils/FollowUtils';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { Follower, Following, LoadingProfile, Posts } from '~/layouts/components/Profile';
import { selectChatFunction } from '~/utils';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function ProfileContent() {
    return (
        <>
            {followLoading || loading ? (
                <LoadingProfile />
            ) : (
                <div className={cx('wrapper')}>
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
                    <div className={cx('profile__main')}>
                        <Grid type={'profile'}>
                            <GridRow>
                                <GridColumn l={12} m={12} s={12}>
                                    {coverPhotoLoading ? null : <div className={cx('loading-cover-photo')} />}
                                    <img
                                        className={cx('profile-cover-photo')}
                                        src={selectedUser?.coverPhotoURL || selectedUser?.photoURL}
                                        alt={selectedUser?.displayName}
                                        style={coverPhotoLoading ? {} : { display: 'none' }}
                                        onLoad={() => {
                                            setCoverPhotoLoading(true);
                                        }}
                                    />
                                </GridColumn>

                                <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={11} s_o={0.5}>
                                    <div className={cx('profile__main-center')}>
                                        <div className={cx('profile__main--content')}>
                                            <div className={cx('profile__main--right')}>
                                                <div className={cx('avatar')}>
                                                    <div
                                                        className={cx('set-status__wrapper')}
                                                        onMouseEnter={() => setHovered(!hovered)}
                                                        onMouseLeave={() => setHovered(!hovered)}
                                                    >
                                                        {params.id === currentUser.uid ? (
                                                            hovered ? (
                                                                <div
                                                                    className={cx('set-status__btn--hovered')}
                                                                    onClick={() => {
                                                                        setStatusModalVisible(true);
                                                                    }}
                                                                >
                                                                    {selectedUser?.status ? (
                                                                        selectedUser?.status?.icon
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={faFaceSmile} />
                                                                    )}
                                                                    <div className={cx('set-status__text')}>
                                                                        {selectedUser?.status
                                                                            ? selectedUser?.status?.text
                                                                            : 'Set status'}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className={cx('set-status__btn')}>
                                                                    {selectedUser?.status ? (
                                                                        selectedUser?.status.icon
                                                                    ) : (
                                                                        <FontAwesomeIcon icon={faFaceSmile} />
                                                                    )}
                                                                </div>
                                                            )
                                                        ) : selectedUser?.status ? (
                                                            hovered ? (
                                                                <div className={cx('set-status__btn--hovered')}>
                                                                    {selectedUser?.status?.icon}
                                                                    <div className={cx('set-status__text')}>
                                                                        {selectedUser?.status?.text}
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className={cx('set-status__btn')}>
                                                                    {selectedUser.status.icon}
                                                                </div>
                                                            )
                                                        ) : (
                                                            ''
                                                        )}
                                                    </div>
                                                    <div className={cx('profile-avt__wrapper')}>
                                                        {avatarLoading ? null : (
                                                            <div className={cx('profile-avt__loading')} />
                                                        )}

                                                        <img
                                                            className={cx('profile-avt__img')}
                                                            alt={selectedUser?.displayName}
                                                            src={selectedUser?.photoURL}
                                                            style={avatarLoading ? {} : { display: 'none' }}
                                                            onLoad={() => {
                                                                setAvatarLoading(true);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={cx('profile__name-n-follow')}>
                                                    <h1 className={cx('profile__name')}>{selectedUser.displayName}</h1>
                                                    <div className={cx('profile__follow-info')}>
                                                        <span
                                                            className={cx('profile__following')}
                                                            onClick={() => {
                                                                setProfileLayout('Following');
                                                            }}
                                                        >
                                                            {selectedUser?.following?.length > 0
                                                                ? selectedUser?.following?.length
                                                                : '0'}{' '}
                                                            following
                                                        </span>
                                                        <FontAwesomeIcon
                                                            className={cx('separate-follow')}
                                                            icon={faCircle}
                                                        />
                                                        <span
                                                            className={cx('profile__follower')}
                                                            onClick={() => {
                                                                setProfileLayout('Follower');
                                                            }}
                                                        >
                                                            {selectedUser?.follower?.length > 0
                                                                ? selectedUser?.follower?.length
                                                                : '0'}{' '}
                                                            follower
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {params.id === currentUser.uid ? (
                                                <div className={cx('profile__main--left')}>
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
                                                <div className={cx('profile__main--left')}>
                                                    {currentUserInfo?.following?.indexOf(params.id) > -1 ? (
                                                        <Button
                                                            primary
                                                            className={cx('unfollow-btn')}
                                                            disabled={followLoading}
                                                            leftIcon={<FontAwesomeIcon icon={faUserMinus} />}
                                                            children={followLoading ? 'Loading...' : 'Unfollow'}
                                                            onClick={() => {
                                                                handleUnfollow();
                                                            }}
                                                        />
                                                    ) : (
                                                        <Button
                                                            primary
                                                            className={cx('follow-btn')}
                                                            disabled={followLoading}
                                                            leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                                                            children={followLoading ? 'Loading...' : 'Follow'}
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

                    <div className={cx('profile__nav')}>
                        <Grid type={'profile'} className={cx('profile__nav-grid')}>
                            <GridRow>
                                <GridColumn l={10} l_o={1} m={11} m_o={0.5} s={11} s_o={0.5}>
                                    <ul>
                                        {NAV_LIST.map((items) => (
                                            <Button
                                                className={cx('profile__nav-btn')}
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
                    <div className={cx('profile__content')}>{main()}</div>
                </div>
            )}
        </>
    );
}

export default ProfileContent;
