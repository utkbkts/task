import { StaticImageData } from "next/image";

export type IProduct = {
  id: string;
  title: string;
  activity: string[];
  discount: number;
  features: string[];
  group_size: string;
  image: string | StaticImageData;
  location: string;
  prevPrice: number;
  price: number;
  rating: number;
  start_time: number;
  finish_time: number;
  theme: string[];
  vehicle: string[];
};
