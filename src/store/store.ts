import { createStore, AnyAction, Dispatch, Reducer } from 'redux'
import { loadPhonesFromAPI } from '../util/util'
import { ActionTypes } from './ActionTypes'
import thunk from 'redux-thunk'
import { applyMiddleware } from 'redux'

let tempBasket :{[id: string]:BasketItem } =
  {
    'apple_iphone_8_64gb_gold': {
      img: 'img/phones/IPhone_8/apple_iphone_8_gold.0.jpg',
      name: 'Apple IPhone 8 64Gb Gold',
      quantity: 1,
      priceWithDiscount: 800
    },
    'apple_iphone_8_64gb_silver': {
    img: 'img/phones/IPhone_8/apple_iphone_8_silver.0.jpg',
    name: 'Apple IPhone 8 64Gb Silver',
    quantity: 2,
    priceWithDiscount: 900
    },
    'apple_iphone_8_128gb_silver': {
      img: 'img/phones/IPhone_8/apple_iphone_8_silver.0.jpg',
      name: 'Apple IPhone 8 128Gb Silver',
      quantity: 3,
      priceWithDiscount: 1000
    }
  }




const initStore: PhoneCatalogStore = {
  phones: [],
  isError: false,
  isLoading: false,
  query: '',
  basket: tempBasket,
}

export const getIsLoading = (state:PhoneCatalogStore) => state.isLoading
export const getIsError = (state:PhoneCatalogStore) => state.isError
export const getPhones = (state:PhoneCatalogStore) => state.phones
export const getQuery = (state:PhoneCatalogStore) => state.query
export const getBasket = (state:PhoneCatalogStore) =>Object.entries(state.basket)
export const getFilteredPhones = (state:PhoneCatalogStore) => (
  state.phones.filter(item => {
    const pattern = new RegExp(state.query, 'gim')
    return item.name.search(pattern) >= 0
  })
)

export const getSumFromBasket = (state:PhoneCatalogStore) => {
  let sum = 0;
  console.log(Object.keys(state.basket))
  for(let key of Object.keys(state.basket)) {
    const { priceWithDiscount, quantity } = state.basket[key]
    sum += priceWithDiscount * quantity
  }
  return sum;
}

export const getCountAllGoodsInBasket = (state:PhoneCatalogStore) => {
  let sum = 0;
  console.log(Object.keys(state.basket))
  for(let key of Object.keys(state.basket)) {
    sum +=state.basket[key].quantity
  }
  return sum;
}

export const deleteBasketItem = (payload: string) => ({
  type: ActionTypes.DELETE_ITEM_FROM_BASKET,
  payload
})


export const addBasketItem = (payloadObj: {id: string, item:BasketItem}) => ({
  type: ActionTypes.ADD_ITEM_IN_BASKET,
  payloadObj
})

export const changeQuantityItem = (payload: {id: string, count: number}) => ({
  type: ActionTypes.CHANGE_QUANTITY_ITEM,
  payload
})

export const setSort = (payload: string) => ({
  type: ActionTypes.SET_SORT,
  payload
})

export const setError = (payload: boolean) => ({
  type: ActionTypes.SET_ERROR,
  payload,
})
export const setLoading = (payload: boolean) => ({
  type: ActionTypes.SET_LOADING,
  payload,
})

export const setPhones = (payload: Phone[]) => ({
  type: ActionTypes.SET_PHONES,
  payload,
})

export const setFilterQuery = (payload: string) => ({
  type: ActionTypes.SET_FILTER_QUERY,
  payload,
})

export const reducer: Reducer = (store: PhoneCatalogStore = initStore, action: AnyAction): PhoneCatalogStore => {
  switch (action.type) {
    case ActionTypes.SET_ERROR: {
      return { ...store, isError: action.payload }
    }

    case ActionTypes.ADD_ITEM_IN_BASKET: {
      const newItem: {[id: string]:BasketItem } = {[action.payloadObj.id]: action.payloadObj.item}
      return {
        ...store,
        basket: {...store.basket, ...newItem }
      }
    }

    case ActionTypes.DELETE_ITEM_FROM_BASKET: {
      delete store.basket[action.payload]
      return {
        ...store,
        basket: {...store.basket}
      }
    }

    case ActionTypes.SET_LOADING: {
      return { ...store, isLoading: action.payload }
    }

    case ActionTypes.SET_PHONES: {
      return {...store, phones: [...action.payload]}
    }

    case ActionTypes.SET_FILTER_QUERY: {
      return {...store, query: action.payload}
    }

    case ActionTypes.SET_SORT: {
      switch (action.payload) {
        case "cheaper": {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.regularPrice - phone2.regularPrice;
            })
          }
        }

        case "expensive": {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone2.regularPrice - phone1.regularPrice;
            })
          }
        }

        case "name": {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.name.localeCompare(phone2.name);
            })
          }
        }

        case "newest": {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone1.age - phone2.age;
            })
          }
        }

        case "oldest": {
          return {
            ...store,
            phones: store.phones.sort((phone1, phone2) => {
              return phone2.age - phone1.age;
            })
          }
        }

        case "rating": {
          return store
        }

        default: {
          return store
        }
      }
    }

    default: {
      return store
    }
  }
}

export const loadPhones = () => {
  return (dispath: Dispatch) => {
    dispath(setError(false));
    dispath(setLoading(true));
    return loadPhonesFromAPI()
      .then(phones => {
        dispath(setLoading(false));
        dispath(setPhones(phones))
      })
      .catch(() => {
        dispath(setLoading(false))
        dispath(setError(true))
      })
  }
}

function logStateAndAction(dispatch: Dispatch, store: PhoneCatalogStore) {
  return (next: Dispatch) => {

  }
}

export const store = createStore(reducer, initStore, applyMiddleware(thunk))
