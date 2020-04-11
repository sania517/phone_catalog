import React, { FC } from 'react';
import './ListPhones.scss';
import { connect } from 'react-redux';
import { getPhones, getFilteredPhones } from '../../store/store';
import Phone from '../Phone/Phone';

interface Props {
  phones: Phone[];
}

const ListPhones: FC<Props> = ({ phones }) => {
  return (
    <ul className="phones__container">
      {phones.map(phone => (<li key={phone.id}><Phone phone={phone} /></li>))}
    </ul>
  );
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  phones: getFilteredPhones(state),
});

export default connect(mapStateToProps, {})(ListPhones);
