import { useState } from "preact/hooks";
import { Nav } from "./components/nav";
import { useAuth } from "./services/auth";
import { useLocation } from "preact-iso";

function SignupPage({}: { path?: string }) {
  const auth = useAuth();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password || !confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await auth.register(username, password);
      // Navigate to home page after successful registration
      location.route("/", true);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Signup failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <div class="container mx-auto py-8 px-4 flex justify-center items-center">
        <div class="card w-full max-w-md bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-2xl font-bold mb-6">
              Create an Account
            </h2>

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

            <form onSubmit={handleSubmit}>
              <div class="form-control">
                <label class="label" for="username">
                  <span class="label-text">Username</span>
                </label>
                <input
                  type="text"
                  id="username"
                  placeholder="Choose a username"
                  class="input input-bordered w-full"
                  value={username}
                  onInput={(e) => {
                    setUsername((e.target as HTMLInputElement).value);
                    setError("");
                  }}
                  disabled={loading}
                />
              </div>

              <div class="form-control mt-4">
                <label class="label" for="password">
                  <span class="label-text">Password</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Create a password"
                  class="input input-bordered w-full"
                  value={password}
                  onInput={(e) => {
                    setPassword((e.target as HTMLInputElement).value);
                    setError("");
                  }}
                  disabled={loading}
                />
              </div>

              <div class="form-control mt-4">
                <label class="label" for="confirmPassword">
                  <span class="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  class="input input-bordered w-full"
                  value={confirmPassword}
                  onInput={(e) => {
                    setConfirmPassword((e.target as HTMLInputElement).value);
                    setError("");
                  }}
                  disabled={loading}
                />
              </div>

              <div class="form-control mt-6">
                <button
                  type="submit"
                  class={`btn btn-primary ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>

              <div class="mt-4 text-center">
                <p>
                  Already have an account?{" "}
                  <a href="/login" class="link link-primary">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export { SignupPage };
