import { faMonero } from '@fortawesome/free-brands-svg-icons';
import { faCamera, faComment, faEllipsis, faHeart, faSearch } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '~/layouts/components/Header';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './DefaultLayout.module.scss';
import Input from '~/components/Input';
import { faFaceKissWinkHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>
                    <div className={cx('post-item')}>
                        <div className={cx('post-header')}>
                            <img
                                className={cx('user-avt')}
                                alt="Vu Minh Hieu"
                                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                            />
                            <div className={cx('post-header-info')}>
                                <p className={cx('user-name')}>Vũ Hiếu</p>
                                <p className={cx('time-post')}>2 hours ago</p>
                            </div>
                            <div className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </div>
                        </div>
                        <div className={cx('post-content')}>
                            <div className={cx('post-caption')}>
                                <p>
                                    "I captured a 145 megapixel image of our sun using a specially modified telescope.
                                    Zoom in!"
                                </p>
                            </div>
                            <div className={cx('post-image')}>
                                <img
                                    alt="post img"
                                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-6/299998073_10160453827798735_7308246808344555496_n.jpg?stp=dst-jpg_p843x403&_nc_cat=104&ccb=1-7&_nc_sid=9267fe&_nc_ohc=2VnUwOvaNiQAX_RTtpb&_nc_ht=scontent.fhan17-1.fna&oh=00_AT9c7TYOdSU7_L0MlyzUjOjdSwFOs-Tn3AiAqKlP8x0n5A&oe=630304A5"
                                />
                            </div>
                        </div>
                        <div className={cx('post-interaction')}>
                            <div className={cx('post-interaction-detail')}>
                                <div className={cx('post-reaction-detail')}>
                                    <FontAwesomeIcon className={cx('reaction-icon')} icon={faHeart} /> You and 8 others
                                </div>
                                <div className={cx('post-comment-detail')}>
                                    <span>25 comments</span>
                                </div>
                            </div>
                            <div className={cx('post-interact')}>
                                <button className={cx('reaction-btn')}>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>Like</span>
                                </button>
                                <button className={cx('comment-btn')}>
                                    <FontAwesomeIcon icon={faComment} />
                                    <span>Comment</span>
                                </button>
                            </div>
                            <div className={cx('comment-bar')}>
                                <img
                                    alt="Vu Minh Hieu"
                                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                                />
                                <Input
                                    placeHolder={'Write comment here...'}
                                    rightIcon={<FontAwesomeIcon icon={faCamera} />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar />
            </div>
        </div>
    );
}

export default DefaultLayout;
