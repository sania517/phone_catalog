import { goodsOptions } from '../util/enums';

export const getIsLoading = (state: PhoneCatalogStore) => state.isLoading;
export const getIsError = (state: PhoneCatalogStore) => state.isError;
export const getPhones = (state: PhoneCatalogStore) => state.phones;
export const getTablets = (state: PhoneCatalogStore) => state.tablets;
export const getAccessories = (state: PhoneCatalogStore) => state.accessories;
export const getPaginationParam = (state: PhoneCatalogStore) => (
  state.pagination
);
export const getAllGoods = (state: PhoneCatalogStore) => (
  {
    phones: state.phones,
    tablets: state.tablets,
    accessories: state.accessories,
    hotPricesGoods: state.hotPricesGoods,
    brandNewsGoods: state.brandNewsGoods,
    banners: state.banners,
  }
);
export const getQuery = (state: PhoneCatalogStore) => state.query;
export const getActiveCategory = (
  state: PhoneCatalogStore,
) => state.activeCategory;

export const getBasket = (state: PhoneCatalogStore) => (
  Object.entries(state.basket)
);

export const getFeatured = (state: PhoneCatalogStore) => (
  Object.values(state.featured)
);

export const getFilteredFeatured = (state: PhoneCatalogStore) => {
  const featuredGoods = Object.values(state.featured);
  const pattern = new RegExp(state.query, 'gim');

  return featuredGoods.filter(item => (
    item.name.search(pattern) >= 0
  ));
};

export const getIsInBasketGood = (
  state: PhoneCatalogStore,
  id: string,
): boolean => Object.prototype.hasOwnProperty.call(state.basket, id);

export const getIsInFeaturedGood = (
  state: PhoneCatalogStore,
  id: string,
): boolean => Object.prototype.hasOwnProperty.call(state.featured, id);

export const getFilteredGoods = (
  state: PhoneCatalogStore,
  option: goodsOptions,
) => {
  let goods;
  const pattern = new RegExp(state.query, 'gim');

  switch (option) {
    case goodsOptions.phone: {
      goods = state.phones;
      break;
    }

    case goodsOptions.tablet: {
      goods = state.tablets;
      break;
    }

    case goodsOptions.accessory: {
      goods = state.accessories;
      break;
    }

    default: {
      goods = [] as Phone[];
    }
  }

  return goods.filter(item => (
    item.name.search(pattern) >= 0
  ));
};

export const getSumFromBasket = (state: PhoneCatalogStore) => (
  Object.values(state.basket).reduce((acc, item) => {
    return acc + item.quantity * item.priceWithDiscount;
  }, 0)
);

export const getCountAllGoodsInBasket = (state: PhoneCatalogStore) => (
  Object.values(state.basket).reduce((acc, item) => {
    return acc + item.quantity;
  }, 0)
);

export const getPriceById = (
  state: PhoneCatalogStore,
  id: string,
  typeGood: goodsOptions,
): [number, number | undefined] => {
  let good: Phone | Tablet | Accessory | undefined;

  if (typeGood === goodsOptions.phone) {
    good = state.phones.find(item => item.id === id);
  }

  if (typeGood === goodsOptions.tablet) {
    good = state.tablets.find(item => item.id === id);
  }

  if (typeGood === goodsOptions.accessory) {
    good = state.accessories.find(item => item.id === id);
  }

  if (!good) {
    return [0, 0];
  }

  return good.discount
    ? [good.regularPrice, good.discount]
    : [good.regularPrice, 0];
};

export const getPhoneById = (state: PhoneCatalogStore, id: string) => (
  state.phones.find(phone => phone.id === id)
);

export const getTabletById = (state: PhoneCatalogStore, id: string) => (
  state.tablets.find(tablet => tablet.id === id)
);

export const getAccessoryById = (state: PhoneCatalogStore, id: string) => (
  state.accessories.find(accessory => accessory.id === id)
);
