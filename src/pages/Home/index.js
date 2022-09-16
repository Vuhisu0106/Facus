import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

import Sidebar from '~/layouts/components/Sidebar';
import PostLayout from '~/components/PostLayout';
import styles from './Home.module.scss';
import RoundAccountItem from '~/components/AccountItem/RoundAccountItem';

const cx = classNames.bind(styles);
function Home() {
    // let currentScrollPosition = 0;
    // let scrollAmount = 320;

    const storyRef = useRef('');
    const horizontalRef = useRef();

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

                <PostLayout />
            </div>
            <Sidebar />
        </div>
    );
}

export default Home;
