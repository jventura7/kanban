import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

type AuthenticatedRouteProps = {
  children: ReactNode;
};

const fetchUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
  });
  return res.ok ? await res.json() : null;
};

export default function AuthenticatedRoute({
  children,
}: AuthenticatedRouteProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const authenticateUser = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUser(userData);
        router.push("/");
      } else {
        setUser("NOT FOUND");
      }
    };
    authenticateUser();
  }, []);

  return user === "NOT FOUND" ? <>{children}</> : null;
}
