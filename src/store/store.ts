import { createStore, AnyAction, Reducer, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { ActionTypes } from './ActionTypes';

const initStore: PhoneCatalogStore = {
  phones: [],
  isError: false,
  isLoading: false,
  query: '',
  basket: {},
  featured: {},
};

export const reducer: Reducer = (
  store: PhoneCatalogStore = initStore,
  action: AnyAction,
): PhoneCatalogStore => {
  switch (action.type) {
    case ActionTypes.SET_ERROR: {
      return {
        ...store, isError: action.payload,
      };
    }

    case ActionTypes.CHANGE_QUANTITY_ITEM: {
      const newGood = {
        ...store.basket[action.payload.id],
        quantity: action.payload.count,
      };

      return {
        ...store,
        basket: {
          ...store.basket,
          [action.payload.id]: newGood,
        },
      };
    }

    case ActionTypes.DELETE_ITEM_FROM_FEATURED: {
      const newFetured = { ...store.featured };

      delete newFetured[action.payload];

      return {
        ...store,
        featured: newFetured,
      };
    }

    case ActionTypes.ADD_ITEM_IN_BASKET: {
      const newItem: {[id: string]: BasketItem } = {
        [action.payload.id]: action.payload.item,
      };

      return {
        ...store,
        basket: {
          ...store.basket, ...newItem,
        },
      };
    }

    case ActionTypes.ADD_ITEM_IN_FEATURED: {
      const newItem: {[id: string]: FeaturedGood } = {
        [action.payload.id]: action.payload.item,
      };

      return {
        ...store,
        featured: {
          ...store.featured, ...newItem,
        },
      };
    }

    case ActionTypes.DELETE_ITEM_FROM_BASKET: {
      const newBasket = { ...store.basket };

      delete newBasket[action.payload];

      return {
        ...store,
        basket: newBasket,
      };
    }

    case ActionTypes.SET_LOADING: {
      return {
        ...store, isLoading: action.payload,
      };
    }

    case ActionTypes.SET_PHONES: {
      return {
        ...store, phones: [...action.payload],
      };
    }

    case ActionTypes.SET_FILTER_QUERY: {
      return {
        ...store, query: action.payload,
      };
    }

    case ActionTypes.SET_SORT: {
      switch (action.payload) {
        case 'cheaper': {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.regularPrice - phone2.regularPrice;
            }),
          };
        }

        case 'expensive': {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone2.regularPrice - phone1.regularPrice;
            }),
          };
        }

        case 'name': {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.name.localeCompare(phone2.name);
            }),
          };
        }

        case 'newest': {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.age - phone2.age;
            }),
          };
        }

        case 'oldest': {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone2.age - phone1.age;
            }),
          };
        }

        case 'rating': {
          return store;
        }

        default: {
          return store;
        }
      }
    }

    default: {
      return store;
    }
  }
};

export const store = createStore(reducer, initStore, applyMiddleware(thunk));
