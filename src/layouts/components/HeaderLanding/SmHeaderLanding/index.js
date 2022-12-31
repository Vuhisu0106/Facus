import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './SmHeaderLanding.module.scss';

const cx = classNames.bind(styles);

function SmHeaderLanding({ className, onClick }) {
    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <div className={cx('sm-btn')}>
                <button className={cx('popper-btn')} onClick={onClick}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
        </div>
    );
}

export default SmHeaderLanding;
