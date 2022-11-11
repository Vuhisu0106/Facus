import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { onSnapshot, doc, collection, query, where, getDocs } from 'firebase/firestore';

import { db } from '~/firebase/config';
import styles from './Profile.module.scss';
import WrapperModal from '~/components/Wrapper';
import { useUI } from '~/context/UIContext';
import Grid from '~/components/Grid/Grid';
import GridRow from '~/components/Grid/GridRow';
import GridColumn from '~/components/Grid/GridColumn';

const cx = classNames.bind(styles);
function Follower({ list }) {
    const { checkDark } = useUI();

    const [followerList, setFollowerList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const unSub = async () => {
            const q = query(collection(db, 'users'), where('uid', 'in', list));
            try {
                const querySnapshot = await getDocs(q);
                setFollowerList(querySnapshot.docs.map((doc) => doc.data()));
                //console.log('2: read');

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
        <Grid profile>
            <GridRow>
                <GridColumn l={11} l_o={0.5} m={11} m_o={0.5} s={12}>
                    <WrapperModal className={cx('follower', checkDark())}>
                        <h2>Follower</h2>
                        {list?.length > 0 ? (
                            followerList?.map((follower) => (
                                <div key={follower.uid} className={cx('account')}>
                                    <img
                                        className={cx('account-avt')}
                                        alt={follower.displayName}
                                        src={follower.photoURL}
                                    />
                                    <div className={cx('account-info')}>
                                        <h1 className={cx('account-name')}>{follower.displayName}</h1>
                                        <span className={cx('account-bio')}>Hello World</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h2>This user has no follower</h2>
                        )}
                    </WrapperModal>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Follower;
