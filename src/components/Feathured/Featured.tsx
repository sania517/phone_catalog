import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Featured.scss';
import home from '../../img/home.svg';
import FeaturedList from '../FeaturedList/FeaturedList';
import { getFeatured } from '../../store/selectors';

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
        <p className="link-chain__item">&gt;</p>
        <p className="link-chain__item">Favourites</p>
      </div>
      <h1 className="featured__title">Favourites</h1>
      <p className="featured__amount">{`${goods.length} models`}</p>
      <FeaturedList />
    </div>
  );
};

const dispatchMapToProps = {
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getFeatured(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(Featured);
