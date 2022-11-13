import classNames from 'classnames/bind';

import styles from './Menu.module.scss';
import Button from '~/components/Button';
import { useUI } from '~/context/UIContext';

const cx = classNames.bind(styles);
function MenuItem({ data, onClick }) {
    const { checkDark } = useUI();
    const classes = cx('menu-item', checkDark(), {
        separate: data.separate,
    });
    return (
        <Button popper className={classes} leftIcon={data.icon} to={data.to} onClick={onClick}>
            {data.title}
        </Button>
    );
}

export default MenuItem;
