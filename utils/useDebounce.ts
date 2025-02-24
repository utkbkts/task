"use client";
import { useEffect, useState } from "react";
export const useDebounce = (value: string, delay: number) => {
  const [useDebounceValue, setUseDebounceValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setUseDebounceValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return useDebounceValue;
};
