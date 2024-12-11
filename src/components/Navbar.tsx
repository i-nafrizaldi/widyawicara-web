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
      <div className="sticky top-0 bg-white shadow-md z-50">
        <div className="container px-4 mx-auto flex justify-between items-center h-14">
          {username && (
            <div className="gap-2 sm:gap-4 items-center hidden md:block">
              <p className="text-sm sm:text-lg md:text-xl font-bold">
                {username}
              </p>
            </div>
          )}

          <p
            className="text-lg sm:text-2xl md:text-3xl cursor-pointer font-black text-primary"
            onClick={() => {
              router.push("/");
            }}
          >
            ./NFRZLD
          </p>

          <div className="flex gap-4 sm:gap-8 items-center">
            {id ? (
              <div className="flex gap-2 sm:gap-5">
                <Button
                  className="font-bold text-xs sm:text-sm"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  className="font-bold text-xs sm:text-sm"
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
                className="font-bold text-xs sm:text-sm hover:bg-primary hover:text-white"
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
