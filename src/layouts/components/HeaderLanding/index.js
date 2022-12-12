import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import Button from '~/components/Button';
import config from '~/configs';
import { toggleTheme } from '~/features/Theme/ThemeSlice';

import styles from './HeaderLanding.module.scss';

const cx = classNames.bind(styles);

function HeaderLanding({ className }) {
    const dispatch = useDispatch();
    const dark = useSelector((state) => state.theme.darkMode);

    const changeTheme = () => {
        dispatch(toggleTheme());
        localStorage.setItem('darkMode', String(!dark));
    };

    const classes = cx('wrapper', {
        [className]: className,
    });

    return (
        <div className={classes}>
            <span className={cx('title')}>Facus</span>
            <div className={cx('btn')}>
                <Button to={config.routes.homepage} children={'Home'} />
                <Button to={config.routes.login} children={'Log In'} />
                <Button to={config.routes.signup} children={'Sign up'} />
                <button className={cx('theme-btn')} onClick={() => changeTheme()}>
                    <div className={cx('theme-btn-inner', dark && 'dark')}></div>
                </button>
            </div>
        </div>
    );
}

export default HeaderLanding;
