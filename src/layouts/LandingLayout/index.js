import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';
import HeaderLanding from '../components/HeaderLanding';

import styles from './LandingLayout.module.scss';

const cx = classNames.bind(styles);
function LandingLayout({ children }) {
    const { checkDark } = useUI();

    return (
        <div className={cx('wrapper', checkDark())}>
            <HeaderLanding className={cx('header')} />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LandingLayout;
