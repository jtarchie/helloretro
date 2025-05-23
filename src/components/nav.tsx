import type { JSX } from "preact/compat";
import { useAuth } from "../services/auth";

function Nav({ children }: { children?: JSX.Element | JSX.Element[] }) {
  const auth = useAuth();

  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
          <img
            class="w-8"
            src="/logo.png"
            alt="Logo of HelloRetro, 80s Synth rainbow squares"
          />
          HelloRetro
        </a>
      </div>

      {/* Children content (if any) */}
      {children && <div class="flex-none">{children}</div>}

      {/* Account section - always right-aligned */}
      <div class="flex-none ml-auto">
        {auth.isLoggedIn
          ? (
            <div class="dropdown dropdown-end">
              <label
                tabIndex={0}
                class="btn btn-ghost btn-circle avatar avatar-placeholder"
              >
                <div class="bg-neutral text-neutral-content rounded-full items-center justify-center w-10">
                  <span>
                    {auth.user?.username?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
              </label>
              <ul
                tabIndex={0}
                class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a href="/profile">Profile</a>
                </li>
                <li>
                  <a
                    href="/"
                    onClick={(e) => {
                      e.preventDefault();
                      auth.logout();
                    }}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )
          : (
            <div class="flex gap-2">
              <a href="/login" class="btn btn-ghost">Login</a>
              <a href="/signup" class="btn btn-primary">Sign up</a>
            </div>
          )}
      </div>
    </div>
  );
}

export { Nav };
