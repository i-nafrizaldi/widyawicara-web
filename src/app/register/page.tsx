"use client";

import LoggedIn from "@/hoc/LoggedIn";
import { FormRegister } from "./components/FormRegister";

const Register = () => {
  return (
    <main className=" min-h-screen place-content-center">
      <div className="px-6 md:justify-center md:grid md:grid-cols-2">
        <div className="text-9xl font-black hidden md:block place-content-center flex-col mx-auto ">
          <p>REGISTER</p>
          <p>PAGE.</p>
        </div>
        <div className=" md:p-24">
          <h1 className="text-4xl font-bold">Create Your Account.</h1>
          <FormRegister />
        </div>
      </div>
    </main>
  );
};

export default LoggedIn(Register);
