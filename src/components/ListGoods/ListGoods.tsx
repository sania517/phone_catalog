import React, { FC } from 'react';
import { connect } from 'react-redux';
import './ListGoods.scss';
import Phone from '../Phone/Phone';
import Tablet from '../Tablet/Tablet';
import Accessory from '../Accessory/Accessory';
import { getFilteredGoods } from '../../store/selectors';
import { goodsOptions } from '../../util/enums';

interface OwnProps {
  option: goodsOptions;
}

interface Props extends OwnProps {
  goods: Phone[] | Tablet[] | Accessory[];
}

const ListGoods: FC<Props> = ({ goods, option }) => {
  return (
    <ul className="goods__container">
      {goods.map(good => {
        if (option === goodsOptions.phone) {
          return <li key={good.id}><Phone phone={good} /></li>;
        }

        if (option === goodsOptions.tablet) {
          return <li key={good.id}><Tablet tablet={good} /></li>;
        }

        if (option === goodsOptions.accessory) {
          return <li key={good.id}><Accessory accessory={good} /></li>;
        }

        return '';
      })}
    </ul>
  );
};

const mapStateToProps = (state: PhoneCatalogStore, ownProps: OwnProps) => ({

  goods: getFilteredGoods(state, ownProps.option),
});

export default connect(mapStateToProps, {})(ListGoods);
