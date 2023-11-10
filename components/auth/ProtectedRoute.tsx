import { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      router.push("/login");
    }
  }, []);

  return localStorage.getItem("token") ? <>{children}</> : null;
}
