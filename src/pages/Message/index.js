import classNames from 'classnames/bind';

import Input from '~/components/Input';
import styles from './Message.module.scss';
import CircleButton from '~/components/Button/CircleButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import MessageItem from '~/components/MessageItem';
import ChatSearch from '~/components/Search/ChatSearch';

const cx = classNames.bind(styles);
function Message() {
    return (
        <div className={cx('container')}>
            <div className={cx('wrapper')}>
                <div className={cx('left-side')}>
                    <div className={cx('ls-header')}>
                        <div className={cx('ls-top-header')}>
                            <h2>Chat</h2>
                            <CircleButton children={<FontAwesomeIcon icon={faSquarePlus} />} />
                        </div>
                        <div className={cx('search')}>
                            <ChatSearch />
                        </div>
                    </div>
                    <div className={cx('user-message-list')}>
                        {/* <h3>Messages</h3> */}
                        <MessageItem
                            userName={'Mảk'}
                            userAvt={
                                'https://preview.redd.it/55a9r6ftcpy81.jpg?width=680&format=pjpg&auto=webp&s=579b8893877aaf11c22ed799d89ad6150a8ca2fd'
                            }
                            closestMess={'Lô'}
                            unreadMessCount={1}
                            closestMessTime={'9:00 AM'}
                        />
                        <MessageItem
                            userName={'Hecker'}
                            userAvt={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRojQwSjcGEH_FshYrUjlZTwYcwGRwmwECpy7raRjqfIDPWpWGqrJnEbHBSeg8w3o7TGls&usqp=CAU'
                            }
                            closestMess={'Oke vậy đi'}
                            unreadMessCount={2}
                            closestMessTime={'7:00 PM'}
                        />
                        <MessageItem
                            userName={'ml Elon'}
                            userAvt={
                                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_eTO1wjqX1fs0KKMpOBgo2jZJoWn2xrfBOA&usqp=CAU'
                            }
                            closestMess={'Ê còn tiền ko cho vay đi'}
                            unreadMessCount={'99'}
                            closestMessTime={'2:00 AM'}
                        />
                        <MessageItem
                            userName={'Mike'}
                            userAvt={'https://en.meming.world/images/en/b/bc/Mike_Wazowski-Sulley_Face_Swap.jpg'}
                            closestMess={'À oke'}
                            unreadMessCount={1}
                            closestMessTime={'9:00 AM'}
                        />
                        <MessageItem
                            userName={'Steve Mĩ'}
                            userAvt={'https://avatarfiles.alphacoders.com/132/132319.jpg'}
                            closestMess={'Cái dm'}
                            unreadMessCount={1}
                            closestMessTime={'9:00 AM'}
                        />
                    </div>
                </div>
                <div className={cx('right-side')}>
                    <div className={cx('rs-header')}>
                        <img
                            className={cx('user-avt')}
                            alt="Vu Minh Hieu"
                            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                        />
                        <h3 className={cx('user-name')}>Vu Hieu</h3>
                    </div>
                    <div className={cx('chat-box')}>
                        <div className={cx('message-list')}>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy? :) </div>

                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Hỏi làm gì?</div>
                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Đi cafe ko?</div>
                                <span className={cx('sending-time')}>10:43 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy?</div>
                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Đi cafe ko?</div>
                                <span className={cx('sending-time')}>10:43 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy?</div>
                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi nhaaaaaaaaaa</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>{' '}
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Đi cafe ko?</div>
                                <span className={cx('sending-time')}>10:43 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy?</div>
                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>{' '}
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Đi cafe ko?</div>
                                <span className={cx('sending-time')}>10:43 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                            <div className={cx('message', 'my-mess')}>
                                <div className={cx('my-mess-content')}>Hi bro, đang làm clg đấy?</div>
                                <span className={cx('sending-time')}>10:42 AM</span>
                            </div>
                            <div className={cx('message', 'fr-mess')}>
                                <div className={cx('fr-mess-content')}>Bao thì đi</div>
                                <span className={cx('sending-time')}>10:44 AM</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('rs-footer')}>
                        <Input
                            className={cx('mess-input')}
                            placeHolder={'Write a message'}
                            classNameRightBtn={cx('send-btn')}
                            rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Message;
