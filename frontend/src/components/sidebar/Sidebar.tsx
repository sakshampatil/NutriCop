import React, { Fragment, PropsWithChildren, useState } from "react";

import cn from "classnames";

import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { TbComponents } from "react-icons/tb";
import { GrNotes } from "react-icons/gr";
import { GiMeal } from "react-icons/gi";
import { LuCalendarDays } from "react-icons/lu";

import Image from "next/image";
import logo from "../../../assets/calories tracker logo.png";

const sideContent = [
  {
    label: "Dashboard",
    icon: <MdHome />,
    path: "/dashboard",
  },
  {
    label: "Meals",
    icon: <GiMeal />,
    path: "/dashboard",
  },
  {
    label: "Recipes",
    icon: <GrNotes />,
    path: "/dashboard",
  },
  {
    label: "Ingredients",
    icon: <TbComponents />,
    path: "/dashboard",
  },
  {
    label: "Days",
    icon: <LuCalendarDays />,
    path: "/dashboard",
  },
];

type User = {
  name?: string | null;
  email?: string | null;
  profile?: string | null;
};

const Sidebar = ({ name, email, profile }: User) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  return (
    <Fragment>
      <div
        className={cn({
          "grid min-h-screen": true,
          "grid-cols-sidebar": !collapsed,
          "grid-cols-sidebar-collapsed": collapsed,
          "transition-[grid-template-columns] duration-300 ease-in-out": true,
        })}
      >
        <div className=" bg-light-black text-white pt-3 pl-2 flex flex-col justify-between ">
          {/* header */}
          <div>
            <div className="flex items-center gap-1">
              <Image src={logo} width={50} height={50} alt="logo" />
              <span className="font-bold text-xl">{!collapsed && "NutriCop"}</span>
            </div>
            <button
              className={cn({
                "absolute left-[260px] top-6": !collapsed,
                "absolute left-[58px] top-6": collapsed,
                "transition duration-500 ease-in-out": true,
              })}
              onClick={() => setCollapsed((prev) => !prev)}
            >
              {collapsed ? (
                <FaArrowCircleRight className="w-7 h-7 text-blue-500 " />
              ) : (
                <FaArrowCircleLeft className="w-7 h-7  text-blue-500" />
              )}
            </button>
            <hr className="-ml-2 mt-2 mb-4" />
            {/* content */}
            <div className="pl-2 ">
              {sideContent.map((e, index) => (
                <div className="flex items-center gap-2 cursor-pointer mb-4">
                  <span
                    className={cn({
                      "text-2xl": !collapsed,
                      "text-3xl": collapsed,
                      "text-blue-500": true,
                    })}
                  >
                    {e.icon}
                  </span>
                  <span className="font-semibold text-lg">{!collapsed && e.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Footer */}
          <div className="mb-16">
            {/* user */}
            {collapsed ? (
              <div>
                {profile && (
                  <img
                    src={profile}
                    alt="Profile pic"
                    width={42}
                    height={42}
                    className="rounded-full"
                  />
                )}
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <div>
                  {profile && (
                    <img
                      src={profile}
                      alt="Profile pic"
                      width={42}
                      height={42}
                      className="rounded-full"
                    />
                  )}
                </div>
                <div className="flex flex-col">
                  <span>{name}</span>
                  <span className="text-xs text-blue-500">{email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
