import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wrapper({ children }) {
    const { checkDark } = useUI();
    return <div className={cx('wrapper', checkDark())}>{children}</div>;
}

export default Wrapper;
