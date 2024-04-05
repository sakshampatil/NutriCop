"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";
import cn from "classnames";

import { GiHamburgerMenu } from "react-icons/gi";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
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
        {/* sidebar */}
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        {/* content */}
        <div className=""> {children}</div>
      </div>
    </Fragment>
  );
}