import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { Pages } from '../../const';
import LoginPage from '../../pages/login-page/login-page';
import MainPage from '../../pages/main-page/main-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import ErrorPage from '../../pages/error-page/error-page';
import PrivateRoute from '../route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import LoginRoute from '../route/login-route';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path={Pages.Main.route} element={<MainPage />} />
          <Route path={Pages.City.route} element={<MainPage />} />
          <Route
            path={Pages.Favorites.route}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route
            path={Pages.Login.route}
            element={
              <LoginRoute>
                <LoginPage />
              </LoginRoute>
            }
          />
          <Route path={Pages.Offer.route} element={<OfferPage />} />
          <Route path={Pages.Error.route} element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
