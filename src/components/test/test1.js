import classNames from 'classnames/bind';
import { StyleRoot } from 'radium';
import styles from './test.module.scss';

const cx = classNames.bind(styles);
function Test1({ children, wide }) {
    const style = {
        // Adding media query..
        '@media (max-width: 500px)': {
            color: 'red',
        },
    };
    return (
        // Wrapping under styleroot.
        <StyleRoot>
            <div className="App">
                <h1 style={style}>GeeksforGeeks</h1>
            </div>
        </StyleRoot>
    );
}

export default Test1;
