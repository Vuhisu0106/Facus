import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { db } from '~/firebase/config';
import styles from './Post.module.scss';
import PostLayout from '~/components/PostLayout';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { resetPost, setPost } from '~/features/PostAndComment/PostAndCommentSlice';

const cx = classNames.bind(styles);
function Post() {
    let params = useParams();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.postNcomment.posts[0]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getPost = async () => {
            const q = query(collection(db, 'post'), where('postId', '==', params.id));
            try {
                dispatch(resetPost());
                const querySnapshot = await getDocs(q);
                const posts = [];
                querySnapshot.forEach((doc) => {
                    posts.push({ ...doc.data() });
                });
                dispatch(setPost([...posts]));
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        getPost();
    }, [params.id]);

    return (
        post && (
            <div className={cx('container')}>
                <Grid type={'chat'}>
                    <GridRow className={'post-grid-row'}>
                        <GridColumn l={7.75} m={6.75} s={12} className={cx('post-img-wrapper')}>
                            <div className={cx('post-image')}>
                                <img alt={post.poster.displayName} src={post.img} />
                            </div>
                        </GridColumn>
                        <GridColumn l={4} l_o={0.25} m={5} m_o={0.25} s={12} className={cx('post-detail')}>
                            <PostLayout
                                className={cx('post-detail-wrapper')}
                                isPostPage
                                key={post?.postId}
                                postId={post?.postId}
                                userId={post?.poster?.uid}
                                userName={post?.poster?.displayName}
                                userAvt={post?.poster?.photoURL}
                                timeStamp={post?.date && moment(post?.date.toDate()).fromNow()}
                                postCaption={post?.caption}
                                like={post?.like}
                            />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </div>
        )
    );
}

export default Post;
