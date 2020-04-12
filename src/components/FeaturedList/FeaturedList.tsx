import React, { FC } from 'react';
import { connect } from 'react-redux';
import './FeaturedList.scss';
import Phone from '../Phone/Phone';
import Tablet from '../Tablet/Tablet';
import Accessory from '../Accessory/Accessory';
import { getFeatured } from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface Props {
  goods: [string, FeaturedGood][];
}

export const FeaturedList: FC<Props> = ({ goods }) => {
  return (
    <ul className="featured__container">
      {goods.map(good => {
        if (good[1].goodCategory === goodsOptions.phone) {
          return <li key={good[0]}><Phone phone={good[1]} /></li>;
        }

        if (good[1].goodCategory === goodsOptions.tablet) {
          return <li key={good[0]}><Tablet tablet={good[1]} /></li>;
        }

        if (good[1].goodCategory === goodsOptions.accessory) {
          return <li key={good[0]}><Accessory accessory={good[1]} /></li>;
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
