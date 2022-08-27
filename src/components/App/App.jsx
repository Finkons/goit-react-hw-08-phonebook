import Layout from 'components/Layout/Layout';
import PrivateRoute from 'components/Routes/PrivateRoute';
import PublicRoute from 'components/Routes/PublicRoute';
import { ProgressBar } from 'react-bootstrap';
import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const ContactsPage = lazy(() => import('pages/contacts-page'));
const Login = lazy(() => import('pages/login-page'));
const Register = lazy(() => import('pages/register-page'));

const UpdatePage = lazy(() => import('pages/update-page'));

let progressInterval = null;

const App = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    progressInterval = setInterval(() => {
      setProgress(prev => prev + 20);
    }, 20);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      clearInterval(progressInterval);
    }
  }, [progress]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          path="update/:contactId/*"
          element={
            <PrivateRoute
              component={
                <Suspense
                  fallback={
                    <ProgressBar variant="dark" animated now={progress} />
                  }
                >
                  <UpdatePage />
                </Suspense>
              }
            />
          }
        />
        <Route
          index
          element={
            <PrivateRoute
              component={
                <Suspense
                  fallback={
                    <ProgressBar variant="dark" animated now={progress} />
                  }
                >
                  <ContactsPage />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="LogIn"
          element={
            <PublicRoute
              component={
                <Suspense
                  fallback={
                    <ProgressBar variant="dark" animated now={progress} />
                  }
                >
                  <Login />
                </Suspense>
              }
            />
          }
        />
        <Route
          path="SignUp"
          element={
            <PublicRoute
              component={
                <Suspense
                  fallback={
                    <ProgressBar variant="dark" animated now={progress} />
                  }
                >
                  <Register />
                </Suspense>
              }
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};

export default App;
