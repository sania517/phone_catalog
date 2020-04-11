import React, { FC } from 'react';
import { connect } from 'react-redux';
import './FeaturedList.scss';
import Phone from '../Phone/Phone';
import { getFeatured } from '../../store/selectors';

interface Props {
  goods: [string, FeaturedGood][];
}

export const FeaturedList: FC<Props> = ({ goods }) => {
  return (
    <ul className="featured__container">
      {goods.map(good => {
        if (good[1].goodCategory === 'phone') {
          return <li key={good[0]}><Phone phone={good[1]} /></li>;
        }

        return '';
      })}
    </ul>
  );
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getFeatured(state),
});

export default connect(mapStateToProps, {})(FeaturedList);
