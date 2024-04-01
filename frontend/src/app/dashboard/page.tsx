"use client";
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";

const DashoardPage = () => {
  const { data: session } = useSession();
  return (
    <Fragment>
      <div>Dashboard</div>
      <p>Signed in as {session?.user?.email}</p>
    </Fragment>
  );
};

export default DashoardPage;
