// const URL_PHONES = 'http://localhost:11111/data';
// const URL_PHONES = process.env.REACT_APP_URL_PHONES;
const URL_PHONES = '/data';

export async function loadPhonesFromAPI(): Promise<Phone[]> {
  return fetch(`${URL_PHONES}/phones`)
    .then(response => response.json());
}

export async function loadTabletsFromAPI(): Promise<Tablet[]> {
  return fetch(`${URL_PHONES}/tablets`)
    .then(response => response.json());
}

export async function loadAccessoriesFromAPI(): Promise<Accessory[]> {
  return fetch(`${URL_PHONES}/accessories`)
    .then(response => response.json());
}

export async function loadPhoneFromAPI(phoneId: string): Promise<PhoneDetails> {
  return fetch(`${URL_PHONES}/phones/${phoneId}`)
    .then(
      response => response.json(),
    );
}

export async function loadTabletFromAPI(
  tabletId: string,
): Promise<TabletDetails> {
  return fetch(`${URL_PHONES}/tablets/${tabletId}`)
    .then(
      response => response.json(),
    );
}

export async function loadAccessoryFromAPI(
  accessoryId: string,
): Promise<AccessoryDetails> {
  return fetch(`${URL_PHONES}/accessories/${accessoryId}`)
    .then(
      response => response.json(),
    );
}

export async function loadHotPricesFromAPI(
  accessoryId: string,
): Promise<AccessoryDetails> {
  return fetch(`${URL_PHONES}/hotPrices/${accessoryId}`)
    .then(
      response => response.json(),
    );
}
