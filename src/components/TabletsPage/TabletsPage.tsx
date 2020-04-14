import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './TabletsPage.scss';
import { Loader } from '../Loader/Loader';
import { ListGoods } from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import {
  getIsError,
  getTablets,
  getPaginationParam,
  getFilteredGoods,
} from '../../store/selectors';
import { loadTablets, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions, paginationOptions } from '../../util/enums';
import { Pagination } from '../Pagination/Pagination';

interface Props {
  getLoading: boolean;
  tablets: Tablet[];
  setTablets: () => void;
  setActive: (payload: goodsOptions) => void;
  pagination: paginationOptions;
  filteredTablets: Tablet[];
}

const PhonesPage: FC<Props> = (props) => {
  const {
    setTablets,
    getLoading,
    tablets,
    setActive,
    pagination,
    filteredTablets,
  } = props;

  const [activePage, setActivePage] = useState(0);

  const onClickPage = (page: number) => {
    setActivePage(page);
  };

  const chankPhone = () => {
    return filteredTablets.slice(
      activePage * (+pagination),
      (activePage + 1) * (+pagination),
    );
  };

  useEffect(() => {
    setActivePage(0);
  }, [filteredTablets]);

  useEffect(() => {
    if (!tablets.length) {
      setTablets();
    }

    setActive(goodsOptions.tablet);
  }, []);

  return !tablets.length
    ? <Loader />
    : (
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
          : (
            <>
              <ListGoods goodList={chankPhone()} option={goodsOptions.tablet} />
              <Pagination
                countPages={Math.ceil(filteredTablets.length / (+pagination))}
                onClickHandler={onClickPage}
                activePage={activePage}
              />
            </>
          )
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
  pagination: getPaginationParam(state),
  filteredTablets: getFilteredGoods(state, goodsOptions.tablet),
});

export default connect(mapStateToProps, dispatchMapToProps)(PhonesPage);
