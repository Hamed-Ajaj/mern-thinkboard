// components/guards/guest-guard.tsx
import { useSession } from "@/lib/auth-client";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import { LoaderIcon } from "react-hot-toast";

const GuestGuard = () => {
  const { data, isPending } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.session && !isPending) {
      navigate("/", { replace: true });
    }
  }, [data, isPending, navigate]);

  // While checking, show nothing or a loader (optional)
  if (isPending) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div> // or null
    );
  }

  // If not authenticated, render children
  return !data?.session ? <Outlet /> : null;
};

export default GuestGuard;
