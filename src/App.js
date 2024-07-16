import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import './scss/style.scss';
import DefaultHome from './components/DefaultHome';

// Containers
const DefaultLayoutTT = React.lazy(() => import('./turktraktor/layout/DefaultLayout'));
const DefaultLayoutHava = React.lazy(() => import('./havakirlilik/layout/DefaultLayout'));
const DefaultLayoutEnerjisa = React.lazy(() => import('./enerjisa/layout/DefaultLayout'));
const DefaultLayoutCEOOffice = React.lazy(() => import('./ceooffice/layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />
          <Route path="/turktraktor/*" element={<DefaultLayoutTT />} />
          <Route path="/havakirlilik/*" element={<DefaultLayoutHava />} />
          <Route path="/enerjisa/*" element={<DefaultLayoutEnerjisa />} />
          <Route path="/ceooffice/*" element={<DefaultLayoutCEOOffice />} />
          <Route path="/" element={<DefaultHome/>} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
