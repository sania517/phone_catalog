import React, { FC, useEffect } from 'react';
import './HomePage.scss';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import phonesImg from '../../img/phones.jpg';
import tabletsImg from '../../img/tablets.jpg';
import accessoriesImg from '../../img/accessories.jpg';
import { getAllGoods } from '../../store/selectors';
import { loadGoods } from '../../store/actionCreators';
import { Loader } from '../Loader/Loader';
import { Carousel } from '../Carousel/Carousel';
import { Banner } from '../Banner/Banner';

interface Props {
  allGoods: {
    phones: Phone[];
    tablets: Tablet[];
    accessories: Accessory[];
    hotPricesGoods: FeaturedGood[];
    brandNewsGoods: FeaturedGood[];
    banners: Banner[];
  };
  loadAllGoods: () => void;
}

const HomePage: FC<Props> = ({ allGoods, loadAllGoods }) => {
  const {
    phones,
    tablets,
    accessories,
    hotPricesGoods,
    brandNewsGoods,
    banners,
  } = allGoods;

  useEffect(() => {
    if (!hotPricesGoods.length) {
      loadAllGoods();
    }
  }, [hotPricesGoods.length, loadAllGoods]);

  return !hotPricesGoods.length
    ? <Loader />
    : (
      <div className="home">
        <div className="home__banner">
          <Banner banners={banners} />
        </div>
        <div className="home__hot-prices">
          <h2 className="home__hot-prices-title">Hot prices</h2>
          <div className="home__hot-prices-carousel">
            <Carousel goods={hotPricesGoods} />
          </div>
        </div>
        <div className="home__categories">
          <h2 className="home__categories-title">Shop by category</h2>
          <div className="home__categories-container">
            <div className="home__categories-item">
              <Link className="home__categories-wriper-img" to="/phones">
                <img
                  className="home__categories-img"
                  src={phonesImg}
                  alt="phones link"
                />
              </Link>
              <Link to="/phones" className="home__categories-text">
                Mobile phones
              </Link>
              <p className="home__categories-count">
                {`${phones.length} models`}
              </p>
            </div>
            <div className="home__categories-item">
              <Link className="home__categories-wriper-img" to="/tablets">
                <img
                  className="home__categories-img"
                  src={tabletsImg}
                  alt="phones link"
                />
              </Link>
              <Link to="/tablets" className="home__categories-text">
                Tablets
              </Link>
              <p className="home__categories-count">
                {`${tablets.length} models`}
              </p>
            </div>
            <div className="home__categories-item">
              <Link className="home__categories-wriper-img" to="/accessories">
                <img
                  className="home__categories-img"
                  src={accessoriesImg}
                  alt="phones link"
                />
              </Link>
              <Link to="/accessories" className="home__categories-text">
                Accessories
              </Link>
              <p className="home__categories-count">
                {`${accessories.length} models`}
              </p>
            </div>
          </div>
        </div>
        <div className="home__hot-prices">
          <h2 className="home__hot-prices-title">Brand New</h2>
          <div className="home__hot-prices-carousel">
            <Carousel goods={brandNewsGoods} />
          </div>
        </div>
      </div>
    );
};

const dispatchMapToProps = {
  loadAllGoods: loadGoods,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  allGoods: getAllGoods(state),

});

export default connect(mapStateToProps, dispatchMapToProps)(HomePage);
