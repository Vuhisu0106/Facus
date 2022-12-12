import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';

import { useNavigate } from 'react-router-dom';
import { Grid, GridColumn, GridRow } from '~/components/Grid';

const cx = classNames.bind(styles);
function Following({ list }) {
    const [followingList, setFollowingList] = useState([]);
    const [error, setError] = useState(false);

    let navigate = useNavigate();

    useEffect(() => {
        const unSub = async () => {
            const q = query(collection(db, 'users'), where('uid', 'in', list?.length > 0 ? list : [uuid()]));
            try {
                const querySnapshot = await getDocs(q);
                setFollowingList(querySnapshot.docs.map((doc) => doc.data()));
                //setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err);
                //setLoading(false);
            }
        };

        unSub();
    }, [list]);

    return (
        <Grid type={'profile'}>
            <GridRow>
                <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={12}>
                    <WrapperModal className={cx('following')}>
                        <h2>Following</h2>

                        {list?.length > 0 ? (
                            followingList?.map((following) => (
                                <div key={following.uid} className={cx('account')}>
                                    <img
                                        className={cx('account-avt')}
                                        alt={following.displayName}
                                        src={following.photoURL}
                                        onClick={() => {
                                            navigate(`/user/${following.uid}`);
                                        }}
                                    />
                                    <div className={cx('account-info')}>
                                        <h1 className={cx('account-name')}>{following.displayName}</h1>
                                        <span className={cx('account-bio')}>Hello World</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1>This user doesn't follow anyone</h1>
                        )}
                    </WrapperModal>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Following;
