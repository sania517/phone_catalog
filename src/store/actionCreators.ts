import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import {
  loadPhonesFromAPI,
  loadTabletsFromAPI,
  loadAccessoriesFromAPI,
} from '../util/util';
import { getActiveCategory } from './selectors';
import { store } from './store';
import { goodsOptions } from '../util/enums';

export const deleteBasketItem = (payload: string) => ({
  type: ActionTypes.DELETE_ITEM_FROM_BASKET,
  payload,
});

export const deleteFeaturedItem = (payload: string) => ({
  type: ActionTypes.DELETE_ITEM_FROM_FEATURED,
  payload,
});

export const addBasketItem = (payload: {id: string; item: BasketItem}) => ({
  type: ActionTypes.ADD_ITEM_IN_BASKET,
  payload,
});

export const addFeaturedItem = (payload:
  {id: string; item: FeaturedGood }) => ({
  type: ActionTypes.ADD_ITEM_IN_FEATURED,
  payload,
});

export const changeQuantityItem = (payload: {id: string; count: number}) => {
  return {
    type: ActionTypes.CHANGE_QUANTITY_ITEM,
    payload,
  };
};

export const setSort = (payload: sortOptions) => {
  let type: ActionTypes = ActionTypes.DEFAULT;

  switch (getActiveCategory(store.getState())) {
    case goodsOptions.phone: {
      type = ActionTypes.SET_SORT_PHONES;
      break;
    }

    case goodsOptions.accessory: {
      type = ActionTypes.SET_SORT_ACCESSORIES;
      break;
    }

    case goodsOptions.tablet: {
      type = ActionTypes.SET_SORT_TABLETS;
      break;
    }
  }

  return {
    type, payload,
  };
};

export const setError = (payload: boolean) => ({
  type: ActionTypes.SET_ERROR,
  payload,
});
export const setLoading = (payload: boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload,
});

export const setPhones = (payload: Phone[]) => ({
  type: ActionTypes.SET_PHONES,
  payload,
});

export const setTablets = (payload: Tablet[]) => ({
  type: ActionTypes.SET_TABLETS,
  payload,
});

export const setAccessories = (payload: Accessory[]) => ({
  type: ActionTypes.SET_ACCESSORIES,
  payload,
});

export const setFilterQuery = (payload: string) => ({
  type: ActionTypes.SET_FILTER_QUERY,
  payload,
});

export const setActiveCategory = (payload: goodsOptions) => ({
  type: ActionTypes.SET_ACTIVE_CATEGORY,
  payload,
});

export const loadPhones = () => {
  return (dispath: Dispatch) => {
    dispath(setError(false));
    dispath(setLoading(true));

    return loadPhonesFromAPI()
      .then(phones => {
        dispath(setLoading(false));
        dispath(setPhones(phones));
      })
      .catch(() => {
        dispath(setLoading(false));
        dispath(setError(true));
      });
  };
};

export const loadTablets = () => {
  return (dispath: Dispatch) => {
    dispath(setError(false));
    dispath(setLoading(true));

    return loadTabletsFromAPI()
      .then(tablets => {
        dispath(setLoading(false));
        dispath(setTablets(tablets));
      })
      .catch(() => {
        dispath(setLoading(false));
        dispath(setError(true));
      });
  };
};

export const loadAccessories = () => {
  return (dispath: Dispatch) => {
    dispath(setError(false));
    dispath(setLoading(true));

    return loadAccessoriesFromAPI()
      .then(accessories => {
        dispath(setLoading(false));
        dispath(setAccessories(accessories));
      })
      .catch(() => {
        dispath(setLoading(false));
        dispath(setError(true));
      });
  };
};
