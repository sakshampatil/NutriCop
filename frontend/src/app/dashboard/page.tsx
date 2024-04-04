"use client";
import React, { Fragment } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/components/sidebar/Sidebar";

const DashoardPage = () => {
  const { data: session } = useSession();
  console.log("Session", session);
  return (
    <Fragment>
      {/* <div>Dashboard</div>
      <p>Signed in as {session?.user?.email}</p> */}
      <Sidebar
        name={session?.user?.name}
        email={session?.user?.email}
        profile={session?.user?.image}
      />
    </Fragment>
  );
};

export default DashoardPage;
