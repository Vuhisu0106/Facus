import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useUI } from '~/context/UIContext';

import styles from './Icon.module.scss';

const cx = classNames.bind(styles);
export const LoadingIcon = ({ className }) => {
    const { checkDark } = useUI();
    const classes = cx('loading', checkDark(), { [className]: className });
    return <FontAwesomeIcon className={classes} icon={faSpinner} />;
};
