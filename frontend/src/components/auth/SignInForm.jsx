import { useState } from "react";

function SignInForm({ onCreateAccount, onSuccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      localStorage.setItem("token", data.token);

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

     onSuccess?.(data.user, "login");
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

return (
  <div className="w-full">
    <div className="mb-8 text-center">
      <h1 className="font-headline-md text-[32px] font-bold tracking-[-0.02em] text-on-surface">
        Welcome back
      </h1>

      <p className="mt-2 font-body-md text-sm text-on-surface-variant">
        Sign in to continue to SelecTennis
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block font-label-md text-sm font-semibold text-on-surface"
        >
          Email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      <div>
        <div className="mb-2">
          <label htmlFor="password" className="font-label-md text-sm font-semibold text-on-surface">Password</label>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/10"
        />
      </div>

      {error && (
        <div
          role="alert"
          className="rounded-lg bg-error-container px-4 py-3 font-body-md text-sm text-error"
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-lg bg-secondary-container px-5 py-3.5 font-label-lg text-sm font-bold text-on-surface transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>

    <div className="mt-7 flex items-center justify-center gap-1.5 font-body-md text-sm text-on-surface-variant">
      <span>Don't have an account?</span>

      <button
        type="button"
        onClick={onCreateAccount}
        className="font-label-md font-bold text-primary hover:underline"
      >
        Create an account
      </button>
    </div>
  </div>
);
}

export default SignInForm;