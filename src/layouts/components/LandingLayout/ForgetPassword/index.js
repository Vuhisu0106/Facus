import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from '~/components/Button';
import { Grid, GridColumn, GridRow } from '~/components/Grid';
import { LoadingIcon } from '~/components/Icon';
import { useAuth } from '~/context/AuthContext';
import styles from './ForgetPassword.module.scss';

const cx = classNames.bind(styles);
function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [resetSuccessfully, setResetSuccessfully] = useState(false);
    const { resetPassword } = useAuth();
    const navigate = useNavigate();

    const sendPassword = async () => {
        if (email) {
            setLoading(true);
            try {
                await resetPassword(email);
                setLoading(false);
                setResetSuccessfully(true);
                toast.success('Password reset email sent');
                setEmail('');
            } catch (error) {
                if (error.code === 'auth/user-not-found') {
                    toast.error('Email not found');
                } else if (error.code === 'auth/invalid-email') {
                    toast.error('Invalid email');
                } else {
                    toast.error('Fail to reset password');
                }
                setLoading(false);
            }
        } else {
            toast.error('Please enter your email');
        }
    };

    const logIn = () => {
        navigate('/log-in');
    };
    return (
        <Grid type={'landing'} className={cx('wrapper')}>
            <GridRow className={cx('header')}>
                <GridColumn l={3} m={4.5} s={9}>
                    <div className={cx('image')}>
                        <img src="images/Saly-10.png" alt="" />
                    </div>
                </GridColumn>
            </GridRow>
            <GridRow className={cx('body')}>
                <GridColumn l={4} l_o={4} m={8} m_o={2} s={10} s_o={1} className={cx('body__col')}>
                    <div className={cx('body__content')}>
                        <h2>{resetSuccessfully ? 'Email has been sent!' : 'Forgot your password?'}</h2>
                        <h6>
                            {resetSuccessfully
                                ? 'Please check your inbox or spam folder and click received link to reset password '
                                : 'Enter your register email bellow to receive password reset instruction'}
                        </h6>
                        <input
                            className={cx('input')}
                            value={email}
                            placeholder="Email here"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setResetSuccessfully(false);
                            }}
                        ></input>
                        <Button
                            primary
                            disabled={loading}
                            onClick={resetSuccessfully ? logIn : sendPassword}
                            leftIcon={resetSuccessfully ? <FontAwesomeIcon icon={faArrowRight} /> : ''}
                        >
                            {loading ? <LoadingIcon type={'button'} /> : resetSuccessfully ? 'Back to login' : 'Send'}
                        </Button>
                    </div>
                </GridColumn>
            </GridRow>
        </Grid>
    );
}

export default ForgetPassword;
