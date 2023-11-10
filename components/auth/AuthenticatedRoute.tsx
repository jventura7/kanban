import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }, []);

  return localStorage.getItem("token") ? null : <>{children}</>;
}
