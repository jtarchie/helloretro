import { useCallback } from "preact/hooks";
import { Nav } from "./components/nav";
import PocketBase from "pocketbase";
import { useLocation } from "preact-iso";

function Home({}: { path?: string }) {
  const location = useLocation();

  const onClick = useCallback(async () => {
    const client = new PocketBase();
    const record = await client.collection("boards").create({});
    location.route(`/retros/${record.id}`, true);
  }, []);

  return (
    <>
      <Nav />
      <div class="container p-4 mx-auto">
        <div
          class="hero min-h-80"
          style="background-image: url(/screenshot.png);"
        >
          <div class="hero-overlay"></div>
          <div class="hero-content text-center text-neutral-content">
            <div class="max-w-lg">
              <h1 class="mb-5 text-5xl font-bold">
                Reflect on your work
              </h1>
              <p class="mb-5">
                HelloRetro is a tool that helps teams run retrospectives more
                effectively. It's designed to foster open communication and
                collaborative discussion, allowing team members to share their
                thoughts and ideas on how to move forward.
              </p>
              <button
                type="button"
                class="btn btn-primary btn-lg"
                onClick={onClick}
              >
                Start your retro
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
