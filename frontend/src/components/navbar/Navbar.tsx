import { FC } from "react";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import Image from "next/image";

import logo from "../../../assets/calories tracker logo.png";

const Navbar: FC = () => {
  return (
    <div className="flex justify-between items-center bg-neutral-950 py-2 px-3 absolute top-0 right-0 left-0">
      <div className="flex items-center">
        <Image src={logo} width={50} height={50} alt="logo" />
        <div className="text-white font-bold text-xl">NutriCop</div>
      </div>
      <div className="">
        <Button radius="full" className="text-white bg-blue-600 px-3 py-2 rounded-lg font-normal">
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
