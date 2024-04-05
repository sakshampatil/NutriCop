"use client";
//From React and Nextjs
import { Fragment } from "react";

//Custom made components
import Navbar from "@/components/navbar/Navbar";

//Third Party packages

import LandingPage from "./landing/page";
import DashoardPage from "./(authenticated)/dashboard/page";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Fragment>
      {/* {session !== null && <Sidebar />} */}
      <LandingPage />
    </Fragment>
  );
}
