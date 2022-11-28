import classNames from 'classnames/bind';
import Button from '~/components/Button';
import Grid from '~/components/Grid/Grid';
import GridColumn from '~/components/Grid/GridColumn';
import GridRow from '~/components/Grid/GridRow';
import config from '~/configs';
import Shape from '../Shape';

import styles from './HomePage.module.scss';
import HpBackground from './HpBackground';

const cx = classNames.bind(styles);

function HomePage() {
    return (
        <div className={cx('wrapper')}>
            <Grid type={'landing'} className={cx('home')}>
                <div className={cx('home-test2')}></div>
                <GridRow className={cx('home-test')}>
                    <GridColumn l={5.5} m={6} s={12} className={cx('home-content')}>
                        <div className={cx('content-inner')}>
                            <h1 className={cx('home-title')}>A new world is rising. Let’s discover it.</h1>
                            <div className={cx('home-description')}>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, laudantium
                                    cupiditate esse animi ab ex, iure eveniet provident facilis, similique dignissimos
                                    fuga. Nam ex at ipsum quae placeat voluptates.
                                </p>
                            </div>
                            <div className={cx('home-btn')}>
                                <Button to={config.routes.login} className={cx('log-in-btn')} children={'Log in'} />
                                <Button to={config.routes.signup} className={cx('sign-up-btn')} children={'Sign up'} />
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn l={6} l_o={0.5} m={6} s={12} className={cx('home-animation')}>
                        <div className={cx('animation-inner')}>
                            <img className={cx('vector')} src="images/Vector-1.png" alt="" />
                            <img className={cx('man')} src="images/Saly-13.0.png" alt="" />
                        </div>
                    </GridColumn>
                </GridRow>
            </Grid>
            {/* <Grid className={cx('app-feature')}>
                <GridRow className={cx('feature-title')}>
                    <GridColumn l={8} l_o={2} m={8} m_o={2} s={8} s_o={2}>
                        <h1>Features</h1>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius sit, laudantium cupiditate
                            esse animi ab ex, iure eveniet provident facilis, similique dignissimos fuga. Nam ex at
                            ipsum quae placeat voluptates.
                        </p>
                    </GridColumn>
                </GridRow>
                <GridRow className={cx('feature')}>
                    <GridColumn l={4} m={6} s={12}>
                        <div className={cx('feature-col')}>
                            <div className={cx('chat-feature')}>
                                <img src="images/chat-feature.png" alt="" />
                                <div className={cx('feature-background')}>
                                    <Shape
                                        width={'180'}
                                        height={'180'}
                                        top={'10'}
                                        left={'-50'}
                                        color={'#f3ce9e'}
                                        blur={45}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'175'}
                                        left={'150'}
                                        color={'#e54c91'}
                                        blur={65}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'15'}
                                        right={'-40'}
                                        color={'red'}
                                        blur={45}
                                    />
                                    <div className={cx('feature-content')}>
                                        <h2>Chat</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn l={4} m={6} s={12}>
                        <div className={cx('feature-col')}>
                            <div className={cx('post-feature')}>
                                <img src="images/post-feature.png" alt="" />
                                <div className={cx('feature-background')}>
                                    <Shape
                                        width={'180'}
                                        height={'180'}
                                        top={'10'}
                                        left={'-50'}
                                        color={'#f3ce9e'}
                                        blur={45}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'175'}
                                        left={'150'}
                                        color={'#e54c91'}
                                        blur={65}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'15'}
                                        right={'-40'}
                                        color={'red'}
                                        blur={45}
                                    />
                                    <div className={cx('feature-content')}>
                                        <h2>Post</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GridColumn>
                    <GridColumn l={4} m={6} m_o={3} s={12}>
                        <div className={cx('feature-col')}>
                            <div className={cx('status-feature')}>
                                <img src="images/status-feature.png" alt="" />
                                <div className={cx('feature-background')}>
                                    <Shape
                                        width={'180'}
                                        height={'180'}
                                        top={'10'}
                                        left={'-50'}
                                        color={'#f3ce9e'}
                                        blur={45}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'175'}
                                        left={'150'}
                                        color={'#e54c91'}
                                        blur={65}
                                    />
                                    <Shape
                                        width={'100'}
                                        height={'100'}
                                        top={'15'}
                                        right={'-40'}
                                        color={'red'}
                                        blur={45}
                                    />
                                    <div className={cx('feature-content')}>
                                        <h2>Status</h2>
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GridColumn>
                </GridRow>
            </Grid> */}
        </div>
    );
}

export default HomePage;
