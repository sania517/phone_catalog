import React, { FC } from 'react';
import './FeaturedList.scss';
import { connect } from 'react-redux';
import { getFeatured } from '../../store/store';
import Phone from '../Phone/Phone';

interface Props {
  goods: [string, FeaturedGood][];
}

export const FeaturedList: FC<Props> = ({ goods }) => {
  console.log(goods);

  return (
    <ul className="featured__container">
      {goods.map(good => {
        if (good[1].goodCategory === 'phone') {
          return <li key={good[0]}><Phone phone={good[1]} /></li>;
        }
      })}
    </ul>
  );
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getFeatured(state),
});

export default connect(mapStateToProps, {})(FeaturedList);
