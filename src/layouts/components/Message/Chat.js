import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Input from '~/components/Input';
import styles from './Message.module.scss';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function Chat() {
    return (
        <div className={cx('chat-wrapper')}>
            <div className={cx('chat-header')}>
                <img
                    className={cx('user-avt')}
                    alt="Vu Minh Hieu"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                />
                <h3 className={cx('user-name')}>Vu Hieu</h3>
            </div>
            <div className={cx('chat-box')}>
                <div className={cx('message-list')}>
                    {/* <div className={cx('message', 'my-mess')}>
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
                    </div> */}
                </div>
            </div>
            <div className={cx('chat-footer')}>
                <Input
                    className={cx('mess-input')}
                    placeHolder={'Write a message'}
                    classNameRightBtn={cx('send-btn')}
                    rightIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                />
            </div>
        </div>
    );
}

export default Chat;
