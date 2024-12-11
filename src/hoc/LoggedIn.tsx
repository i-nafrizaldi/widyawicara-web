"use client";

import { useAppSelector } from "@/redux/hooks";
import { redirect } from "next/navigation";

export default function LoggedIn(Component: any) {
  return function IsAuth(props: any) {
    const { id } = useAppSelector((state) => state.user);

    if (id) {
      return redirect("/");
    }

    return <Component {...props} />;
  };
}
