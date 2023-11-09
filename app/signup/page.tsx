"use client";
import * as z from "zod";
import DesktopDarkIcon from "@/public/assets/logo-light.svg";
import DesktopLightIcon from "@/public/assets/logo-dark.svg";
import { useTheme } from "next-themes";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

enum FieldError {
  USERNAME,
  EMAIL,
}

export default function Page() {
  const { theme } = useTheme();
  const [uniqueError, setUniqeError] = useState<FieldError | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("http://localhost:3000/auth/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) {
        // Validation Error
        if (res.status === 400) {
          const target: String | undefined = data.error.meta?.target?.[0];
          setUniqeError(
            target === "username" ? FieldError.USERNAME : FieldError.EMAIL,
          );
          setTimeout(() => {
            setUniqeError(null);
          }, 3000);
        }
        throw new Error("Invalid credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-main-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-[26rem] space-y-14 rounded-2xl bg-nav-background p-12"
        >
          {theme === "light" ? (
            <DesktopLightIcon className="m-auto" />
          ) : (
            <DesktopDarkIcon className="m-auto" />
          )}
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-none border-0 border-b-2 bg-nav-background p-0 transition duration-300 focus:border-foreground"
                      placeholder="Username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {uniqueError === FieldError.USERNAME ? (
                      <h1>Username already in use</h1>
                    ) : null}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="rounded-none border-0 border-b-2 bg-nav-background p-0 transition duration-300 focus:border-foreground"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>
                    {" "}
                    {uniqueError === FieldError.EMAIL ? (
                      <h1>Email already in use</h1>
                    ) : null}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      className="rounded-none border-0 border-b-2 bg-nav-background p-0 transition duration-300 focus:border-foreground"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Button className="w-full transition duration-300" type="submit">
              Sign up
            </Button>
            <p className="mt-4 text-sm text-foreground">
              Already have an account?{" "}
              <span>
                <Link className="font-bold text-primary-blue" href="/login">
                  Log in
                </Link>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </main>
  );
}
