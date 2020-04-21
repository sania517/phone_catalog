import { Dispatch } from 'redux';

import { ActionTypes } from './ActionTypes';
import {
  loadPhonesFromAPI,
  loadTabletsFromAPI,
  loadAccessoriesFromAPI,
  loadBrandNewFromAPI,
  loadHotPricesFromAPI,
  loadBannersFromAPI,
} from '../util/util';
import { getActiveCategory } from './selectors';
import { store } from './store';
import { goodsOptions, paginationOptions, sortOptions } from '../util/enums';
import Tablet from '../components/Tablet/Tablet';

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

    default: {
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

export const setPaginationParam = (payload: paginationOptions) => ({
  type: ActionTypes.SET_PAGINATION_PARAM,
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

export const setHotPrices = (payload: FeaturedGood[]) => ({
  type: ActionTypes.SET_HOT_PRICES,
  payload,
});

export const setBrandNews = (payload: FeaturedGood[]) => ({
  type: ActionTypes.SET_BRAND_NEWS,
  payload,
});

export const setBanners = (payload: Banner[]) => ({
  type: ActionTypes.SET_BANNERS,
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

export const loadGoods = () => {
  return async(dispath: Dispatch) => {
    dispath(setError(false));
    dispath(setLoading(true));

    return Promise.all<
      Phone[],
      Tablet[],
      Accessory[],
      FeaturedGood[],
      FeaturedGood[],
      Banner[]
    >([
      loadPhonesFromAPI(),
      loadTabletsFromAPI(),
      loadAccessoriesFromAPI(),
      loadHotPricesFromAPI(),
      loadBrandNewFromAPI(),
      loadBannersFromAPI(),
    ])
      .then(([
        phones,
        tablets,
        accessories,
        hotPrices,
        brandNews,
        banners,
      ]) => {
        dispath(setLoading(false));
        dispath(setPhones(phones));
        dispath(setTablets(tablets));
        dispath(setAccessories(accessories));
        dispath(setHotPrices(hotPrices));
        dispath(setBrandNews(brandNews));
        dispath(setBanners(banners));
      })
      .catch(() => {
        dispath(setLoading(false));
        dispath(setError(true));
      });
  };
};
