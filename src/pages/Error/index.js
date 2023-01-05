import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import styles from './Error.module.scss';

const cx = classNames.bind(styles);
function Error() {
    const navigate = useNavigate();
    return (
        <Grid type={'landing'} className={cx('wrapper')}>
            <GridRow>
                <GridColumn l={3} l_o={4.5} m={5} m_o={3.5} s={8} s_o={2}>
                    <div className={cx('content')}>
                        <img className={cx('image')} src="images/404-error.png" alt="" />
                        <div className={cx('btns')}>
                            <Button
                                className={cx('back-btn')}
                                children={'Go back'}
                                onClick={() => {
                                    navigate(-1);
                                }}
                            />
                            <Button
                                className={cx('home-btn')}
                                children={'Home'}
                                primary
                                onClick={() => {
                                    navigate('/');
                                }}
                            />
                        </div>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default Error;
