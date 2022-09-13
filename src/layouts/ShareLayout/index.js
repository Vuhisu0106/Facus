import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

function ShareLayout() {
    return (
        <div>
            <Header />
            <Outlet />
        </div>
    );
}

export default ShareLayout;
