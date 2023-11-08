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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export default function Login() {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-main-background">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-fit w-[26rem] space-y-12 rounded-2xl bg-nav-background p-8"
        >
          {theme === "light" ? (
            <DesktopLightIcon className="m-auto" />
          ) : (
            <DesktopDarkIcon className="m-auto" />
          )}
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your username" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </form>
      </Form>
    </main>
  );
}
