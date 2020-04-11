import React, { FC } from 'react';
import { connect } from 'react-redux';
import './ListPhones.scss';
import Phone from '../Phone/Phone';
import { getFilteredPhones } from '../../store/selectors';

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
