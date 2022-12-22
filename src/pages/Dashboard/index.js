import classNames from 'classnames/bind';

import styles from './Dashboard.module.scss';
import ProfileCard from '~/components/ProfileCard';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { StatusesBar, SuggestAccount } from '~/layouts/components/Home';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useApp } from '~/context/AppContext';
import { LoadingPost } from '~/components/Loading';

const PostList = lazy(() => import('~/layouts/components/Home/PostList'));

const cx = classNames.bind(styles);
function Dashboard() {
    const [followingList, setFollowingList] = useState([]);
    const { currentUserInfo } = useApp();

    // let currentScrollPosition = 0;
    // let scrollAmount = 320;

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    useEffect(() => {
        //setFollowing([...currentUserInfo?.following, currentUserInfo?.uid]);
        Object.keys(currentUserInfo).length > 0 &&
            setFollowingList([...(currentUserInfo?.following || []), currentUserInfo?.uid || []]);
    }, [currentUserInfo, currentUserInfo?.following]);

    return (
        <Grid type={'wide'}>
            <GridRow className={cx('wrapper')}>
                <GridColumn l={3.25} m={0} s={0} className={cx('left-sidebar')}>
                    <ProfileCard />
                </GridColumn>

                <GridColumn l={5.5} m={7.5} s={11.5} className={cx('content')}>
                    <StatusesBar followingList={followingList} />
                    <Suspense fallback={<LoadingPost />}>
                        <PostList followingList={followingList} />
                    </Suspense>
                </GridColumn>

                <GridColumn l={3.25} m={4.5} s={0} className={cx('right-sidebar')}>
                    <SuggestAccount label="Suggested to you" followingList={followingList} />
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Dashboard;
