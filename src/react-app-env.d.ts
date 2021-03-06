/// <reference types="react-scripts" />

interface Phone {
  age: number;
  carrier?: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet?: string;
  ram?: string;
  flash?: string;
  screenSize?: string;
  screenType?: string;
  regularPrice: number;
  discount?: number;
  cellOption?: string;
  produced: string;
  color: string;
  forModel: string;
}

type FeaturedGood = PhoneFeathured | TabletFeathured | AccessoryFeathured

interface PhoneFeathured extends Phone {
  goodCategory: string;
}

interface Tablet {
  age: number;
  carrier?: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet?: string;
  ram?: string;
  flash?: string;
  screenSize?: string;
  screenType?: string;
  regularPrice: number;
  discount?: number;
  cellOption?: string;
  produced: string;
  color: string;
  forModel: string;
}

interface TabletFeathured extends Tablet {
  goodCategory: string;
}

interface Accessory {
  age: number;
  carrier?: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet?: string;
  ram?: string;
  flash?: string;
  screenSize?: string;
  screenType?: string;
  regularPrice: number;
  discount?: number;
  cellOption?: string;
  produced: string;
  color: string;
  forModel: string;
}

interface AccessoryFeathured extends Accessory {
  goodCategory: string;
}

interface PhoneDetails {
  name: string;
  images: string[];
  storage: {
    flash: string;
    ram: string;
    availableFlash: string[];
  };
  processor: string;
  description: Array<{title: string; text: string}>;
  id: string;
  display: {
    screenResolution: string;
    screenSize: string;
    typeScreen: string;
  };
  connectivity: {
    cell: string;
  };
  camera: {
    primary: string;
    front: string;
    zoom: string;
  };
  color: string;
  colorHash: string;
  avalibleColors: Array<{title: string; value: string}>;
}

interface TabletDetails {
  name: string;
  images: string[];
  storage: {
    flash: string;
    ram: string;
    availableFlash: string[];
  };
  processor: string;
  description: Array<{title: string; text: string}>;
  id: string;
  display: {
    screenResolution: string;
    screenSize: string;
    typeScreen: string;
  };
  connectivity: {
    cell: string;
  };
  camera: {
    primary: string;
    front: string;
    zoom: string;
  };
  color: string;
  colorHash: string;
  avalibleColors: Array<{title: string; value: string}>;
  cellOption: string;
  availableCellOptions: string[];
}

interface AccessoryDetails {
  name: string;
  images: string[];
  description: Array<{title: string; text: string}>;
  id: string;
  color: string;
  colorHash: string;
  avalibleColors: Array<{title: string; value: string}>;
  produced: string;
  forModel: string;
}

// enum sortOptions {
//   name = 'name',
//   newest = 'newest',
//   oldest = 'oldest',
//   cheaper = 'cheaper',
//   expensive = 'expensive',
//   rating = 'rating',
// }

interface BasketItem {
  img: string;
  name: string;
  quantity: number;
  priceWithDiscount: number;
}

interface PhoneCatalogStore {
  accessories: Accessory[];
  tablets: Tablet[];
  phones: Phone[];
  isError: boolean;
  isLoading: boolean;
  query: string;
  basket: {[id: string]: BasketItem };
  featured: {[id: string]: FeaturedGood};
  activeCategory: goodsOptions;
  hotPricesGoods: FeaturedGood[];
  brandNewsGoods: FeaturedGood[];
  banners: Banner[];
  pagination: paginationOptions;
}

interface Banner {
  id: string;
  imageUrl: string;
  name: string;
}
