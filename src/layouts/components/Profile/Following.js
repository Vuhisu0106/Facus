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
function Following({ list }) {
    const { checkDark } = useUI();
    const [followingList, setFollowingList] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const unSub = async () => {
            const q = query(collection(db, 'users'), where('uid', 'in', list));
            try {
                const querySnapshot = await getDocs(q);
                setFollowingList(querySnapshot.docs.map((doc) => doc.data()));
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
                    <WrapperModal className={cx('following', checkDark())}>
                        <h2>Following</h2>

                        {list?.length > 0 ? (
                            followingList?.map((following) => (
                                <div key={following.uid} className={cx('account')}>
                                    <img
                                        className={cx('account-avt')}
                                        alt={following.displayName}
                                        src={following.photoURL}
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
