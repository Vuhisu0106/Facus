import classNames from 'classnames/bind';

import Button from '~/components/Button';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import config from '~/configs';
import styles from './HomePage.module.scss';

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div className={cx('wrapper')}>
            <Grid type={'landing'} className={cx('home')}>
                <div className={cx('home__background')}></div>
                <GridRow className={cx('home__content--wrapper')}>
                    <GridColumn l={5.5} m={6} s={12} className={cx('home__content')}>
                        <div className={cx('content-inner')}>
                            <div>
                                <span className={cx('title')}>Facus</span>
                                <span className={cx('title__home')}>
                                    {' '}
                                    <span className={cx('title__separate')}> - </span> A new world is rising. Let’s
                                    discover it !
                                </span>
                            </div>
                            <div className={cx('home__description')}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, laudantium
                                    cupiditate esse animi ab ex, iure eveniet provident facilis, similique dignissimos
                                    fuga. Nam ex at ipsum quae placeat voluptates.
                                </p>
                            </div>
                            <div className={cx('home__btns')}>
                                <Button to={config.routes.login} className={cx('log-in-btn')} children={'Log in'} />
                                <Button to={config.routes.signup} className={cx('sign-up-btn')} children={'Sign up'} />
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn l={6} l_o={0.5} m={6} s={12} className={cx('home__animation')}>
                        <div className={cx('animation-inner')}>
                            <img className={cx('vector')} src="images/Vector-1.png" alt="" />
                            <img className={cx('man')} src="images/Saly-13.0.png" alt="" />
                        </div>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default HomePage;
