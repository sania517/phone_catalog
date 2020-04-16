import React, { FC } from 'react';
import { connect } from 'react-redux';
import './FeaturedList.scss';
import Phone from '../Phone/Phone';
import Tablet from '../Tablet/Tablet';
import Accessory from '../Accessory/Accessory';
import { getFilteredFeatured } from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface Props {
  goods: FeaturedGood[];
}

export const FeaturedList: FC<Props> = ({ goods }) => {
  return (
    <ul className="featured__container">
      {goods.map(good => {
        if (good.goodCategory === goodsOptions.phone) {
          return <li key={good.id}><Phone phone={good} /></li>;
        }

        if (good.goodCategory === goodsOptions.tablet) {
          return <li key={good.id}><Tablet tablet={good} /></li>;
        }

        if (good.goodCategory === goodsOptions.accessory) {
          return <li key={good.id}><Accessory accessory={good} /></li>;
        }

        return '';
      })}
    </ul>
  );
};

const mapStateToProps = (state: PhoneCatalogStore) => ({
  goods: getFilteredFeatured(state),
});

export default connect(mapStateToProps, {})(FeaturedList);
