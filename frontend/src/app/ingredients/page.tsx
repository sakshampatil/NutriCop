"use client";
import React, { Fragment } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";

const Ingredients = () => {
  const { data: session } = useSession();
  return (
    <Fragment>
      <Sidebar
        name={session?.user?.name}
        email={session?.user?.email}
        profile={session?.user?.image}
      />
    </Fragment>
  );
};

export default Ingredients;
