import classNames from 'classnames/bind';
import { useApp } from '~/context/AppContext';
import Button from '../Button';

import styles from './ProfileCard.module.scss';

const cx = classNames.bind(styles);
function ProfileCard() {
    const { checkDark } = useApp();
    return (
        <div className={cx('wrapper', checkDark())}>
            <div className={cx('blur-wrapper')}></div>
            <div
                className={cx('profile-card-wrapper')}
                // style={{
                //     backgroundImage: `url(${'https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/97948524_559253204991695_2663173301714550784_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=PMWScH-sYvsAX-s8xyU&_nc_ht=scontent.fhan17-1.fna&oh=00_AT-secSV--Z2ZIVR1ElAJwrCBRq3hnn8L24azEIv96rx8A&oe=63763253'})`,
                // }}
            >
                <div className={cx('info')}>
                    <img
                        className={cx('avatar')}
                        alt={''}
                        src="https://yt3.ggpht.com/ytc/AMLnZu97kMUfoLOx9fPmTdKkiysf79flOrIHEmFgwb-xsQ=s600-c-k-c0x00ffffff-no-rj-rp-mo"
                    />

                    <h3>Vũ Hiếu</h3>
                    <p>
                        User interface designer and <br /> front-end developer
                    </p>

                    <div className={cx('buttons')}>
                        <Button className={cx('view-profile-btn')} children={'View profile'} />
                        <Button className={cx('follow-btn')} children={'Follow'} />
                    </div>
                </div>
                <div className={cx('skills')}>
                    <h6>Skills</h6>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Redux</li>
                        <li>...</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
