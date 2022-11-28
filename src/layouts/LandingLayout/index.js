import classNames from 'classnames/bind';
import { useViewport } from '~/components/Hook';
import { useUI } from '~/context/UIContext';
import HeaderLanding from '../components/HeaderLanding';
import SmHeaderLanding from '../components/HeaderLanding/SmHeaderLanding';

import styles from './LandingLayout.module.scss';

const cx = classNames.bind(styles);
function LandingLayout({ children }) {
    const { checkDark } = useUI();
    const viewPort = useViewport();
    const isSmall = viewPort.width <= 740;
    return (
        <div className={cx('wrapper', checkDark())}>
            {isSmall ? <SmHeaderLanding className={cx('header')} /> : <HeaderLanding className={cx('header')} />}
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default LandingLayout;