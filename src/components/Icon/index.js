import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './Icon.module.scss';

const cx = classNames.bind(styles);
export const LoadingIcon = ({ className, type }) => {
    const classes = cx('loading', `${type}`, { [className]: className });
    return <FontAwesomeIcon className={classes} icon={faSpinner} />;
};
