"use client";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import React, { Fragment } from "react";

const ProvidersWrapper = ({ children }: any) => {
  return (
    <Fragment>
      <SessionProvider>
        <NextUIProvider>{children}</NextUIProvider>
      </SessionProvider>
    </Fragment>
  );
};

export default ProvidersWrapper;
