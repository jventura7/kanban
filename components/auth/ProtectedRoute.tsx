import { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const fetchUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user`, {
    method: "GET",
    credentials: "include",
  });
  return res.ok ? await res.json() : null;
};

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const userData = await fetchUser();
        if (!userData) {
          router.push("/login");
        }
        setUser(userData);
      } catch (err) {
        console.log(err);
      }
    };
    authenticateUser();
  }, []);

  return user ? <>{children}</> : null;
}
