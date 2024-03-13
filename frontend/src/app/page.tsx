"use client";
//From React and Nextjs
import { Fragment } from "react";

//Custom made components
import Navbar from "@/components/navbar/Navbar";

//Third Party packages
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import LandingPage from "./landing/page";

export default function Home() {
  return (
    <Fragment>
      <NextUIProvider>
        <SessionProvider>
          <Navbar />
          <LandingPage />
        </SessionProvider>
      </NextUIProvider>
    </Fragment>
  );
}
