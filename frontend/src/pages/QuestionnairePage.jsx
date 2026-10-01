import { useEffect, useState } from "react";
import { apiUrl } from "../config/api.js";

import questions from "../questionnaire/questions";

import SingleChoiceQuestion from "../questionnaire/components/SingleChoiceQuestion";
import MultiSelectQuestion from "../questionnaire/components/MultiSelectQuestion";
import NumericQuestion from "../questionnaire/components/NumericQuestion";
import RacketSelectorQuestion from "../questionnaire/components/RacketSelectorQuestion";
import StringSetupQuestion from "../questionnaire/components/StringSetupQuestion";
import PrimarySecondaryQuestion from "../questionnaire/components/PrimarySecondaryQuestion";
import PreferenceScaleQuestion from "../questionnaire/components/PreferenceScaleQuestion";
import IssueClassificationQuestion from "../questionnaire/components/IssueClassificationQuestion";
import {
  startQuestionnaire, getActiveQuestionnaire, saveQuestionAnswer,
  completeQuestionnaire, generateRecommendations, hydrateAnswers, dbQuestionId,
} from "../questionnaire/api";

function QuestionnairePage({ onExit, onContinue }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [rackets, setRackets] = useState([]);
  const [attemptId, setAttemptId] = useState(null);
  const [status, setStatus] = useState("Loading your questionnaire…");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [racketResponse, active] = await Promise.all([
          fetch(apiUrl("/rackets")),
          getActiveQuestionnaire(),
        ]);
        if (!racketResponse.ok) throw new Error("Failed to load rackets.");
        const racketData = await racketResponse.json();
        if (cancelled) return;
        setRackets(racketData);

        let payload = active;
        if (!active.attempt) {
          await startQuestionnaire();
          payload = await getActiveQuestionnaire();
        }
        if (!payload.attempt) throw new Error("Could not start questionnaire.");
        setAttemptId(Number(payload.attempt.attempt_id));
        const restored = hydrateAnswers(payload);
        setAnswers(restored);

        const currentDbId = Number(payload.attempt.current_question_id);
        if (currentDbId) {
          const index = questions.findIndex((q) => dbQuestionId(q) === currentDbId);
          if (index >= 0) setCurrentQuestionIndex(index);
        }
        setStatus("Draft autosaved");
      } catch (e) {
        setError(e.message);
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const question = questions[currentQuestionIndex];
  const currentAnswer = question.id === "issue_classification" && ["injury", "discomfort"].includes(answers.issue_type)
    ? Object.fromEntries((answers[8]?.selected || []).map((area) => [area, answers.issue_type]))
    : answers[question.id];
  const progress = Math.round(((currentQuestionIndex + 1) / questions.length) * 100);
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (answer) => {
    setAnswers((current) => ({ ...current, [question.id]: answer }));
    setStatus("Unsaved changes");
    setError("");
  };

  const saveCurrent = async () => {
    if (!attemptId) throw new Error("Questionnaire attempt is not ready.");
    await saveQuestionAnswer(attemptId, question, currentAnswer);
    setStatus("Draft autosaved");
  };

  const handleBack = () => {
    if (isFirstQuestion) return;
    if (question.id === "current_racket" && answers.issue_type === "none") setCurrentQuestionIndex((i) => i - 3);
    else setCurrentQuestionIndex((i) => i - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContinue = async () => {
    if (!canContinue(question, currentAnswer) || busy) return;
    setBusy(true); setError("");
    try {
      await saveCurrent();
      if (isLastQuestion) {
        await completeQuestionnaire(attemptId);
        const result = await generateRecommendations(attemptId);
        onContinue?.(result);
        return;
      }
      if (question.id === "issue_type" && currentAnswer === "none") setCurrentQuestionIndex((i) => i + 3);
      else setCurrentQuestionIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) { setError(e.message); }
    finally { setBusy(false); }
  };

  const handleSkip = async () => {
    if (!question.optional || busy) return;
    setAnswers((current) => { const next = { ...current }; delete next[question.id]; return next; });
    setCurrentQuestionIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExit = async () => {
    try {
      if (canContinue(question, currentAnswer)) await saveCurrent();
    } catch (e) { console.error(e); }
    onExit?.(answers);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Enter") return;
      const el = document.activeElement;
      if (["TEXTAREA", "INPUT", "SELECT", "BUTTON"].includes(el?.tagName)) return;
      if (canContinue(question, currentAnswer)) handleContinue();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [question, currentAnswer, attemptId, busy]);

  if (busy && !attemptId) return <div className="min-h-screen grid place-items-center bg-surface text-primary font-semibold">{status}</div>;
  if (error && !attemptId) return <div className="min-h-screen grid place-items-center bg-surface p-6"><div className="max-w-lg rounded-xl bg-white p-6 shadow"><h1 className="font-bold text-primary">Couldn’t load questionnaire</h1><p className="mt-2 text-sm text-on-surface-variant">{error}</p></div></div>;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface">
      {/* SITE HEADER */}
      <header className="sticky top-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(15,56,42,0.05)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 lg:px-12">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-secondary-container shadow-sm">
              <span className="material-symbols-outlined">
                sports_tennis
              </span>
            </div>

            <div className="flex flex-col">
              <span className="font-headline-sm text-xl font-semibold tracking-tight text-primary">
                SelecTennis
              </span>

              <span className="hidden font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-surface-variant sm:inline-block">
                Equipment &amp; Racket Lab
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-1 rounded-xl bg-surface-container-low/70 p-1 lg:flex">
            {[
              "Home",
              "Services",
              "Racket Database",
              "Learn",
              "My Bookings",
            ].map((item) => (
              <button
                key={item}
                type="button"
                className="px-4 py-2 font-label-lg text-sm font-semibold text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {item}
              </button>
            ))}
          </nav>

          <button
            type="button"
            className="flex items-center gap-2 rounded-full bg-surface-container-lowest px-2 py-1 shadow-sm transition hover:bg-surface-container-high"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-secondary-container">
              A
            </div>

            <div className="hidden flex-col pr-2 text-left md:flex">
              <span className="font-label-md text-xs font-semibold text-on-surface">
                Account
              </span>

              <span className="font-label-sm text-[10px] font-bold uppercase text-secondary">
                Member
              </span>
            </div>
          </button>
        </div>
      </header>

      <main className="relative w-full overflow-hidden pb-10">
        {/* Decorative Stitch background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-secondary-container/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-1/2 h-80 w-80 rounded-full bg-primary-container/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-5 pt-4 lg:px-12">
          {/* MASTER QUESTIONNAIRE CARD */}
          <section className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-xl">
            {/* STATUS BAR */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-surface-container-low px-4 py-4 lg:px-10">
              <div className="flex items-center gap-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-highest px-2 py-1 font-label-sm text-[10px] font-bold uppercase tracking-wider text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-secondary-container" />
                  {question.section}
                </span>

                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-primary">
                    cloud_done
                  </span>

                  <span className="text-xs">
                    {status}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-right">
                  <span className="font-label-md text-xs font-semibold text-primary">
                    Question {currentQuestionIndex + 1}{" "}
                    <span className="font-normal text-on-surface-variant">
                      of {questions.length}
                    </span>
                  </span>

                  <span className="h-1 w-1 rounded-full bg-outline-variant" />

                  <span className="font-label-md text-xs font-semibold text-secondary">
                    {progress}% Completed
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleExit}
                  className="inline-flex items-center gap-1 rounded-lg bg-surface-container px-2 py-1 font-label-md text-xs font-semibold text-on-surface-variant transition hover:bg-surface-container-high hover:text-primary"
                >
                  <span className="material-symbols-outlined text-sm">
                    bookmark
                  </span>
                  Exit &amp; Save
                </button>
              </div>
            </div>

            {/* PROGRESS */}
            <div className="relative h-1.5 w-full overflow-hidden bg-surface-container-high">
              <div
                className="h-full bg-secondary-container shadow-[0_0_12px_rgba(207,241,67,0.8)] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* QUESTION BODY */}
            <div className="p-4 lg:p-10">
              <div className="max-w-3xl">
                <h1 className="mb-1 font-headline-lg text-[28px] font-semibold tracking-tight text-primary sm:text-4xl">
                  {question.title}
                </h1>

                <p className="font-body-lg text-base leading-relaxed text-on-surface-variant">
                  {question.description}
                </p>
              </div>

              {/* DYNAMIC ANSWER INTERFACE */}
              <QuestionRenderer
                question={question}
                value={currentAnswer}
                onChange={handleAnswerChange}
                rackets={rackets}
                answers={answers}
              />

              {error && <div className="mt-6 rounded-xl bg-error-container px-4 py-3 text-sm text-error">{error}</div>}

              {/* NAVIGATION */}
              <div className="mt-10 flex flex-col-reverse items-center justify-between gap-4 bg-surface-container-lowest pt-6 sm:flex-row">
                <button
                  type="button"
                  disabled={isFirstQuestion}
                  onClick={handleBack}
                  className={`inline-flex w-full items-center justify-center gap-1 rounded-xl px-6 py-3 font-label-lg text-sm font-semibold transition sm:w-auto ${
                    isFirstQuestion
                      ? "cursor-not-allowed bg-surface-container text-outline opacity-60"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    arrow_back
                  </span>
                  Back
                </button>

                <div className="flex w-full flex-wrap items-center justify-end gap-3 sm:w-auto">
                  {question.optional && (
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-label-lg text-sm font-semibold text-on-surface-variant transition hover:bg-surface-container-low hover:text-primary"
                    >
                      Skip this question
                    </button>
                  )}

                  <div className="hidden items-center gap-1.5 text-on-surface-variant md:flex">
                    <kbd className="rounded bg-surface-container-high px-2 py-1 text-xs shadow-inner">
                      Enter ↵
                    </kbd>

                    <span className="text-xs">
                      to continue
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled={!canContinue(question, currentAnswer) || busy}
                    onClick={handleContinue}
                    className="inline-flex w-full items-center justify-center gap-1 rounded-xl bg-secondary-container px-10 py-3 font-label-lg text-sm font-semibold text-on-secondary-fixed shadow-md transition-all hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                  >
                    {isLastQuestion
                      ? "Complete Questionnaire"
                      : "Continue"}

                    <span className="material-symbols-outlined text-sm">
                      {isLastQuestion
                        ? "check"
                        : "arrow_forward"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* REASSURANCE CARDS */}
          <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              icon="tune"
              title="Personalized Matching"
              text="Recommendations are calibrated around your playing profile, preferences, and physical considerations."
            />

            <InfoCard
              icon="history_toggle_off"
              title="Resume Anytime"
              text="Your questionnaire progress can be saved to your profile so you can continue later."
            />

            <InfoCard
              icon="lock"
              title="Private Assessment"
              text="Your questionnaire information remains associated with your account and recommendation profile."
            />
          </section>
        </div>
      </main>

      {/* SITE FOOTER */}
      <footer className="mt-10 w-full bg-surface-container-low py-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-12">
          <div className="flex flex-col items-start justify-between gap-6 pb-6 md:flex-row">
            <div className="max-w-sm space-y-1">
              <span className="font-headline-sm text-xl font-semibold text-primary">
                SelecTennis
              </span>

              <p className="text-sm text-on-surface-variant">
                SelecTennis — Tennis Equipment &amp; Racket
                Recommendations
              </p>
            </div>

            <div className="flex flex-wrap gap-x-10 gap-y-2">
              {[
                "Equipment Guides",
                "String Calibration",
                "Grass & Clay Courts",
                "Privacy Charter",
              ].map((item) => (
                <button
                  key={item}
                  type="button"
                  className="font-label-lg text-sm font-semibold text-on-surface-variant transition hover:text-on-surface"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 text-xs text-on-surface-variant">
            © 2026 SelecTennis. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

function QuestionRenderer({
  question,
  value,
  onChange,
  rackets,
  answers,
}) {
  switch (question.type) {
    case "singleChoice":
      return (
        <SingleChoiceQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "multiSelect":
      return (
        <MultiSelectQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "numeric":
      return (
        <NumericQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "racketSelector":
      return (
        <RacketSelectorQuestion
          question={question}
          value={value}
          onChange={onChange}
          rackets={rackets}
        />
      );

    case "stringSetup":
      return (
        <StringSetupQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "primarySecondary":
      return (
        <PrimarySecondaryQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );

    case "preferenceScale":
      return (
        <PreferenceScaleQuestion
          question={question}
          value={value}
          onChange={onChange}
        />
      );
  case "issueClassification":
  return (
    <IssueClassificationQuestion
      question={question}
      value={value}
      onChange={onChange}
      issueType={answers.issue_type}
      affectedAreas={answers[8]?.selected || []}
    />
  );

    default:
      return null;
  }
}

function canContinue(question, answer) {
  if (question.optional) {
    return true;
  }

  switch (question.type) {
    case "singleChoice":
    case "racketSelector":
      return Boolean(answer);

    case "numeric": {
      if (
        answer === undefined ||
        answer === null ||
        answer === ""
      ) {
        return false;
      }

      const numericValue = Number(answer);

      return (
        !Number.isNaN(numericValue) &&
        numericValue >= question.min &&
        numericValue <= question.max
      );
    }

    case "multiSelect":
      return Boolean(
        answer?.selected &&
          answer.selected.length > 0
      );

    case "stringSetup":
      return Boolean(
        answer?.mains ||
          answer?.crosses ||
          answer?.tension
      );

    case "primarySecondary":
      return Boolean(answer?.primary);

    case "preferenceScale":
      return Boolean(answer);

    case "issueClassification":
      return Boolean(answer && Object.keys(answer).length > 0);

    default:
      return false;
  }
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-start gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
        <span className="material-symbols-outlined text-base">
          {icon}
        </span>
      </div>

      <div>
        <h3 className="font-title-md text-base font-semibold text-primary">
          {title}
        </h3>

        <p className="mt-0.5 text-xs leading-[18px] text-on-surface-variant">
          {text}
        </p>
      </div>
    </div>
  );
}

export default QuestionnairePage;