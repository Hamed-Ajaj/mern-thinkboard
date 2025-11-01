import { PlusIcon, Menu } from "lucide-react";
import { Link } from "react-router";
import { signOut, useSession } from "../lib/auth-client";
import { useState } from "react";

const Navbar = () => {
  const { data, isPending } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMenu = () => setMobileOpen((prev) => !prev);

  return (
    <header className="bg-base-300 border-b border-base-content/10">
      <nav className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <h1 className="text-3xl font-bold text-primary font-mono tracking-tight">
            <Link to="/">ThinkBoard</Link>
          </h1>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {data?.user && !isPending ? (
              <>
                <span className="text-sm opacity-80">{data.user.email}</span>
                <Link to="/create" className="btn btn-primary">
                  <PlusIcon className="size-5" />
                  <span>New Note</span>
                </Link>
                <button
                  onClick={async () => await signOut()}
                  className="btn btn-link"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="btn btn-ghost md:hidden" onClick={toggleMenu}>
            <Menu className="size-6" />
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="mt-4 flex items-start flex-col gap-4 md:hidden">
            {data?.user && !isPending ? (
              <>
                <span className="text-sm font-medium opacity-80">
                  {data.user.email}
                </span>
                <Link
                  to="/create"
                  className="btn btn-primary  justify-start gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <PlusIcon className="size-5" />
                  New Note
                </Link>
                <button
                  onClick={async () => {
                    await signOut();
                    setMobileOpen(false);
                  }}
                  className="btn btn-link justify-start"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-ghost w-full justify-start"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
