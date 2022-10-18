import classNames from 'classnames/bind';
import Button from '../Button';

import styles from './ProfileCard.module.scss';

const cx = classNames.bind(styles);
function ProfileCard() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('blur-wrapper')}></div>
            <div className={cx('profile-card-wrapper')}>
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
                {/* <div className={cx('skills')}>
                    <h6>Skills</h6>
                    <ul>
                        <li>HTML</li>
                        <li>CSS</li>
                        <li>JavaScript</li>
                        <li>React</li>
                        <li>Redux</li>
                    </ul>
                </div> */}
            </div>
        </div>
    );
}

export default ProfileCard;
