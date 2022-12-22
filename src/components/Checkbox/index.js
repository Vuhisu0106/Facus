import classNames from 'classnames/bind';
import style from './Checkbox.module.scss';

const cx = classNames.bind(style);
function Checkbox({ text, onChange }) {
    return (
        <span className={cx('wrapper')}>
            <input id="check-box" type={'checkbox'} onChange={onChange} />
            <label htmlFor="check-box">{text}</label>
        </span>
    );
}

export default Checkbox;
