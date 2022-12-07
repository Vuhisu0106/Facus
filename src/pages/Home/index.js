import classNames from 'classnames/bind';

import styles from './Home.module.scss';
import ProfileCard from '~/components/ProfileCard';
import StatusesBar from '~/layouts/components/Home/StatusesBar';
import SuggestAccount from '~/layouts/components/Home/SuggestAccount';
import PostList from '~/layouts/components/Home/PostList';
import { Grid, GridColumn, GridRow } from '~/components/Grid';

const cx = classNames.bind(styles);
function Home() {
    // let currentScrollPosition = 0;
    // let scrollAmount = 320;

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    return (
        <Grid type={'wide'}>
            <GridRow className={cx('wrapper')}>
                <GridColumn l={3.25} m={0} s={0} className={cx('left-sidebar')}>
                    <ProfileCard />
                </GridColumn>

                <GridColumn l={5.5} m={7.5} className={cx('content')}>
                    <StatusesBar />
                    <PostList />
                </GridColumn>

                <GridColumn l={3.25} m={4.5} s={0} className={cx('right-sidebar')}>
                    <SuggestAccount label="Suggested to you" />
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Home;
