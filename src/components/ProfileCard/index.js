import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useApp } from '~/context/AppContext';
import { follow, unfollow } from '~/utils';

import Button from '../Button';
import { LoadingIcon } from '../Icon';

import styles from './ProfileCard.module.scss';

const cx = classNames.bind(styles);
function ProfileCard() {
    const [imgLoading, setImgLoading] = useState(false);
    const [followLoading, setFollowingLoading] = useState(false);

    const { adminInfo, currentUserInfo } = useApp();
    const navigate = useNavigate();

    const SKILLS = [
        'HTML',
        'CSS',
        'SCSS',
        'Bootstrap',
        'Tailwind',
        'Javascript',
        'ReactJS',
        'Redux',
        'MySQL',
        'SQL Server',
        '...',
    ];

    const handleFollow = async () => {
        try {
            setFollowingLoading(true);
            await follow(currentUserInfo.uid, adminInfo.uid);
            toast.success('Follow successfully');
        } catch (error) {
            console.log(error);
        }
        setFollowingLoading(false);
    };

    const handleUnfollow = async () => {
        try {
            setFollowingLoading(true);
            await unfollow(currentUserInfo.uid, adminInfo.uid);
            toast.success('Unfollow successfully');
        } catch (error) {
            console.log(error);
        }
        setFollowingLoading(false);
    };

    const followButton = () => {
        if (currentUserInfo?.following?.includes(adminInfo.uid)) {
            return (
                <Button
                    className={cx('follow-btn')}
                    children={followLoading ? <LoadingIcon type={'button'} /> : 'Unfollow'}
                    disabled={followLoading}
                    onClick={handleUnfollow}
                />
            );
        } else {
            return (
                <Button
                    className={cx('follow-btn')}
                    children={followLoading ? <LoadingIcon type={'button'} /> : 'Follow'}
                    disabled={followLoading}
                    onClick={handleFollow}
                />
            );
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('blur-wrapper')}></div>
            <div className={cx('profile-card-wrapper')}>
                <div className={cx('info')}>
                    {imgLoading ? null : <div className={cx('avatar__loading')} />}
                    <img
                        className={cx('avatar')}
                        alt={''}
                        src={adminInfo.photoURL}
                        style={imgLoading ? {} : { display: 'none' }}
                        onLoad={() => {
                            setImgLoading(true);
                        }}
                    />

                    <h3>{adminInfo.displayName}</h3>
                    <p>
                        User interface designer and <br /> front-end developer
                    </p>

                    <div className={cx('buttons')}>
                        <Button
                            primary
                            className={cx('view-profile-btn')}
                            children={'View profile'}
                            onClick={() => {
                                navigate(`/user/${adminInfo.uid}`);
                            }}
                        />
                        {followButton()}
                    </div>
                </div>
                <div className={cx('skills')}>
                    <h6>Skills</h6>
                    <ul>
                        {SKILLS.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
