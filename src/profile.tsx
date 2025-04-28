import { useEffect, useState } from "preact/hooks";
import { Nav } from "./components/nav";
import { pb, useAuth } from "./services/auth";
import { useLocation } from "preact-iso";
import { RecordModel } from "pocketbase";

// type Board = {
//   id: string;
//   created: string;
//   updated: string;
// }

function Profile({}: { path?: string }) {
  const auth = useAuth();
  const location = useLocation();
  const [boards, setBoards] = useState<RecordModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Redirect to login page if not logged in
    if (!auth.isLoggedIn || !auth.user) {
      location.route("/login", true);
      return;
    }

    // Fetch the user's retrospective boards
    const fetchBoards = async () => {
      try {
        setIsLoading(true);
        setError("");

        // Use PocketBase API to get the boards created by the current user
        const boardRecords = await pb.collection("boards").getList(1, 50, {
          filter: `created_by = "${auth.user?.id}"`,
          sort: "-created",
        });

        setBoards(boardRecords.items);
      } catch (error) {
        console.error("Error fetching boards:", error);
        setError("Failed to load your retrospectives. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, [auth.isLoggedIn, auth.user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Nav />
      <div class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-6">Your Profile</h1>

        {auth.user && (
          <div class="mb-8">
            <div class="flex items-center gap-4">
              <div class="bg-neutral text-neutral-content rounded-full w-16 h-16 flex items-center justify-center text-2xl">
                {auth.user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 class="text-xl font-bold">{auth.user.username}</h2>
                <p class="text-gray-500">
                  Member since {formatDate(auth.user.created)}
                </p>
              </div>
            </div>
          </div>
        )}

        <h2 class="text-2xl font-semibold mb-4">Your Retrospectives</h2>

        {isLoading && (
          <div class="flex justify-center my-8">
            <span class="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {error && (
          <div class="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {!isLoading && !error && boards.length === 0 && (
          <div class="text-center py-8">
            <p class="text-lg mb-4">
              You haven't created any retrospectives yet.
            </p>
            <a href="/" class="btn btn-primary">Create Your First Retro</a>
          </div>
        )}

        {!isLoading && boards.length > 0 && (
          <div class="overflow-x-auto">
            <table class="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Created</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {boards.map((board) => (
                  <tr key={board.id}>
                    <td>{formatDate(board.created)}</td>
                    <td>{formatDate(board.updated)}</td>
                    <td>
                      <a
                        href={`/retros/${board.id}`}
                        class="btn btn-sm btn-primary mr-2"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export { Profile };
