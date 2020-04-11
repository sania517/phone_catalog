import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import { loadPhonesFromAPI } from '../util/util';

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

export const setSort = (payload: string) => ({
  type: ActionTypes.SET_SORT,
  payload,
});

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

export const setFilterQuery = (payload: string) => ({
  type: ActionTypes.SET_FILTER_QUERY,
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
