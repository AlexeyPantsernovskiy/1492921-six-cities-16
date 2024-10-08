import { CityName } from '@src/types/types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Pages } from '@src/const';
import { memo } from 'react';

type CityProps = {
  cityName: CityName;
  isActive: boolean;
};

function CityComponent({ cityName, isActive }: CityProps): JSX.Element {
  return (
    <li className="locations__item">
      <Link
        className={classNames('locations__item-link', 'tabs__item', {
          'tabs__item--active': isActive,
        })}
        to={isActive ? '#' : Pages.City.route.replace(':cityName', cityName)}
      >
        <span>{cityName}</span>
      </Link>
    </li>
  );
}

const City = memo(CityComponent);
export default City;
