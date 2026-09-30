function ForgotPasswordForm({ onSignIn, onEmailSent }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    // UI only for now.
    // Real password-reset email functionality will be connected later.
    onEmailSent();
  };

  return (
    <div className="w-full">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-headline-md text-[30px] font-bold tracking-[-0.025em] text-on-surface">
          Forgot your password?
        </h1>

        <p className="mt-2 max-w-[360px] font-body-md text-sm leading-6 text-on-surface-variant">
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label
            htmlFor="resetEmail"
            className="mb-2 block font-label-md text-xs font-bold uppercase tracking-[0.03em] text-on-surface"
          >
            Email Address
          </label>

          <input
            id="resetEmail"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            required
            className="w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-4 py-3 font-body-md text-sm text-on-surface outline-none transition placeholder:text-on-surface-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/10"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-secondary-container px-5 py-3.5 font-label-lg text-sm font-bold text-on-surface transition hover:brightness-95"
        >
          Send Reset Link
        </button>
      </form>

      {/* Back */}
      <div className="mt-8 border-t border-outline-variant/40 pt-7 text-center">
        <button
          type="button"
          onClick={onSignIn}
          className="font-label-md text-sm font-bold text-primary underline-offset-4 hover:underline"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;