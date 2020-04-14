import React, { FC } from 'react';
import './ListGoods.scss';
import Phone from '../Phone/Phone';
import Tablet from '../Tablet/Tablet';
import Accessory from '../Accessory/Accessory';
import { goodsOptions } from '../../util/enums';

interface Props {
  option: goodsOptions;
  goodList: Phone[] | Tablet[] | Accessory[];

}

export const ListGoods: FC<Props> = ({ option, goodList }) => {
  return (
    <ul className="goods__container">
      {goodList.map(good => {
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
