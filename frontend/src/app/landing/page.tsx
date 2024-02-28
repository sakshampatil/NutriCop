import { Button } from "@nextui-org/button";
import { NextPage } from "next";

const LandingPage: NextPage = () => {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center ">
      <h1 className="text-6xl font-extrabold">
        Your Personal Nutrition <span className="text-blue-600">Tracker</span>
      </h1>
      <h2 className="text-2xl font-semibold">
        Empowering Healthier Choices with Easy Calorie and Protein Tracking
      </h2>
      <Button className="bg-blue-600 rounded-lg px-3 py-2 text-lg mt-3 font-semibold">
        Get Started
      </Button>
    </div>
  );
};

export default LandingPage;
