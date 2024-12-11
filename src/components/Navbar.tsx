"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const router = useRouter();
  const { username, id } = useAppSelector((state) => state.user);

  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem("storage");
    dispatch(logoutAction());
  };
  return (
    <>
      <div className="sticky top-0 hidden md:block bg-white shadow-md z-50">
        <div className="container px-4 mx-auto flex justify-between items-center h-14 ">
          {username && (
            <div className="flex gap-4 items-center">
              <p className="text-xl font-bold">{username}</p>
            </div>
          )}

          <p
            className="text-3xl cursor-pointer font-black text-primary"
            onClick={() => {
              router.push("/");
            }}
          >
            ./NFRZLD
          </p>
          <div className="flex gap-8">
            {id ? (
              <div className="flex gap-5">
                <Button
                  className="font-bold"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  className="font-bold"
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    logout();
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="font-bold hover:bg-primary hover:text-white"
                onClick={() => router.push("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
