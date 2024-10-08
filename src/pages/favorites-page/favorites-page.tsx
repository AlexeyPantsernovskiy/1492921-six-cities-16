import {
  PlaceCardType,
  LogoType,
  NO_PLACES_FAVORITES_MESSAGE,
} from '@src/const';
import { Header, PlaceCard, Logo, Loading } from '@components';
import classNames from 'classnames';
import { CityName } from '@src/types/types';
import { Helmet } from 'react-helmet-async';
import { useAppSelector } from '@src/hooks/store';
import { favoritesSelectors } from '@store/favorites-slice/favorites-slice';
import { Link } from 'react-router-dom';

export default function FavoritesPage(): JSX.Element {
  const isLoading = useAppSelector(favoritesSelectors.isLoading);
  const favorites = useAppSelector(favoritesSelectors.placesCity);
  const favoritesCount = useAppSelector(favoritesSelectors.count);
  const isEmpty = favoritesCount === 0;
  return (
    <div
      className={classNames('page', { 'page--favorites-empty': isEmpty })}
      data-testid="test-favorites-page"
    >
      <Helmet>
        <title>6 городов. Избранное.</title>
      </Helmet>
      <Header />
      {isEmpty ? (
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              {isLoading && <Loading />}
              {!isLoading && (
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    {NO_PLACES_FAVORITES_MESSAGE}
                  </p>
                </div>
              )}
            </section>
          </div>
        </main>
      ) : (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.keys(favorites).map((city) => (
                  <li key={city} className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {(favorites[city as CityName] ?? []).map((place) => (
                        <PlaceCard
                          key={place.id}
                          place={place}
                          viewType={PlaceCardType.Favorite}
                        />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      )}
      <footer className="footer container">
        <Logo viewType={LogoType.Footer} />
      </footer>
    </div>
  );
}
