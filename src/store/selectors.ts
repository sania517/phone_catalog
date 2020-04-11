export const getIsLoading = (state: PhoneCatalogStore) => state.isLoading;
export const getIsError = (state: PhoneCatalogStore) => state.isError;
export const getPhones = (state: PhoneCatalogStore) => state.phones;
export const getQuery = (state: PhoneCatalogStore) => state.query;
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

export const getFilteredPhones = (state: PhoneCatalogStore) => (
  state.phones.filter(item => {
    const pattern = new RegExp(state.query, 'gim');

    return item.name.search(pattern) >= 0;
  })
);

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
  state: PhoneCatalogStore, id: string,
): [number, number | undefined] => {
  const phone = state.phones.find(item => item.id === id);

  if (!phone) {
    return [0, 0];
  }

  return phone.discount
    ? [phone.regularPrice, phone.discount]
    : [phone.regularPrice, 0];
};

export const getPhoneById = (state: PhoneCatalogStore, id: string) => (
  state.phones.find(phone => phone.id === id)
);
