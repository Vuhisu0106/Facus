import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Home.module.scss';
import { useAuth } from '~/context/AuthContext';

import ProfileCard from '~/components/ProfileCard';
import { useUI } from '~/context/UIContext';
import { useApp } from '~/context/AppContext';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';
import StatusesBar from '~/layouts/components/Home/StatusesBar';
import SuggestAccount from '~/layouts/components/Home/SuggestAccount';
import PostList from '~/layouts/components/Home/PostList';

const cx = classNames.bind(styles);
function Home() {
    // let currentScrollPosition = 0;
    // let scrollAmount = 320;
    const { currentUser } = useAuth();
    const { checkDark } = useUI();
    const { currentUserInfo } = useApp();
    const [listFollowingUid, setListFollowingUid] = useState([]);

    const [postList, setPostList] = useState([]);
    //const [statusFollowingList, setStatusFollowingList] = useState([]);

    useEffect(() => {
        setListFollowingUid([...(currentUserInfo?.following || []), currentUserInfo?.uid]);
    }, [currentUserInfo?.following, currentUser]);

    // console.log(storyRef.current.offsetWidth);

    // //let maxScroll = -storyRef.current.offsetWidth + horizontalRef.current.offsetWidth;

    // function scrollHorizontally() {}

    return (
        <Grid type={'wide'} className={cx('wrapper', checkDark())}>
            {/* <button
                onClick={() => {
                    console.log(currentUser, currentUserInfo);
                }}
            >
                Click
            </button> */}
            <GridRow className={cx('wrapper', checkDark())}>
                <GridColumn l={3.25} m={0} s={0} className={cx('left-sidebar')}>
                    <ProfileCard />
                </GridColumn>

                <GridColumn l={5.5} m={7.5} className={cx('content')}>
                    <StatusesBar listFollowingUid={listFollowingUid} />
                    <PostList listFollowingUid={listFollowingUid} />
                </GridColumn>

                <GridColumn l={3.25} m={4.5} s={0} className={cx('right-sidebar')}>
                    <SuggestAccount label="Suggested to you" />
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Home;
