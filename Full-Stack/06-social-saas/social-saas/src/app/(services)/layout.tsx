import React from "react";
import { auth } from "@clerk/nextjs/server";
import ServicesLayoutClient from "./ServicesLayoutClient";

const ServicesLayout = async ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  await auth.protect();

  return <ServicesLayoutClient>{children}</ServicesLayoutClient>;
  // return <ServicesLayoutClient/>
};

export default ServicesLayout;