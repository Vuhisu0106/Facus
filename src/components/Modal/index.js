import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Modal.module.scss';
import CircleButton from '../Button/CircleButton';
import { useUI } from '~/context/UIContext';
import Grid from '../Grid/Grid';
import GridRow from '../Grid/GridRow';
import GridColumn from '../Grid/GridColumn';
import { useEffect } from 'react';

const cx = classNames.bind(styles);
function Modal({ title, children, onClose, s, s_o, m, m_o, l, l_o }) {
    const { checkDark } = useUI();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    return (
        <div className={cx('container', checkDark())}>
            <Grid>
                <GridRow>
                    <GridColumn l={l} l_o={l_o} m={m} m_o={m_o} s={s} s_o={s_o}>
                        <div className={cx('wrapper')}>
                            <div className={cx('inner-wrapper')}>
                                <div className={cx('header')}>
                                    <h2>{title}</h2>
                                    <CircleButton
                                        className={cx('close-modal-btn')}
                                        children={<FontAwesomeIcon icon={faXmark} />}
                                        onClick={onClose}
                                    />
                                </div>
                                {children}
                            </div>
                        </div>
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    );
}

export default Modal;
