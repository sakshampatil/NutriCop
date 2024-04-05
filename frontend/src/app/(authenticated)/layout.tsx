"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { Fragment } from "react";

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <Fragment>
      {session !== null && <Sidebar />}
      {children}
    </Fragment>
  );
}
