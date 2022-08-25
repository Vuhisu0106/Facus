import classNames from 'classnames/bind';

import Sidebar from '~/layouts/components/Sidebar';
import PostLayout from '~/components/PostLayout';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('container')}>
            <Sidebar />
            <div className={cx('content')}>
                <PostLayout />
            </div>
            <Sidebar />
        </div>
    );
}

export default Home;
