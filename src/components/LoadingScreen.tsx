"use client";

import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <main className="flex h-screen items-center justify-center">
      <Loader2 className=" animate-spin" />
    </main>
  );
};

export default LoadingScreen;
