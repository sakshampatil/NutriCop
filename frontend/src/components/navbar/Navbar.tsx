import { FC } from "react";

import { Button } from "@nextui-org/button";
import Link from "next/link";

const Navbar: FC = () => {
  return (
    <div className="flex justify-between items-center bg-neutral-950 py-2 px-3 absolute top-0 right-0 left-0">
      <div className="text-white font-bold text-lg">NutriCop</div>
      <div className="">
        <Button radius="full" className="text-white bg-blue-600 px-3 py-2 rounded-lg font-normal">
          <Link href="/api/auth/signin">Login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
