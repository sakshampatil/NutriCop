import { Fragment } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@nextui-org/button";
import { NextPage } from "next";

import Link from "next/link";

const LandingPage: NextPage = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="flex flex-col w-full h-screen items-center justify-center ">
        <h1 className="text-6xl font-extrabold">
          Your Personal Nutrition <span className="text-blue-600">Tracker</span>
        </h1>
        <h2 className="text-2xl font-semibold">
          Empowering Healthier Choices with Easy Calorie and Protein Tracking
        </h2>
        <Button className="bg-blue-600 rounded-lg px-3 py-2 text-lg mt-3 font-semibold">
          <Link href="/api/auth/signin">Get Started</Link>
        </Button>
      </div>
    </Fragment>
  );
};

export default LandingPage;
