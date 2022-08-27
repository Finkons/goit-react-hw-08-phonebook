import { Outlet } from 'react-router-dom';
import NavBar from 'components/NavBar';
import { Container } from 'react-bootstrap';
import { ScrollToTop } from 'react-to-top';
import { ToastContainer, Flip } from 'react-toastify';

const Layout = () => (
  <>
    <NavBar />
    <main>
      <Container>
        <ToastContainer
          position="bottom-right"
          theme="dark"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          transition={Flip}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <Outlet />
        <ScrollToTop
          style={{ bottom: '50px' }}
          bgColor="var(--bs-dark-rgba)"
          size={60}
          strokeWidth={3}
          symbolSize={25}
          symbol="⇧"
        />
      </Container>
    </main>
  </>
);

export default Layout;
