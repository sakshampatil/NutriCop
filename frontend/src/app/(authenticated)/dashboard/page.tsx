"use client";
import React, { Fragment, useEffect } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar/Sidebar";
import { setUser } from "@/store/features/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { IUser } from "@/types/authTypes";

const DashoardPage = () => {
  const session = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session.data?.user) {
      const data: IUser = session.data?.user;
      dispatch(setUser({ data }));
    }
  }, [session]);

  console.log("SESSSs = ", session);
  return <Fragment></Fragment>;
};

export default DashoardPage;
