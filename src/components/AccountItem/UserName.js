import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import HeadlessTippy from '@tippyjs/react/headless';

import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function UserName({ userUid, userName, size, isCreator, isAdmin }) {
    let Comp = 'div';

    if (userUid) {
        Comp = Link;
    }

    return (
        <Comp to={userUid && '/user/' + userUid} className={cx('user-name', `${size}`)}>
            {userName} {'  '}{' '}
            <div className={cx('user-role')}>
                {isCreator && (
                    <HeadlessTippy
                        placement="bottom"
                        interactive
                        render={(attrs) => (
                            <div className={cx('user-role__hover')} tabIndex="-1" {...attrs}>
                                <span>Original Poster</span>
                            </div>
                        )}
                    >
                        <span>OP</span>
                    </HeadlessTippy>
                )}
                {'    '}
                {isAdmin && (
                    <HeadlessTippy
                        placement="bottom"
                        interactive
                        render={(attrs) => (
                            <div className={cx('user-role__hover')} tabIndex="-1" {...attrs}>
                                <span>Admin</span>
                            </div>
                        )}
                    >
                        <FontAwesomeIcon icon={faShieldHalved} />
                    </HeadlessTippy>
                )}
            </div>
        </Comp>
    );
}

export default UserName;
