import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './PhonesPage.scss';
import { Loader } from '../Loader/Loader';
import { ListGoods } from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import {
  getIsError,
  getPhones,
  getPaginationParam,
  getFilteredGoods,
} from '../../store/selectors';
import { loadPhones, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions, paginationOptions } from '../../util/enums';
import { Pagination } from '../Pagination/Pagination';

interface Props {
  getLoading: boolean;
  phones: Phone[];
  setPhones: () => void;
  setActive: (payload: goodsOptions) => void;
  pagination: paginationOptions;
  filteredPhones: Phone[];
}

const PhonesPage: FC<Props> = (props) => {
  const {
    setPhones,
    getLoading,
    phones,
    setActive,
    pagination,
    filteredPhones,
  } = props;

  const [activePage, setActivePage] = useState(0);

  const onClickPage = (page: number) => {
    setActivePage(page);
  };

  const chankPhone = () => {
    return filteredPhones.slice(
      activePage * (+pagination),
      (activePage + 1) * (+pagination),
    );
  };

  useEffect(() => {
    setActivePage(0);
  }, [filteredPhones]);

  useEffect(() => {
    if (!phones.length) {
      setPhones();
    }

    setActive(goodsOptions.phone);
  }, [phones.length, setPhones, setActive]);

  return !phones.length
    ? <Loader />
    : (
      <div className="phones-page__container">
        <div className="link-chain">
          <Link
            to="/"
            className="mini-link link-chain__item"
          >
            <img src={home} alt="home link" className="mini-link__img" />
          </Link>
          <p className="link-chain__item">&gt;</p>
          <p className="link-chain__item">Phones</p>
        </div>
        <h1 className="phones-page__title">Mobile Phones</h1>
        <p className="phones-page__amount">{`${phones.length} models`}</p>
        <Filter />
        { getLoading
          ? <Loader />
          : (
            <>
              <ListGoods goodList={chankPhone()} option={goodsOptions.phone} />
              <Pagination
                countPages={Math.ceil(filteredPhones.length / (+pagination))}
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
  setPhones: loadPhones,
  setActive: setActiveCategory,
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  getLoading: getIsError(state),
  phones: getPhones(state),
  pagination: getPaginationParam(state),
  filteredPhones: getFilteredGoods(state, goodsOptions.phone),
});

export default connect(mapStateToProps, dispatchMapToProps)(PhonesPage);
