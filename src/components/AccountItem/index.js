import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem() {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                alt="Hieu"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>Vu Hieu</span>
                    {/* <FontAwesomeIcon className={cx('check')} icon={faCheckCircle} /> */}
                </h4>
                <span className={cx('username')}>Following</span>
            </div>
        </div>
    );
}

export default AccountItem;
