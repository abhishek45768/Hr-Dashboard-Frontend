import Sidebar from './Sidebar';
import Header from './Header';
import '../../styles/Layout.css';

const Layout = ({ children, title }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Header title={title} />
        <div className="content-container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;