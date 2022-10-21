import classNames from 'classnames/bind';
import { useApp } from '~/context/AppContext';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wrapper({ children }) {
    const { checkDark } = useApp();
    return <div className={cx('wrapper', checkDark())}>{children}</div>;
}

export default Wrapper;
