import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AccessoriesPage.scss';
import { Loader } from '../Loader/Loader';
import ListGoods from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import { getIsError, getAccessories } from '../../store/selectors';
import { loadAccessories, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions } from '../../util/enums';

interface Props {
  getLoading: boolean;
  accessories: Accessory[];
  setAccessories: () => void;
  setActive: (payload: goodsOptions) => void;
}

const AccessoriesPage: FC<Props> = (props) => {
  const { setAccessories, getLoading, accessories, setActive } = props;

  useEffect(() => {
    setAccessories();
    setActive(goodsOptions.accessory);
  }, []);

  return (
    <div className="accessories-page__container">
      <div className="link-chain">
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          <img src={home} alt="home link" className="mini-link__img" />
        </Link>
        <p className="link-chain__item">&gt;</p>
        <p className="link-chain__item">Accessories</p>
      </div>
      <h1 className="accessories-page__title">Accessories page</h1>
      <p className="accessories-page__amount">
        {`${accessories.length} models`}
      </p>
      <Filter />
      {getLoading
        ? <Loader />
        : <ListGoods option={goodsOptions.accessory} />
      }
    </div>
  );
};

const dispatchMapToProps = {
  setAccessories: loadAccessories,
  setActive: setActiveCategory,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  getLoading: getIsError(state),
  accessories: getAccessories(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(AccessoriesPage);
