import classNames from 'classnames/bind';

import Button from '~/components/Button';
import WrapperModal from '~/components/Wrapper';
import PostLayout from '~/components/PostLayout';
import styles from './Profile.module.scss';
const cx = classNames.bind(styles);
function Posts() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('left-content')}>
                <WrapperModal className={cx('intro')}>
                    <h2>Intro</h2>
                    <p>Hello world</p>
                    <Button long>Edit bio</Button>
                </WrapperModal>
                <WrapperModal className={cx('photo')}>
                    <h2>Photo</h2>
                    <p>No image found!</p>
                </WrapperModal>
            </div>
            <div className={cx('right-content')}>
                <PostLayout />
            </div>
        </div>
    );
}

export default Posts;
