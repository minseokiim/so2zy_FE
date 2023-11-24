import React, { Suspense } from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import SearchList from './pages/searchList';
import { Header } from '@components/common/Header';
import SignUp from 'pages/signUp';
import SignIn from 'pages/signIn';
import { GlobalStyle } from './styles/globalStyles';
import { ThemeProvider } from 'styled-components';
import { theme } from '@styles/theme';
import { Card } from '@components/common/Card';
import { PlaceDetail } from './pages/placeDetail/components/PlaceDetail.page';
import Modal from 'react-modal';
import Reservation from 'pages/reservation';

const Main = React.lazy(() => import('./pages/main'));
// const SearchList = React.lazy(() => import('./pages/searchList'));
// const Card = React.lazy(() => import('./components/common/Card'));
// const PlaceDetail = React.lazy(() => import('./pages/placeDetail'));
Modal.setAppElement('#root');

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <div className="App">
          <Suspense fallback={<div>로딩중...</div>}>
            <Routes>
              <Route
                path="/signUp"
                element={
                  <Card>
                    <SignUp />
                  </Card>
                }
              />
              <Route
                path="/signIn"
                element={
                  <Card>
                    <SignIn />
                  </Card>
                }
              />
              <Route
                path="/"
                element={
                  <Card>
                    <Main />
                  </Card>
                }
              />
              <Route
                path="/searchList"
                element={
                  <>
                    <Header />
                    <SearchList />
                  </>
                }
              />
              <Route
                path="/place/:id"
                element={
                  <Card>
                    <PlaceDetail />
                  </Card>
                }
              />
              <Route
                path="/reservation"
                element={
                  <Card>
                    <Reservation />
                  </Card>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
