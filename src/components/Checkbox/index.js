import classNames from 'classnames/bind';
import style from './Checkbox.module.scss';

const cx = classNames.bind(style);
function Checkbox({ text }) {
    return (
        <span className={cx('wrapper')}>
            <input type={'checkbox'} />
            {text}
        </span>
    );
}

export default Checkbox;
