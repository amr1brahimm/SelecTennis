function QuestionnaireIntroPage({ onStart, onBack }) {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      {/* Header */}
      <header className="w-full border-b border-outline-variant/30 bg-surface-container-lowest">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-12">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-secondary-container">
              <span className="material-symbols-outlined text-xl">
                sports_tennis
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-headline-sm text-xl font-semibold tracking-tight text-primary">
                SelecTennis
              </span>

              <span className="hidden text-[10px] font-bold uppercase tracking-wider text-on-surface-variant sm:block">
                Equipment &amp; Racket Lab
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-label-md text-sm font-semibold text-primary transition hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back to Services
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="relative overflow-hidden px-5 py-10 sm:py-14 lg:px-12">
        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-primary-container/10 blur-3xl" />

        <section className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl bg-surface-container-lowest shadow-xl shadow-primary/5">
          <div className="px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12">
            {/* Top Meta */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-primary px-3 py-1 font-label-md text-[10px] font-bold uppercase tracking-wider text-on-primary">
                Racket Recommendation
              </span>

              <span className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-base">
                  schedule
                </span>
                Average completion: 3–4 mins
              </span>
            </div>

            {/* Heading */}
            <div className="mt-7 max-w-3xl">
              <h1 className="font-headline-md text-3xl font-bold leading-tight tracking-[-0.03em] text-primary sm:text-4xl lg:text-[44px]">
                Personalized Racket Recommendation
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-on-surface-variant sm:text-base">
                Complete a short assessment about your playing background,
                physical profile, game style, and racket preferences. Your
                answers will be used to identify rackets that best match your
                profile.
              </p>
            </div>

            {/* Paid Service Banner */}
            <div className="mt-8 rounded-xl bg-primary p-5 text-on-primary sm:p-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                <div>
                  <span className="font-label-md text-[10px] font-bold uppercase tracking-[0.14em] text-secondary-container">
                    This is a paid service
                  </span>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-on-primary/80">
                    Complete the assessment first. Payment is requested only
                    after you finish and before your personalized
                    recommendations are shown.
                  </p>
                </div>

                <div className="shrink-0 sm:text-right">
                  <span className="font-headline-md text-3xl font-bold text-secondary-container">
                    $XX
                  </span>

                  <p className="mt-1 text-xs text-on-primary/70">
                    Recommendation service
                  </p>
                </div>
              </div>
            </div>

            {/* What You Receive */}
            <div className="mt-10">
              <span className="font-label-md text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">
                Your Assessment Includes
              </span>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Benefit
                  icon="filter_3"
                  title="Top 3 Racket Matches"
                  text="Three rackets selected from the SelecTennis database based on your completed profile."
                />

                <Benefit
                  icon="analytics"
                  title="Match Scores & Explanations"
                  text="See how each recommended racket compares with your technical and playing preferences."
                />

                <Benefit
                  icon="person_search"
                  title="Personalized Racket Profile"
                  text="Your assessment creates a racket profile based on your suitability, game, and preference answers."
                />

                <Benefit
                  icon="bookmark"
                  title="Saved Results"
                  text="Your completed recommendation results can be saved to your account for later reference."
                />
              </div>
            </div>
          </div>

          {/* Start Area */}
          <div className="border-t border-outline-variant/30 bg-surface-container-low/60 px-6 py-6 sm:px-10 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-start gap-3">
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface-container-highest text-primary">
                  <span className="material-symbols-outlined text-lg">
                    credit_card_off
                  </span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-primary">
                    No charge to start
                  </p>

                  <p className="mt-0.5 text-xs leading-5 text-on-surface-variant">
                    You can complete the questionnaire before deciding whether
                    to unlock your recommendations.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onStart}
                className="inline-flex min-h-[48px] shrink-0 items-center justify-center gap-2 rounded-xl bg-secondary-container px-7 font-label-lg text-sm font-bold text-on-surface shadow-md transition hover:brightness-95 hover:shadow-lg"
              >
                Start Questionnaire

                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-surface-container-low p-4">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-surface-container-highest text-primary">
        <span className="material-symbols-outlined text-xl">{icon}</span>
      </div>

      <div>
        <h2 className="font-title-md text-sm font-semibold text-primary">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-on-surface-variant">
          {text}
        </p>
      </div>
    </div>
  );
}

export default QuestionnaireIntroPage;