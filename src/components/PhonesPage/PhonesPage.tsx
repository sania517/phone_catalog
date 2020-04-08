import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import './PhonesPage.scss'
import { Loader } from '../Loader/Loader'
import { Link } from 'react-router-dom'

import { loadPhones, getIsError, getPhones, getFilteredPhones, setFilterQuery } from '../../store/store'
import ListPhones from '../ListPhones/ListPhones'
import home from './../../img/home.svg'
import  Filter  from '../Filter/Filter'


interface Props {
  getLoading: boolean;
  phones: Phone[];

  setPhones: () => void;
}


const PhonesPage:FC<Props> = (props) => {
  const {setPhones, getLoading, phones} = props

  useEffect(() => {
    setPhones();
  },[])
  return (
    <div className="phones-page__container">
      <div className="link-chain">
        <Link
          to="/"
          className="mini-link link-chain__item"
        >
          <img src={home} alt="home link" className="mini-link__img"/>
        </Link>
        <p className="link-chain__item">></p>
        <p className="link-chain__item">Phones</p>
      </div>
      <h1 className="phones-page__title">Mobile Phones</h1>
      <p className="phones-page__amount">{`${phones.length} models`}</p>
      <Filter />
      {getLoading ? <Loader />: <ListPhones/>}
    </div>
  )
}

const dispatchMapToProps = {
  setPhones: loadPhones,
}

const mapStateToProps = (state:PhoneCatalogStore) => ({
  getLoading: getIsError(state),
  phones: getPhones(state),
})

export default connect( mapStateToProps, dispatchMapToProps)(PhonesPage)
