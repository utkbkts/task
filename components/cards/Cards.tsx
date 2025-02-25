"use client";
import { IProduct } from "@/types/types";
import Image from "next/image";
import { Star, MapPin, MoveDownRight, Heart } from "lucide-react";
import Link from "next/link";
import Button from "@/ui/Button";
import useFavorites from "@/hooks/useFavorites";

const Card = ({ tour }: { tour: IProduct }) => {
  const { image, title, rating, location, prevPrice, price, id } = tour;
  const { favoriteIds, toggleFavorite } = useFavorites();

  return (
    <div className="shadow-lg rounded-xl overflow-hidden  bg-white hover:shadow-2xl transition-all">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          title={title}
          width={300}
          height={200}
          className="object-cover w-full h-48"
        />
        <Heart
          className="w-6 h-6 absolute top-4 right-4 cursor-pointer transition-all"
          color={favoriteIds?.includes(id) ? "red" : "white"}
          fill={favoriteIds?.includes(id) ? "red" : "none"}
          onClick={() => toggleFavorite!(tour)}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-yellow-500">
            <Star className="w-5 h-5" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-xl text-gray-900 truncate">
            {title}
          </h1>
        </div>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-2 text-lg">
            <span className="text-red-500 line-through flex items-center gap-1">
              THB {prevPrice} <MoveDownRight className="w-5 h-5" />
            </span>
            <span className="font-bold text-xl text-gray-900">THB {price}</span>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <Link href={""} className="underline text-primary-500 pt-2">
            Details
          </Link>
          <Button type="button">Book Now</Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
