import Header from '~/components/Header';
import Sidebar from '~/components/Sidebar';

function DefaultLayout({ children }) {
    return (
        <div className="wrapper">
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
                <Sidebar />
            </div>
        </div>
    );
}

export default DefaultLayout;
