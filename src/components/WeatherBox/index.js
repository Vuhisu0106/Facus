import classNames from 'classnames/bind';

import styles from './WeatherBox.module.scss';

const cx = classNames.bind(styles);
function WeatherBox() {
    return (
        <div className={cx('wrapper')}>
            <h1>Weather Box</h1>
        </div>
    );
}

export default WeatherBox;
