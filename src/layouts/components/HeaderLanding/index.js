import classNames from 'classnames/bind';
import { useState } from 'react';
import Button from '~/components/Button';
import config from '~/configs';
import { useUI } from '~/context/UIContext';

import styles from './HeaderLanding.module.scss';

const cx = classNames.bind(styles);

function HeaderLanding({ className }) {
    const { checkDark, toggleTheme, dark } = useUI();
    const classes = cx('wrapper', checkDark(), {
        [className]: className,
    });

    return (
        <div className={classes}>
            <span className={cx('title')}>Facus</span>
            <div className={cx('btn')}>
                <Button to={config.routes.homepage} children={'Home'} />
                <Button to={config.routes.login} children={'Log In'} />
                <Button to={config.routes.signup} children={'Sign up'} />
                <button className={cx('theme-btn')} onClick={() => toggleTheme()}>
                    <div className={cx('theme-btn-inner', dark && 'dark')}></div>
                </button>
            </div>
        </div>
    );
}

export default HeaderLanding;
