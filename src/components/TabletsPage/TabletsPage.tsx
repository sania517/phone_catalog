import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TabletsPage.scss';
import { Loader } from '../Loader/Loader';
import ListGoods from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import { getIsError, getTablets } from '../../store/selectors';
import { loadTablets, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions } from '../../util/enums';

interface Props {
  getLoading: boolean;
  tablets: Tablet[];
  setTablets: () => void;
  setActive: (payload: goodsOptions) => void;
}

const PhonesPage: FC<Props> = (props) => {
  const { setTablets, getLoading, tablets, setActive } = props;

  useEffect(() => {
    setTablets();
    setActive(goodsOptions.tablet);
  }, []);

  return (
    <div className="tablets-page__container">
      <div className="link-chain">
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          <img src={home} alt="home link" className="mini-link__img" />
        </Link>
        <p className="link-chain__item">&gt;</p>
        <p className="link-chain__item">Tablets</p>
      </div>
      <h1 className="tablets-page__title">Tablets</h1>
      <p className="tablets-page__amount">{`${tablets.length} models`}</p>
      <Filter />
      {getLoading
        ? <Loader />
        : <ListGoods option={goodsOptions.tablet} />
      }
    </div>
  );
};

const dispatchMapToProps = {
  setTablets: loadTablets,
  setActive: setActiveCategory,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  getLoading: getIsError(state),
  tablets: getTablets(state),
});

export default connect(mapStateToProps, dispatchMapToProps)(PhonesPage);
