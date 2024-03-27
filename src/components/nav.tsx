import { JSX } from "preact/compat";

function Nav({ children }: { children?: JSX.Element }) {
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1 ">
        <a href="/" class="btn btn-ghost text-xl">
          <img
            class="w-8"
            src="/logo.png"
            alt="Logo of HelloRetro, 80s Synth rainbow squares"
          />
          HelloRetro
        </a>
      </div>
      <div class="flex-none gap-4">
        {children}
      </div>
    </div>
  );
}

export { Nav };
