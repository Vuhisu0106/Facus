import classNames from 'classnames/bind';
import Shape from '../../Shape';

import styles from './HpBackground.module.scss';

const cx = classNames.bind(styles);
function HpBackground() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('home')}></div>
            <div className={cx('feature')}>
                <Shape width={'580'} height={'580'} top={'910'} left={'-50'} color={'#f3ce9e'} blur={45} />
                <Shape width={'500'} height={'500'} top={'875'} left={'1000'} color={'#e54c91'} blur={65} />
            </div>
        </div>
    );
}

export default HpBackground;
