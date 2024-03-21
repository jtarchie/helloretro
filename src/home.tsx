import { Nav } from "./components/nav";

function Home({}: { path?: string }) {
  return (
    <>
      <Nav />
      <div class="container p-4 mx-auto">
        <div
          class="hero min-h-80"
          style="background-image: url(/screenshot.png);"
        >
          <div class="hero-overlay rounded bg-opacity-90"></div>
          <div class="hero-content text-center text-neutral-content">
            <div class="max-w-lg">
              <h1 class="mb-5 text-5xl font-bold">
                Reflect on your team's work
              </h1>
              <p class="mb-5">
                HelloRetro is a tool that helps teams run retrospectives more
                effectively. It's designed to foster open communication and
                collaborative discussion, allowing team members to share their
                thoughts and ideas on how to move forward.
              </p>
              <a href="/retros/new" class="btn btn-primary btn-lg" data-native>
                Start the retro
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Home };
