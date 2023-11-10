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
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthenticatedRoute from "@/components/auth/AuthenticatedRoute";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Page() {
  const { theme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Something went wrong");
      }
      localStorage.setItem("token", data.token);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthenticatedRoute>
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
                    <FormMessage />
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
                Login
              </Button>
              <p className="mt-4 text-sm text-foreground">
                Don't have an account?{" "}
                <span>
                  <Link className="font-bold text-primary-blue" href="/signup">
                    Sign up
                  </Link>
                </span>
              </p>
            </div>
          </form>
        </Form>
      </main>
    </AuthenticatedRoute>
  );
}
