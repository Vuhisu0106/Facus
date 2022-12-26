import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import styles from './LoadingProfile.module.scss';

const cx = classNames.bind(styles);
function LoadingProfile() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile__main')}>
                <Grid type={'profile'}>
                    <GridRow>
                        <GridColumn l={12} m={12} s={12}>
                            <div className={cx('cover-photo')} />
                        </GridColumn>

                        <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={11} s_o={0.5}>
                            <div className={cx('profile__main-center')}>
                                <div className={cx('profile__main--content')}>
                                    <div className={cx('profile__main--right')}>
                                        <div className={cx('avatar')}>
                                            <div className={cx('profile-avt__wrapper')}>
                                                <div className={cx('profile-avt')} />
                                            </div>
                                        </div>
                                        <div className={cx('profile__name-n-follow')}>
                                            <div className={cx('profile__name')}></div>
                                            <div className={cx('profile__follow-info')}>
                                                <div className={cx('profile__following')}></div>
                                                <FontAwesomeIcon className={cx('separate-follow')} icon={faCircle} />
                                                <div className={cx('profile__follower')}></div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={cx('profile__main--left')}>
                                        <div className={cx('edit-account-btn')}></div>
                                        <div className={cx('edit-profile-btn')}></div>
                                    </div>
                                </div>
                            </div>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>

            <div className={cx('profile-nav')}>
                <Grid type={'profile'} className={cx('profile-nav-grid')}>
                    <GridRow>
                        <GridColumn l={10} l_o={1} m={11} m_o={0.5} s={11} s_o={0.5}>
                            <ul>
                                {Array(3)
                                    .fill(0)
                                    .map((items, index) => (
                                        <div className={cx('profile__nav--item')} key={index}></div>
                                    ))}
                            </ul>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        </div>
    );
}

export default LoadingProfile;
