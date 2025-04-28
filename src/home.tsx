import { useCallback } from "preact/hooks";
import { Nav } from "./components/nav";
import { useLocation } from "preact-iso";
import { pb, useAuth } from "./services/auth";

type BoardData = {
  created_by?: string;
};

function Home({}: { path?: string }) {
  const location = useLocation();
  const auth = useAuth();

  const onClick = useCallback(async () => {
    // Create a board record with or without user ID
    const data: BoardData = {};

    // If user is logged in, attach their user ID to the retrospective
    if (auth.isLoggedIn && auth.user) {
      data.created_by = auth.user.id;
    }

    try {
      const record = await pb.collection("boards").create(data);
      location.route(`/retros/${record.id}`, true);
    } catch (error) {
      console.error("Error creating board:", error);
      // If there's an error, create an anonymous board as fallback
      const record = await pb.collection("boards").create({});
      location.route(`/retros/${record.id}`, true);
    }
  }, [auth.isLoggedIn, auth.user]);

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
              <h2 class="mb-5 text-2xl font-bold">
                No sign up required!
              </h2>
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
