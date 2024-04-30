import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { TbComponents } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { GiMeal } from "react-icons/gi";
import { LuCalendarDays } from "react-icons/lu";
import { BiLogOut } from "react-icons/bi";

import cn from "classnames";
import { signOut, useSession } from "next-auth/react";
import logo from "../../../assets/calories tracker logo.png";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";

const sideContent = [
  {
    label: "Dashboard",
    icon: <MdHome />,
    path: "/dashboard",
  },
  {
    label: "Meals",
    icon: <GiMeal />,
    path: "/meals",
  },
  {
    label: "Recipes",
    icon: <GrNotes />,
    path: "/recipes",
  },
  {
    label: "Ingredients",
    icon: <TbComponents />,
    path: "/ingredients",
  },
  {
    label: "Week",
    icon: <LuCalendarDays />,
    path: "/days",
  },
];

type props = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};
const Sidebar = ({ collapsed, setCollapsed }: props) => {
  // const [collapsed, setCollapsed] = useState<boolean>(false);
  const router = useRouter();
  const { data: session } = useSession();

  const logout = () => {
    signOut({ callbackUrl: "/" });
    // router.push("/");
  };

  return (
    <Fragment>
      {/* <div
        className={cn({
          "grid min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      > */}
      <div className=" bg-black border-r-medium border-r-gray-500 rounded-tr-2xl text-white pt-2  pl-2 flex flex-col justify-between ">
        {/* header */}
        <div>
          <div className="flex items-center gap-1">
            <Image src={logo} width={50} height={50} alt="logo" />
            <span className="font-bold text-xl">{!collapsed && "NutriCop"}</span>
          </div>
          <button
            className={cn({
              "absolute left-[170px] top-6": !collapsed,
              "absolute left-[58px] top-6": collapsed,
              "transition duration-500 ease-in-out": true,
            })}
            onClick={() => setCollapsed((prev) => !prev)}
          >
            {collapsed ? (
              <FaArrowCircleRight className="w-7 h-7 text-gray-200 " />
            ) : (
              <FaArrowCircleLeft className="w-7 h-7  text-gray-200" />
            )}
          </button>
          <hr className="-ml-2 border-gray-500 mt-2 mb-4" />
          {/* content */}
          <div className=" w-full -ml-2 flex flex-col items-center gap-4">
            {sideContent.map((e, index) => (
              <Link
                key={e.label}
                href={e.path}
                className="cursor-pointer px-2 rounded-2xl py-1 hover:bg-light-black"
              >
                <span
                  className={cn({
                    "text-2xl": !collapsed,
                    "text-3xl": collapsed,
                    "text-gray-500": true,
                  })}
                >
                  {collapsed && e.icon}
                </span>
                <span className="font-semibold text-lg text-gray-300">{!collapsed && e.label}</span>
              </Link>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="mb-16">
          {/* user */}
          {collapsed ? (
            <div className="flex flex-col gap-5">
              <div>
                {session?.user?.image && (
                  <img
                    src={session?.user?.image}
                    alt="Profile pic"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                )}
              </div>
              <div className="text-3xl  flex  cursor-pointer  " onClick={() => logout()}>
                <BiLogOut />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-5">
              <div className="flex gap-2 items-center">
                <div>
                  {session?.user?.image && (
                    <img
                      src={session?.user?.image}
                      alt="Profile pic"
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span>{session?.user?.name}</span>
                  <span className="text-xs text-blue-500">{session?.user?.email}</span>
                </div>
              </div>
              <div>
                <Button
                  radius="full"
                  onClick={() => logout()}
                  className="text-white bg-blue-600 px-3 py-2 rounded-lg font-normal"
                >
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </Fragment>
  );
};

export default Sidebar;
