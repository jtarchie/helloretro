import { JSX } from "preact/compat";

function Nav({ children }: { children?: JSX.Element }) {
  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost text-xl">
          <img class="w-8" src="/logo.png" /> HelloRetro
        </a>
      </div>
      <div class="flex-none gap-4">
        {children}
        <button
          class="btn btn-ghost btn-sm"
          onClick={() =>
            (document.getElementById("about_modal") as HTMLDialogElement)
              .showModal()}
        >
          About
        </button>
      </div>
    </div>
  );
}

export { Nav };
