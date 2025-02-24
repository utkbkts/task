"use client";

import { cn } from "@/utils/cn";
import React from "react";

interface Props {
  type: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({ children, type, className, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "bg-primary-500 py-2 px-4 rounded-xl text-white",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
