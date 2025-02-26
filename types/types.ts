import { StaticImageData } from "next/image";

export type IProduct = {
  id: string;
  title: string;
  activity: string[];
  discount: number;
  features: string[];
  groupSize: any;
  image: string | StaticImageData;
  location: string;
  prevPrice: number;
  price: any;
  rating: number;
  start_time: any;
  finish_time: any;
  theme: string[];
  vehicle: string[];
};
