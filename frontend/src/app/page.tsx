"use client";
import { Fragment } from "react";

import Navbar from "@/components/navbar/Navbar";

import { NextUIProvider } from "@nextui-org/system";
import LandingPage from "./landing/page";

export default function Home() {
  return (
    <Fragment>
      <NextUIProvider>
        <Navbar />
        <LandingPage />
      </NextUIProvider>
    </Fragment>
  );
}
