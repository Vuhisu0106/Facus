import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';

import styles from './Modal.module.scss';
import CircleButton from '../Button/CircleButton';
import { Grid, GridColumn, GridRow } from '../Grid';

const cx = classNames.bind(styles);
function Modal({ title, children, onClose, s, s_o, m, m_o, l, l_o }) {
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = 'unset');
    }, []);

    return (
        <div className={cx('container')}>
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
