"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useLogin from "@/hooks/api/auth/useLogin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "../validationSchema";

export function FromLogin() {
  const { login, isLoading } = useLogin();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    resolver: zodResolver(ValidationSchema),
  });

  function onSubmit(values: z.infer<typeof ValidationSchema>) {
    login(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 flex flex-col justify-center gap-2 mt-5"
      >
        <FormInput
          name="username"
          type="username"
          label="Username"
          placeholder="Username"
          form={form}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Entry Password"
          form={form}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className=" animate-spin" /> : "Login"}
          {isLoading ?? "Login Success !"}
        </Button>

        <div className="mx-auto font-light">
          Don't have an account?{" "}
          <Link
            href={`/register`}
            className="text-mythemes-maingreen hover:underline font-bold hover:text-mythemes-secondaryblue"
          >
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
