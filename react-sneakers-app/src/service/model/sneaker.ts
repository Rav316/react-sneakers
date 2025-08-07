export interface SneakerListItem {
  id: number;
  name: string;
  type: SneakerType;
  imageUrl: string;
  price: number;
  firm: number;
  isFavorite: boolean;
}

export interface Sneaker {
  id: number;
  name: string;
  type: SneakerType;
  imageUrl: string;
  price: number;
  description: string;
  firm: string;
  items: SneakerItem[];
}

export interface SneakerItem {
  id: number;
  sneakerId: number;
  size: number;
}

export interface SneakerType {
  id: number;
  name: string;
}
