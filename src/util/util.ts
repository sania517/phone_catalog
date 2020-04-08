//const URL_PHONES = 'https://mate-academy.github.io/phone-catalogue-static/api/phones';
const URL_PHONES = 'http://localhost:11111';

export async function loadPhonesFromAPI(): Promise<Phone[]> {
  return fetch(`${URL_PHONES}`)
    .then(response => response.json())
}

export async function loadPhoneFromAPI(phoneId:string): Promise<PhoneDetails> {
  return fetch(`${URL_PHONES}/${phoneId}`)
    .then(
      response => response.json(),
      error => console.log('data response error', error)
    )
}

