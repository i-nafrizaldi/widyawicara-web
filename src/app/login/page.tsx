"use client";

import LoggedIn from "@/hoc/LoggedIn";
import { FromLogin } from "./components/FormLogin";

const Login = () => {
  return (
    <main className=" min-h-screen place-content-center">
      <div className="px-6 justify-center grid grid-cols-2">
        <div className="text-9xl font-black flex place-content-center flex-col mx-auto ">
          <p>LOGIN</p>
          <p>PAGE.</p>
        </div>
        <div className=" p-24">
          <h1 className="text-4xl font-bold">Welcome back !!</h1>
          <FromLogin />
        </div>
      </div>
    </main>
  );
};

export default LoggedIn(Login);
