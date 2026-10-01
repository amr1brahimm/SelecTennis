import { useState } from "react";
import SignInForm from "../components/auth/SignInForm";
import CreateAccountForm from "../components/auth/CreateAccountForm";
function AuthPage({ onAuthenticated }) {
  const [authView, setAuthView] = useState("signIn");

return (
  <div className="min-h-screen bg-surface font-body-md text-on-surface">
    {/* Header */}
    <header className="flex min-h-[76px] items-center justify-between border-b border-outline-variant/40 bg-surface-container-lowest px-6 md:px-12">
      <button
        type="button"
        className="flex items-center gap-3 text-left"
      >
        <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-secondary-container">
            <span className="material-symbols-outlined">
            sports_tennis
            </span>
        </div>

        <span className="text-lg font-bold text-primary">
            SelecTennis
        </span>
        </div>
      </button>
      <div />
    </header>

    {/* Main */}
    <main className="flex min-h-[calc(100vh-150px)] items-center justify-center px-4 py-10 sm:px-6">
      <section
       className={`w-full ${
       authView === "createAccount"
      ? "max-w-[560px]"
      : "max-w-[460px]"
       } rounded-2xl border border-outline-variant/30 bg-surface-container-lowest px-6 py-8 shadow-xl shadow-primary/5 sm:px-10 sm:py-10`}
      >
        {authView === "signIn" && (
          <SignInForm
            onCreateAccount={() => setAuthView("createAccount")}
            onSuccess={onAuthenticated}
          />
        )}

     {authView === "createAccount" && (
  <CreateAccountForm
    onSignIn={() => setAuthView("signIn")}
    onSuccess={onAuthenticated}
  />
)}

      </section>
    </main>

    {/* Footer */}
    <footer className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-6 pb-7 font-body-md text-xs text-on-surface-variant">
      <button type="button" className="hover:text-primary">
        Privacy
      </button>

      <button type="button" className="hover:text-primary">
        Terms
      </button>

      <span>© 2026 SelecTennis</span>
    </footer>
  </div>
);
}

export default AuthPage;