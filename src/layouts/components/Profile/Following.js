import classNames from 'classnames/bind';

import styles from './Profile.module.scss';

import WrapperModal from '~/components/Wrapper';

const cx = classNames.bind(styles);
function Following() {
    return (
        <WrapperModal className={cx('following')}>
            <h2>Following</h2>
            <div className={cx('account')}>
                <img
                    className={cx('account-avt')}
                    alt="Vu Minh Hieu"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                />
                <div className={cx('account-info')}>
                    <h1 className={cx('account-name')}>Vũ Hiếu</h1>
                    <span className={cx('account-bio')}>Hello World</span>
                </div>
            </div>
            <div className={cx('account')}>
                <img
                    className={cx('account-avt')}
                    alt="Vu Minh Hieu"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                />
                <div className={cx('account-info')}>
                    <h1 className={cx('account-name')}>Vũ Hiếu</h1>
                    <span className={cx('account-bio')}>Hello World</span>
                </div>
            </div>
            <div className={cx('account')}>
                <img
                    className={cx('account-avt')}
                    alt="Vu Minh Hieu"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                />
                <div className={cx('account-info')}>
                    <h1 className={cx('account-name')}>Vũ Hiếu</h1>
                    <span className={cx('account-bio')}>Hello World</span>
                </div>
            </div>
            <div className={cx('account')}>
                <img
                    className={cx('account-avt')}
                    alt="Vu Minh Hieu"
                    src="https://scontent.fhan17-1.fna.fbcdn.net/v/t1.6435-9/190902909_816262175957462_3602706991838518816_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=LsEXcWjsPnwAX_aqMvn&_nc_ht=scontent.fhan17-1.fna&oh=00_AT8CqApXsUwbkS7tXeLYTc9rRPE-97NT1Y0Z4A70YWs91A&oe=6325334F"
                />
                <div className={cx('account-info')}>
                    <h1 className={cx('account-name')}>Vũ Hiếu</h1>
                    <span className={cx('account-bio')}>Hello World</span>
                </div>
            </div>
        </WrapperModal>
    );
}

export default Following;
