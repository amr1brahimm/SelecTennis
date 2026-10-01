import { useEffect, useState } from "react";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ExplorePage from "./pages/ExplorePage";
import RacketDetailPage from "./pages/RacketDetailPage";
import QuestionnaireIntroPage from "./pages/QuestionnaireIntroPage";
import QuestionnairePage from "./pages/QuestionnairePage";
import ResultsPage from "./pages/ResultsPage";
import BookingPage from "./pages/BookingPage";
import LearnPage from "./pages/LearnPage";
import ArticlePage from "./pages/ArticlePage";
import AccountPage from "./pages/AccountPage";

function App() {
  const [page, setPage] = useState(() => localStorage.getItem("token") ? "home" : "auth");
  const [results, setResults] = useState(null);
  const [selectedRacketId, setSelectedRacketId] = useState(null);
  const [detailDemoMode, setDetailDemoMode] = useState(false);
  const [demoSelection, setDemoSelection] = useState([]);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const [bookingType, setBookingType] = useState("demo");
  const [toast, setToast] = useState(null);
  useEffect(() => {
  if (!toast) return;

  const timer = setTimeout(() => {
    setToast(null);
  }, 3500);

  return () => clearTimeout(timer);
}, [toast]);
const handleAuthenticated = (user, type = "login") => {
  const firstName = user?.first_name || "";

  setToast({
    title:
      type === "registered"
        ? "Welcome to SelecTennis!"
        : `Welcome back${firstName ? `, ${firstName}` : ""}!`,
    message:
      type === "registered"
        ? "Your account was created successfully."
        : "You’re signed in and ready to play.",
  });

  setPage("home");
};

  const navigate = (target) => {
    setPage(target);
  };
  const startBooking = (type = "demo") => {
  setBookingType(type);
  setPage("booking");
};

  
  const viewRacket = (racketId, demoMode=false) => { setSelectedRacketId(racketId); setDetailDemoMode(demoMode); setPage("racket-detail"); };
  const toggleDemo = (racket) => setDemoSelection(current => {
    const exists=current.some(r=>Number(r.racket_id)===Number(racket.racket_id));
    if(exists) return current.filter(r=>Number(r.racket_id)!==Number(racket.racket_id));
    if(current.length>=3) return current;
    return [...current,racket];
  });

if (page === "auth")
  return <AuthPage onAuthenticated={handleAuthenticated} />;
 if (page === "home")
  return (
    <PageWithToast
      toast={toast}
      onClose={() => setToast(null)}
    >
      <HomePage
        onRecommendation={() => setPage("intro")}
        onNavigate={navigate}
        onStartBooking={startBooking}
        onOpenRacket={(racketId) => {
          setSelectedRacketId(racketId);
          setDetailDemoMode(false);
          setPage("racket-detail");
        }}
        onOpenArticle={(articleId) => {
          setSelectedArticleId(articleId);
          setPage("article");
          window.scrollTo(0, 0);
        }}
      />
    </PageWithToast>
  );
  if (page === "services") return <ServicesPage onRecommendation={() => setPage("intro")} onNavigate={navigate} onStartBooking={startBooking} />;
  if (page === "explore") return <ExplorePage onNavigate={navigate} onViewRacket={viewRacket} demoSelection={demoSelection} onToggleDemo={toggleDemo} />;
 if (page === "explore-demo")
  return (
    <ExplorePage
      demoMode
      onNavigate={navigate}
      onViewRacket={viewRacket}
      demoSelection={demoSelection}
      onToggleDemo={toggleDemo}
      onReturnToBooking={() => setPage("booking")}
    />
  );
  if (page === "booking")
  return (
    <BookingPage
      onNavigate={navigate}
      demoSelection={demoSelection}
      onRemoveRacket={toggleDemo}
      onChooseRackets={() => setPage("explore-demo")}
      onContinue={() => {}}
      bookingType={bookingType}

    />
  );

  if (page === "racket-detail") return <RacketDetailPage racketId={selectedRacketId} onNavigate={navigate} demoMode={detailDemoMode} demoSelection={demoSelection} onToggleDemo={toggleDemo} onBack={() => setPage(detailDemoMode ? "explore-demo" : "explore")} onBookDemo={(racket)=>{toggleDemo(racket);setPage("explore-demo");}} />;
  if (page === "questionnaire") return <QuestionnairePage onExit={() => setPage("home")} onContinue={(data) => { setResults(data); setPage("results"); }} />;
  if (page === "learn")
  return (
    <LearnPage
      onNavigate={navigate}
      onOpenArticle={(articleId) => {
        setSelectedArticleId(articleId);
        setPage("article");
      }}
    />
  );
  if (page === "article")
  return (
    <ArticlePage
      articleId={selectedArticleId}
      onNavigate={navigate}
      onBack={() => setPage("learn")}
      onOpenArticle={(articleId) => {
        setSelectedArticleId(articleId);
        window.scrollTo(0, 0);
      }}
    />
  );
if (page === "account")
  return (
    <AccountPage
      onNavigate={navigate}
      onRecommendation={() => setPage("intro")}
      onLogout={() => setPage("auth")}
    />
  );

  if (page === "results") return <ResultsPage apiResults={results} />;
  return <QuestionnaireIntroPage onStart={() => setPage("questionnaire")} onBack={() => setPage("home")} />;
}
function PageWithToast({ children, toast, onClose }) {
  return (
    <>
      {children}

      {toast && (
        <div className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-sm animate-[fadeIn_0.25s_ease-out] sm:right-6 sm:top-6">
          <div className="flex items-start gap-4 rounded-2xl border border-primary/10 bg-white p-5 shadow-2xl">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-secondary-container text-primary">
              <span className="material-symbols-outlined">
                check_circle
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="font-bold text-primary">
                {toast.title}
              </div>

              <p className="mt-1 text-sm leading-5 text-on-surface-variant">
                {toast.message}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-on-surface-variant transition hover:bg-surface-container hover:text-primary"
              aria-label="Close notification"
            >
              <span className="material-symbols-outlined text-lg">
                close
              </span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default App;
