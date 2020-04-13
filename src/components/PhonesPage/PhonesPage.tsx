import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './PhonesPage.scss';
import { Loader } from '../Loader/Loader';
import ListGoods from '../ListGoods/ListGoods';
import home from '../../img/home.svg';
import Filter from '../Filter/Filter';
import { getIsError, getPhones } from '../../store/selectors';
import { loadPhones, setActiveCategory } from '../../store/actionCreators';
import { goodsOptions } from '../../util/enums';

interface Props {
  getLoading: boolean;
  phones: Phone[];
  setPhones: () => void;
  setActive: (payload: goodsOptions) => void;
}

const PhonesPage: FC<Props> = (props) => {
  const { setPhones, getLoading, phones, setActive } = props;

  useEffect(() => {
    if (!phones.length) {
      setPhones();
    }

    setActive(goodsOptions.phone);
  }, []);

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
          : <ListGoods option={goodsOptions.phone} />
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
});

export default connect(mapStateToProps, dispatchMapToProps)(PhonesPage);
