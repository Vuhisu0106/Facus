import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import styles from './Popper.module.scss';

const cx = classNames.bind(styles);
function Wrapper({ children, className }) {
    const { checkDark } = useUI();
    const classes = cx('wrapper', checkDark(), { [className]: className });
    return <div className={classes}>{children}</div>;
}

export default Wrapper;
