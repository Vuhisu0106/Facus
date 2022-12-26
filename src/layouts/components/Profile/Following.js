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

const cx = classNames.bind(styles);
function Following({ list }) {
    const [followingList, setFollowingList] = useState([]);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const unSub = async () => {
            const q = query(collection(db, 'users'), where('uid', 'in', list?.length > 0 ? list : [uuid()]));
            try {
                const querySnapshot = await getDocs(q);
                setFollowingList(querySnapshot.docs.map((doc) => doc.data()));
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
                    <WrapperModal className={cx('following__wrapper')}>
                        <h2>Following</h2>
                        {loading ? (
                            <>
                                {Array(2)
                                    .fill(0)
                                    .map((item, index) => (
                                        <LoadingFollowAccItem key={index} />
                                    ))}
                            </>
                        ) : list?.length > 0 ? (
                            followingList?.map((following) => (
                                <div key={following.uid} className={cx('following__accounts')}>
                                    <img
                                        className={cx('following__account--avt')}
                                        alt={following.displayName}
                                        src={following.photoURL}
                                        onClick={() => {
                                            navigate(`/user/${following.uid}`);
                                        }}
                                    />
                                    <div className={cx('following__account--info')}>
                                        <h1 className={cx('following__account--name')}>{following.displayName}</h1>
                                        <span className={cx('following__account--bio')}>
                                            {following.bio || 'Hello World'}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={cx('following__no-follow')}>
                                <h3>This user doesn't follow anyone</h3>
                            </div>
                        )}
                    </WrapperModal>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Following;
