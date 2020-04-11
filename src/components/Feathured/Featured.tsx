import React, { FC } from 'react';
import './Featured.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import home from '../../img/home.svg';
import { getFeatured } from '../../store/store';
import FeaturedList from '../FeaturedList/FeaturedList';

interface Props {
  goods: [string, Phone][];
}

const Featured: FC<Props> = ({ goods }) => {
  return (
    <div className="featured">
      <div className="link-chain">
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          <img src={home} alt="home link" className="mini-link__img" />
        </Link>
        <p className="link-chain__item">></p>
        <p className="link-chain__item">Favourites</p>
      </div>
      <h1 className="featured__title">Favourites</h1>
      <p className="featured__amount">{`${goods.length} models`}</p>
      <FeaturedList />
    </div>
  );
};

const dispatchMapToProps = {
  // setPhones: loadPhones,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getFeatured(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Featured);
