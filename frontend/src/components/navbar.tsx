import { PlusIcon } from "lucide-react";
import { Link } from "react-router";
import { signOut, useSession } from "../lib/auth-client";

const Navbar = () => {
  const { data, isPending } = useSession();
  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            <Link to="/">ThinkBoard</Link>
          </h1>
          <div className="flex items-center gap-4">
            {data?.user && !isPending ? (
              <div className="flex gap-4 items-center">
                <Link to={"/create"} className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button
                  onClick={async () => await signOut()}
                  className="btn btn-link"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
