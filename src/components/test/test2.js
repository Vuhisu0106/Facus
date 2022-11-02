import classNames from 'classnames/bind';

import styles from './test.module.scss';

const cx = classNames.bind(styles);
function Test2() {
    return <div className={cx('test2')}></div>;
}

export default Test2;
