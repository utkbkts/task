import HomePage from "@/components/home/HomePage";
import { Suspense } from "react";

const Page = () => {
  return (
    <div className="container mx-auto">
      <Suspense>
        <HomePage />
      </Suspense>
    </div>
  );
};

export default Page;
