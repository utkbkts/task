import { Globe, Heart, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="bg-white shadow-xl w-full h-24">
      <div className="container mx-auto p-2 flex items-center justify-between h-full">
        <div className="cursor-pointer">
        <Menu />
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={"/logo.png"}
            alt="logo"
            title="logo_png"
            width={400}
            height={400}
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <Globe />
          <Heart />
          <ShoppingCart />
          <Image
            src={"https://github.com/shadcn.png"}
            alt="logo"
            title="logo_png"
            width={400}
            height={400}
            className="w-10 h-10 object-cover rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
