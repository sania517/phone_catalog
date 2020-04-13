import { goodsOptions } from '../util/enums';

export const getIsLoading = (state: PhoneCatalogStore) => state.isLoading;
export const getIsError = (state: PhoneCatalogStore) => state.isError;
export const getPhones = (state: PhoneCatalogStore) => state.phones;
export const getTablets = (state: PhoneCatalogStore) => state.tablets;
export const getAccessories = (state: PhoneCatalogStore) => state.accessories;
export const getAllGoods = (state: PhoneCatalogStore) => (
  {
    phones: state.phones,
    tablets: state.tablets,
    accessories: state.accessories,
    hotPricesGoods: state.hotPricesGoods,
    brandNewsGoods: state.brandNewsGoods,
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
  Object.entries(state.featured)
);

export const getIsInBasketGood = (
  state: PhoneCatalogStore, id: string,
): boolean => (state.basket.hasOwnProperty(id));

export const getIsInFeaturedGood = (
  state: PhoneCatalogStore, id: string,
): boolean => (
  state.featured.hasOwnProperty(id)
);

export const getFilteredGoods = (
  state: PhoneCatalogStore,
  option: goodsOptions,
) => {
  let goods;

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
  }

  return goods.filter(item => {
    const pattern = new RegExp(state.query, 'gim');

    return item.name.search(pattern) >= 0;
  });
};

export const getSumFromBasket = (state: PhoneCatalogStore) => {
  let sum = 0;

  for (const key of Object.keys(state.basket)) {
    const { priceWithDiscount, quantity } = state.basket[key];

    sum += priceWithDiscount * quantity;
  }

  return sum;
};

export const getCountAllGoodsInBasket = (state: PhoneCatalogStore) => {
  let sum = 0;

  for (const key of Object.keys(state.basket)) {
    sum += state.basket[key].quantity;
  }

  return sum;
};

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
