import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './AccessoriesPage.scss';
import { Loader } from '../Loader/Loader';
import { ListGoods } from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import {
  getIsError,
  getAccessories,
  getPaginationParam,
  getFilteredGoods,
} from '../../store/selectors';
import { loadAccessories, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions, paginationOptions } from '../../util/enums';
import { Pagination } from '../Pagination/Pagination';

interface Props {
  getLoading: boolean;
  accessories: Accessory[];
  setAccessories: () => void;
  setActive: (payload: goodsOptions) => void;
  pagination: paginationOptions;
  filteredAccessories: Accessory[];
}

const AccessoriesPage: FC<Props> = (props) => {
  const {
    setAccessories,
    getLoading,
    accessories,
    setActive,
    pagination,
    filteredAccessories,
  } = props;

  const [activePage, setActivePage] = useState(0);

  const onClickPage = (page: number) => {
    setActivePage(page);
  };

  const chankPhone = () => {
    return filteredAccessories.slice(
      activePage * (+pagination),
      (activePage + 1) * (+pagination),
    );
  };

  useEffect(() => {
    setActivePage(0);
  }, [filteredAccessories]);

  useEffect(() => {
    if (!accessories.length) {
      setAccessories();
    }

    setActive(goodsOptions.accessory);
  }, [accessories.length, setAccessories, setActive]);

  return !accessories.length
    ? <Loader />
    : (
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
          : (
            <>
              <ListGoods
                goodList={chankPhone()}
                option={goodsOptions.accessory}
              />
              <Pagination
                countPages={
                  Math.ceil(filteredAccessories.length / (+pagination))
                }
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
  setAccessories: loadAccessories,
  setActive: setActiveCategory,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  getLoading: getIsError(state),
  accessories: getAccessories(state),
  pagination: getPaginationParam(state),
  filteredAccessories: getFilteredGoods(state, goodsOptions.accessory),
});

export default connect(mapStateToProps, dispatchMapToProps)(AccessoriesPage);
