import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';

import styles from './Profile.module.scss';
import { faCircle, faPen } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

import Posts from '~/layouts/components/Profile/Posts';
import Following from '~/layouts/components/Profile/Following';
import Follower from '~/layouts/components/Profile/Follower';

const cx = classNames.bind(styles);
const NAV_LIST = ['Posts', 'Following', 'Follower'];
function Profile() {
    const [type, setType] = useState('Posts');
    const [profileLayout, setProfileLayout] = useState('Posts');

    const main = () => {
        if (profileLayout === 'Following') {
            return <Following />;
        }
        if (profileLayout === 'Follower') {
            return <Follower />;
        }
        return <Posts />;
    };

    useEffect(() => {
        setProfileLayout(type);
    }, [type]);

    return (
        <div className={cx('container')}>
            <div className={cx('profile-main-part')}>
                <img
                    className={cx('profile-cover-photo')}
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/97948524_559253204991695_2663173301714550784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=homhmfBkkoQAX_GZaNp&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8_PE-kHOJ_FMh04EUKBz23kBXqNedDqelrTW5S4oHisQ&oe=632B0CD3"
                    alt="Vu Hieu"
                />

                <div className={cx('profile-main-part-center')}>
                    <div>
                        <img
                            className={cx('profile-avt')}
                            alt="Vu Minh Hieu"
                            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                        />
                    </div>

                    <div className={cx('profile-main-part-info')}>
                        <div>
                            <h1 className={cx('profile-name')}>Vũ Hiếu</h1>
                            <div className={cx('profile-follow-info')}>
                                <span className={cx('profile-following')}>1 following</span>
                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                <span className={cx('profile-follower')}>0 follower</span>
                            </div>
                        </div>
                        <Button primary className={cx('edit-btn')} leftIcon={<FontAwesomeIcon icon={faPen} />}>
                            Edit profile
                        </Button>
                    </div>
                </div>
            </div>
            <div className={cx('profile-nav')}>
                <ul>
                    {NAV_LIST.map((items) => (
                        <Button
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
