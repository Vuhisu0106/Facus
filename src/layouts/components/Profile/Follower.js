import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';

import { useNavigate } from 'react-router-dom';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { LoadingFollowAccItem } from '~/components/Loading';
import { UserName } from '~/components/AccountItem';

const cx = classNames.bind(styles);
function Follower({ list }) {
    const [followerList, setFollowerList] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unSub = async () => {
            const q = query(collection(db, 'users'), where('uid', 'in', list?.length > 0 ? list : [uuid()]));
            try {
                const querySnapshot = await getDocs(q);
                setFollowerList(querySnapshot.docs.map((doc) => doc.data()));
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
                setLoading(false);
            }
        };

        unSub();
    }, [list]);

    return (
        <Grid type={'profile'}>
            <GridRow>
                <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={12}>
                    <WrapperModal className={cx('follower__wrapper')}>
                        <h2>Follower</h2>
                        {loading ? (
                            <>
                                {Array(2)
                                    .fill(0)
                                    .map((item, index) => (
                                        <LoadingFollowAccItem key={index} />
                                    ))}
                            </>
                        ) : list?.length > 0 ? (
                            followerList?.map((follower) => (
                                <div key={follower.uid} className={cx('follower__accounts')}>
                                    <img
                                        className={cx('follower__account--avt')}
                                        alt={follower.displayName}
                                        src={follower.photoURL}
                                        onClick={() => {
                                            navigate(`/user/${follower.uid}`);
                                        }}
                                    />
                                    <div className={cx('follower__account--info')}>
                                        <UserName
                                            userUid={follower.uid}
                                            userName={follower.displayName}
                                            size={'medium'}
                                            isAdmin={follower.isAdmin}
                                        />
                                        <span className={cx('follower__account--bio')}>
                                            {' '}
                                            {follower.bio || 'Hello World'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={cx('follower__no-follow')}>
                                <h3>This user has no follower</h3>
                            </div>
                        )}
                    </WrapperModal>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Follower;
