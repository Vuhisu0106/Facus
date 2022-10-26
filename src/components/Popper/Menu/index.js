import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';

import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';

const cx = classNames.bind(styles);
function Menu({ children, items, placement = 'bottom-end', offset, isMenuVisible, onClickOutside }) {
    const renderItems = () => {
        return items.map((item, index) => <MenuItem key={index} data={item} onClick={item.onClick} />);
    };

    return (
        <Tippy
            interactive
            placement={placement}
            visible={isMenuVisible}
            onClickOutside={onClickOutside}
            offset={offset}
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>{renderItems()}</PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
