"use client";
import { NextUIProvider } from "@nextui-org/system";
import { SessionProvider } from "next-auth/react";
import React, { Fragment } from "react";
import { store } from "../../store/store";
import { Provider } from "react-redux";

const ProvidersWrapper = ({ children }: any) => {
  return (
    <Fragment>
      <SessionProvider>
        <NextUIProvider>
          <Provider store={store}>{children} </Provider>,
        </NextUIProvider>
      </SessionProvider>
    </Fragment>
  );
};

export default ProvidersWrapper;
