// components/guards/auth-guard.tsx
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

const AuthGuard = () => {
  const { data, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!data?.session && !isPending) {
      // Redirect to login if not authenticated
      navigate("/login", { replace: true });
    }
  }, [data, isPending, navigate]);

  if (isPending) {
    return <div>Loading...</div>; // or a spinner
  }

  // Only render child routes if authenticated
  return data?.session ? <Outlet /> : null;
};

export default AuthGuard;
