import { useState } from "preact/hooks";
import { Nav } from "./components/nav";
import { type AuthContextType, useAuth } from "./services/auth";
import { useLocation } from "preact-iso";

// LoginForm as a functional component
function LoginForm(
  { auth, onSuccess }: { auth: AuthContextType; onSuccess: () => void },
) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    // Clear error on input change
    setError("");

    // Update the appropriate state based on the input name
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await auth.login(username, password);
      // Navigate to home page after successful login
      onSuccess();
    } catch (error: unknown) {
      const errorMessage = error instanceof Error
        ? error.message
        : "Login failed. Please check your credentials.";
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold mb-6">Login</h2>

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
              name="username"
              placeholder="Enter your username"
              class="input input-bordered w-full"
              value={username}
              onInput={handleInputChange}
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
              name="password"
              placeholder="Enter your password"
              class="input input-bordered w-full"
              value={password}
              onInput={handleInputChange}
              disabled={loading}
            />
          </div>

          <div class="form-control mt-6">
            <button
              type="submit"
              class={`btn btn-primary ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <div class="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <a href="/signup" class="link link-primary">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

// Wrapper functional component to provide auth context and navigation
function Login({}: { path?: string }) {
  const auth = useAuth();
  const location = useLocation();

  const handleSuccess = () => {
    location.route("/", true);
  };

  return (
    <>
      <Nav />
      <div class="container mx-auto py-8 px-4 flex justify-center items-center">
        <LoginForm auth={auth} onSuccess={handleSuccess} />
      </div>
    </>
  );
}

export { Login };
