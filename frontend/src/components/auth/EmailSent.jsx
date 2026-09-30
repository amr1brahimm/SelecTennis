function EmailSent({ onSignIn }) {
  return (
    <div className="w-full text-center">
      {/* Success Icon */}
      <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-full bg-secondary-container">
        <span className="text-2xl font-bold text-primary">✓</span>
      </div>

      {/* Heading */}
      <div className="mb-8">
        <h1 className="font-headline-md text-[30px] font-bold tracking-[-0.025em] text-on-surface">
          Check your email
        </h1>

        <p className="mx-auto mt-2 max-w-[350px] font-body-md text-sm leading-6 text-on-surface-variant">
          Password reset instructions will be sent to your email address once
          email recovery is enabled.
        </p>
      </div>

      {/* Back */}
      <button
        type="button"
        onClick={onSignIn}
        className="w-full rounded-lg bg-secondary-container px-5 py-3.5 font-label-lg text-sm font-bold text-on-surface transition hover:brightness-95"
      >
        Back to Sign In
      </button>
    </div>
  );
}

export default EmailSent;