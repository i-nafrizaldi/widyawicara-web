"use client";

import FormInput from "@/components/FormInput";
import FormSelect from "@/components/FormSelect";
import GenderItem from "@/components/GenderItem";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useRegister from "@/hooks/api/auth/useRegister";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ValidationSchema } from "../validationSchema";

export function FormRegister() {
  const { register, isLoading } = useRegister();

  const form = useForm<z.infer<typeof ValidationSchema>>({
    mode: "all",
    resolver: zodResolver(ValidationSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof ValidationSchema>) {
    register(values);
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
          name="email"
          type="email"
          label="Email"
          placeholder="your@mail.com"
          form={form}
        />
        <FormInput
          name="password"
          type="password"
          label="Password"
          placeholder="Entry Password"
          form={form}
        />

        <FormSelect
          name="gender"
          label="Gender"
          form={form}
          item={<GenderItem />}
          placeholder="Select Gender"
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className=" animate-spin" /> : "Register"}
          {isLoading ?? "Register Success !"}
        </Button>

        <div className="mx-auto font-light">
          Already have an account?{" "}
          <Link
            href={`/login`}
            className="text-mythemes-maingreen hover:underline font-bold hover:text-mythemes-secondaryblue"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
