/// <reference types="react-scripts" />

interface Phone {
  age: number;
  carrier?: string;
  id: string;
  imageUrl: string;
  name: string;
  snippet: string;
  ram?: string;
  flash?: string;
  screenSize?: string;
  screenType?: string;
  regularPrice: number;
  discount?: number;
}

interface PhoneCatalogStore {
  phones: Phone[];
  isError: boolean;
  isLoading: boolean;
  query: string;
  basket: {[id: string]:BasketItem };
}

interface PhoneDetails {
  name: string;
  images: string[];
  storage: {
    flash: string,
    ram: string,
    availableFlash: string[]
  };
  processor: string;
  description: Array<{title: string, text: string}>;
  id: string;
  display: {
    screenResolution: string,
    screenSize: string,
    typeScreen: string,
  };
  connectivity: {
    cell: string
  };
  camera: {
    primary: string,
    front: string,
    zoom: string,
  };
  color: string;
  colorHash: string;
  avalibleColors: Array<{title: string, value: string}>;

}

enum sortOptions {
  name = "name",
  newest = "newest",
  oldest = "oldest",
  cheaper = "cheaper",
  expensive = "expensive",
  rating = "rating",
}

interface BasketItem {
  img: string;
  name: string;
  quantity: number;
  priceWithDiscount: number;
}
