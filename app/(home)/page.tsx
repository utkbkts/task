"use client";
import { Suspense } from "react";
import TabsClick from "../../components/custom/TabsClick";

const HomePage = () => {
  return (
    <div className="container mx-auto">
      <Suspense>
        <TabsClick />
      </Suspense>
    </div>
  );
};

export default HomePage;
