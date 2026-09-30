import { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export default function BookingPage({
  onNavigate,
  demoSelection = [],
  onRemoveRacket,
  onChooseRackets,
  onContinue,
  bookingType = "demo",
}) {const [step, setStep] = useState(
  bookingType === "demo" ? 1 : 2
);
  const [hittingPartner, setHittingPartner] = useState(
  bookingType === "hitting-partner"
);

const [consultationType, setConsultationType] = useState(
  bookingType === "consultation" ? "online" : "none"
);
  const [demoDate, setDemoDate] = useState("");
  const [demoTime, setDemoTime] = useState("");
  const [surfacePreference, setSurfacePreference] = useState("");

  
  const canContinueServices =
  demoSelection.length > 0 ||
  hittingPartner ||
  consultationType !== "none";

  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md">
      <SiteHeader onNavigate={onNavigate} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        
  <></>
  
        {/* Page heading */}
<div className={step === 4 ? "hidden" : ""}>
          <h1 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Book a Racket Demo
          </h1>

          <p className="mt-2 max-w-2xl text-on-surface-variant">
            Choose the rackets you want to test, add any optional services,
            and select your demo session.
          </p>
        </div>

        {/* Paid service notice */}
<div
  className={`mt-5 rounded-2xl bg-white p-5 shadow-sm ${
    step === 4 ? "hidden" : ""
  }`}
>
          <span className="w-fit rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Paid Service
          </span>

          <p className="text-sm text-on-surface">
            Racket demos and optional services are paid. Online payment is not
            yet available in this version of SelecTennis.
          </p>
        </div>

        {/* Progress */}
       
        <div
        className={`mt-5 rounded-2xl bg-white p-5 shadow-sm ${
            step === 4 ? "hidden" : ""
        }`}
        >
        <div className="grid grid-cols-3 gap-3">

            
            <ProgressStep
                number="1"
                title="Choose Rackets"
                subtitle="Max 3 rackets"
                active={step === 1}
                />

                <ProgressStep
                number="2"
                title="Optional Services"
                subtitle="Customize"
                active={step === 2}
                />

                <ProgressStep
                number="3"
                title="Details & Review"
                subtitle="Schedule"
                active={step >= 3}
                />
          </div>
        </div>
        

        {/* Step 1 */}
        {step === 1 && (
        <section className="mt-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Choose Your Rackets
              </h2>

              <p className="mt-1 text-sm text-on-surface-variant">
                Select up to 3 rackets to test during your demo session.
              </p>
            </div>

            <div className="w-fit rounded-full bg-primary px-4 py-2 text-sm font-bold text-white">
              {demoSelection.length} / 3 selected
            </div>
          </div>

          {demoSelection.length === 0 ? (
            <div className="mt-6 rounded-3xl bg-white p-10 text-center shadow-sm">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-surface-container text-primary">
                <span className="material-symbols-outlined">
                  sports_tennis
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold text-primary">
                No rackets selected yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-on-surface-variant">
                Choose up to 3 rackets from Explore to build your demo session.
              </p>

              <button
                type="button"
                onClick={onChooseRackets}
                className="mt-6 rounded-full bg-secondary-container px-6 py-3 font-bold text-primary shadow-sm"
              >
                Explore Rackets →
              </button>
            </div>
          ) : (
            <>
              <div className="mt-6 grid gap-4 lg:grid-cols-3">
                {demoSelection.map((racket) => (
                  <RacketCard
                    key={racket.racket_id}
                    racket={racket}
                    onRemove={() => onRemoveRacket?.(racket)}
                  />
                ))}

                {demoSelection.length < 3 && (
                  <button
                    type="button"
                    onClick={onChooseRackets}
                    className="flex min-h-[270px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-low/40 p-8 text-center transition hover:bg-surface-container-low"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-full bg-white text-primary shadow-sm">
                      <span className="material-symbols-outlined">add</span>
                    </div>

                    <span className="mt-4 font-bold text-primary">
                      Add Another Racket
                    </span>

                    <span className="mt-1 text-sm text-on-surface-variant">
                      Explore rackets
                    </span>
                  </button>
                )}
              </div>

              <p className="mt-5 text-sm text-on-surface-variant">
                You can test up to 3 rackets during one demo session.
              </p>
            </>
          )}

          {/* Bottom actions */}
          <div className="mt-10 flex flex-col justify-between gap-3 border-t border-outline-variant pt-6 sm:flex-row">
            <button
              type="button"
              onClick={onChooseRackets}
              className="rounded-full bg-white px-6 py-3 font-bold text-primary shadow-sm transition hover:bg-surface-container"
            >
              Add or Change Rackets →
            </button>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-full bg-secondary-container px-7 py-3 font-bold text-primary shadow-md transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Continue to Optional Services →
            </button>
          </div>
        </section>)}
        {/* Step 2 */}
{step === 2 && (
  <section className="mt-10">
    <div>
      <h2 className="text-2xl font-bold text-primary">
        {bookingType === "demo"
            ? "Optional Services"
            : bookingType === "hitting-partner"
            ? "Hitting Partner"
            : "Professional Consultation"}
        </h2>

        <p className="mt-1 text-sm text-on-surface-variant">
        {bookingType === "demo"
            ? "Customize your demo session with optional paid services."
            : bookingType === "hitting-partner"
            ? "Customize your hitting partner session before choosing your schedule."
            : "Choose your consultation type before selecting your schedule."}
        </p>
    </div>

 <div className="mt-6 grid gap-6 lg:grid-cols-2">
      {/* Hitting Partner */}
   <div className="flex flex-col justify-between rounded-3xl bg-white p-7 shadow-sm">
        <div>
          <div className="flex items-start justify-between gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-container-low text-primary">
              <span className="material-symbols-outlined text-3xl">
                group
              </span>
            </div>

            <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
              Paid Add-On
            </span>
          </div>

          <h3 className="mt-6 text-xl font-bold text-primary">
            Hitting Partner
          </h3>

          <p className="mt-3 leading-7 text-on-surface-variant">
            Add a hitting partner to your demo session so you have someone
            to play with while testing your selected rackets.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setHittingPartner((current) => !current)}
          className={`mt-8 w-full rounded-full px-6 py-4 font-bold transition ${
            hittingPartner
              ? "bg-primary text-white"
              : "bg-surface-container text-primary hover:bg-surface-container-high"
          }`}
        >
          {hittingPartner
            ? "✓ Hitting Partner Added"
            : "+ Add Hitting Partner"}
        </button>

        {hittingPartner && (
          <button
            type="button"
            onClick={() => setHittingPartner(false)}
            className="mt-3 text-sm font-semibold text-on-surface-variant hover:text-primary"
          >
            Remove
          </button>
        )}
      </div>

      {/* Professional Consultation */}
      <div className="rounded-3xl bg-white p-7 shadow-sm">
  
        <div className="flex items-start justify-between gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-surface-container-low text-primary">
            <span className="material-symbols-outlined text-3xl">
              support_agent
            </span>
          </div>

          <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Paid Add-On
          </span>
        </div>

        <h3 className="mt-6 text-xl font-bold text-primary">
          Professional Consultation
        </h3>

        <p className="mt-3 leading-7 text-on-surface-variant">
          Get one-on-one guidance to compare your selected rackets and
          understand your equipment options.
        </p>

        <div className="mt-7 space-y-3">
          <ConsultationOption
            selected={consultationType === "none"}
            title="No Consultation"
            description="Continue without professional consultation."
            onClick={() => setConsultationType("none")}
          />

          <ConsultationOption
            selected={consultationType === "online"}
            title="Online Consultation"
            description="Remote one-on-one guidance."
            onClick={() => setConsultationType("online")}
          />

          <ConsultationOption
            selected={consultationType === "on-court"}
            title="On-Court Consultation"
            description="Guidance during your demo session."
            onClick={() => setConsultationType("on-court")}
          />
        </div>
      </div>
    </div>

    <div className="mt-10 flex flex-col justify-between gap-3 border-t border-outline-variant pt-6 sm:flex-row">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="rounded-full bg-white px-6 py-3 font-bold text-primary shadow-sm"
      >
        ← Back
      </button>

      <button
  type="button"
  disabled={!canContinueServices}
  onClick={() => setStep(3)}
  className="rounded-full bg-secondary-container px-7 py-3 font-bold text-primary shadow-md transition disabled:cursor-not-allowed disabled:opacity-40"
>
  Continue to Details →
</button>
    </div>
  </section>
)}
{/* Step 3 */}
{step === 3 && (
  <section className="mt-10">
    <div>
      <h2 className="text-2xl font-bold text-primary">
        Demo Details & Review
      </h2>

      <p className="mt-1 text-sm text-on-surface-variant">
        Choose your preferred demo date, time, and court surface, then review
        your booking.
      </p>
    </div>

    <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
      {/* LEFT — Demo Details */}
      <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
        <h3 className="text-xl font-bold text-primary">
          Demo Details
        </h3>

        {/* Date */}
        <div className="mt-7">
          <label
            htmlFor="demo-date"
            className="text-sm font-bold text-primary"
          >
            Select a Date
          </label>

          <input
            id="demo-date"
            type="date"
            value={demoDate}
            onChange={(e) => {
              setDemoDate(e.target.value);
              setDemoTime("");
            }}
            className="mt-3 w-full rounded-2xl border border-outline-variant bg-surface px-4 py-3 text-primary outline-none transition focus:border-primary"
          />
        </div>

        {/* Time */}
        <div className="mt-8">
          <div className="text-sm font-bold text-primary">
            Select a Time
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"].map(
              (time) => (
                <button
                  key={time}
                  type="button"
                  disabled={!demoDate}
                  onClick={() => setDemoTime(time)}
                  className={`rounded-2xl border px-4 py-3 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40 ${
                    demoTime === time
                      ? "border-primary bg-primary text-white shadow-md"
                      : "border-surface-container bg-surface text-primary hover:border-primary"
                  }`}
                >
                  {time}
                </button>
              )
            )}
          </div>

          {!demoDate && (
            <p className="mt-2 text-xs text-on-surface-variant">
              Choose a date first to select a preferred time.
            </p>
          )}
        </div>

        {/* Surface */}
        <div className="mt-8">
          <div className="text-sm font-bold text-primary">
            Surface Preference
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {["Hard Court", "Clay Court", "Grass Court"].map((surface) => (
              <button
                key={surface}
                type="button"
                onClick={() => setSurfacePreference(surface)}
                className={`rounded-2xl border px-4 py-4 text-sm font-bold transition ${
                  surfacePreference === surface
                    ? "border-primary bg-primary text-white shadow-md"
                    : "border-surface-container bg-surface text-primary hover:border-primary"
                }`}
              >
                {surface}
              </button>
            ))}
          </div>

          <p className="mt-3 text-xs leading-5 text-on-surface-variant">
            Surface selection is a preference and is subject to availability.
          </p>
        </div>
      </div>

      {/* RIGHT — Booking Summary */}
      <aside className="h-fit rounded-3xl bg-primary p-6 text-white shadow-xl sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-xl font-bold">
            Booking Summary
          </h3>

          <span className="material-symbols-outlined text-secondary-container">
            receipt_long
          </span>
        </div>

        {/* Rackets */}
        <div className="mt-6 border-t border-white/15 pt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-secondary-container">
              Selected Rackets
            </div>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-bold text-white/70 hover:text-white"
            >
              Edit
            </button>
          </div>

          <div className="mt-3 space-y-2">
            {demoSelection.map((racket) => (
              <div
                key={racket.racket_id}
                className="text-sm font-semibold"
              >
                {racket.brand_name || racket.brand} {racket.name}
              </div>
            ))}
          </div>
        </div>

        {/* Optional services */}
        <div className="mt-5 border-t border-white/15 pt-5">
          <div className="flex items-center justify-between gap-4">
            <div className="text-xs font-bold uppercase tracking-wider text-secondary-container">
              Optional Services
            </div>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-white/70 hover:text-white"
            >
              Edit
            </button>
          </div>

          <SummaryRow
            label="Hitting Partner"
            value={hittingPartner ? "Added" : "Not Added"}
          />

          <SummaryRow
            label="Professional Consultation"
            value={
              consultationType === "online"
                ? "Online"
                : consultationType === "on-court"
                ? "On-Court"
                : "None"
            }
          />
        </div>

        {/* Schedule */}
        <div className="mt-5 border-t border-white/15 pt-5">
          <div className="text-xs font-bold uppercase tracking-wider text-secondary-container">
            Demo Session
          </div>

          <SummaryRow
            label="Date"
            value={demoDate ? formatBookingDate(demoDate) : "Not selected"}
          />

          <SummaryRow
            label="Time"
            value={demoTime || "Not selected"}
          />

          <SummaryRow
            label="Surface Preference"
            value={surfacePreference || "Not selected"}
          />
        </div>

        {/* Payment */}
        <div className="mt-6 rounded-2xl bg-white/10 p-4">
          <div className="text-xs font-bold uppercase tracking-wider text-secondary-container">
            Payment
          </div>

          <p className="mt-2 text-sm leading-6 text-white/75">
            Online payment is not yet available in this version of
            SelecTennis.
          </p>
        </div>

        <button
          type="button"
          disabled={!demoDate || !demoTime || !surfacePreference}
          onClick={() => setStep(4)}
          className="mt-6 w-full rounded-full bg-secondary-container px-6 py-4 font-bold text-primary shadow-lg transition disabled:cursor-not-allowed disabled:opacity-40"
        >
          Confirm Booking
        </button>
      </aside>
    </div>

    <div className="mt-8 border-t border-outline-variant pt-6">
      <button
        type="button"
        onClick={() => setStep(2)}
        className="rounded-full bg-white px-6 py-3 font-bold text-primary shadow-sm"
      >
        ← Back
      </button>
    </div>
  </section>
)}
{/* Booking Confirmation */}
{step === 4 && (
  <section className="mx-auto mt-12 max-w-4xl">
    {/* Success heading */}
    <div className="text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-secondary-container text-primary shadow-sm">
        <span className="material-symbols-outlined text-4xl">
          check_circle
        </span>
      </div>

      <h2 className="mt-6 text-3xl font-bold text-primary md:text-4xl">
        Booking Confirmed
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-on-surface-variant">
        Your racket demo has been added to your bookings.
      </p>
    </div>

    {/* Confirmation summary */}
    <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="border-b border-outline-variant p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">
            event_available
          </span>

          <h3 className="text-xl font-bold text-primary">
            Demo Summary
          </h3>
        </div>
      </div>

      <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-2">
        {/* Rackets */}
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-outline">
            Selected Rackets
          </div>

          <div className="mt-3 space-y-2">
            {demoSelection.map((racket) => (
              <div
                key={racket.racket_id}
                className="font-semibold text-primary"
              >
                {racket.brand_name || racket.brand} {racket.name}
              </div>
            ))}
          </div>
        </div>

        {/* Date */}
        <ConfirmationItem
          icon="calendar_today"
          label="Date"
          value={formatBookingDate(demoDate)}
        />

        {/* Time */}
        <ConfirmationItem
          icon="schedule"
          label="Time"
          value={demoTime}
        />

        {/* Surface */}
        <ConfirmationItem
          icon="sports_tennis"
          label="Surface Preference"
          value={surfacePreference}
        />

        {/* Hitting partner */}
        <ConfirmationItem
          icon="group"
          label="Hitting Partner"
          value={hittingPartner ? "Added" : "Not Added"}
        />

        {/* Consultation */}
        <ConfirmationItem
          icon="support_agent"
          label="Professional Consultation"
          value={
            consultationType === "online"
              ? "Online"
              : consultationType === "on-court"
              ? "On-Court"
              : "None"
          }
        />
      </div>
    </div>

    {/* Payment notice */}
    <div className="mt-6 flex gap-3 rounded-2xl border border-surface-container bg-surface-container-low p-5">
      <span className="material-symbols-outlined shrink-0 text-primary">
        info
      </span>

      <div>
        <div className="font-bold text-primary">
          Payment Information
        </div>

        <p className="mt-1 text-sm leading-6 text-on-surface-variant">
          Payment arrangements are not handled online in this version of
          SelecTennis.
        </p>
      </div>
    </div>

    {/* Actions */}
    <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
      <button
        type="button"
        onClick={() => onNavigate?.("account")}
        className="rounded-full bg-primary px-7 py-4 font-bold text-white shadow-md"
      >
        View My Bookings
      </button>

      <button
        type="button"
        onClick={() => onNavigate?.("home")}
        className="rounded-full bg-secondary-container px-7 py-4 font-bold text-primary shadow-sm"
      >
        Return Home
      </button>
    </div>
  </section>
)}
      </main>

      <SiteFooter onNavigate={onNavigate} />
      
    </div>
  );
}

function ProgressStep({ number, title, subtitle, active = false }) {
  return (
    <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left">
      <div
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold ${
          active
            ? "bg-primary text-secondary-container"
            : "bg-surface-container text-on-surface-variant"
        }`}
      >
        {number}
      </div>

      <div>
        <div
          className={`text-sm font-bold ${
            active ? "text-primary" : "text-on-surface-variant"
          }`}
        >
          {title}
        </div>

        <div className="hidden text-xs text-outline sm:block">
          {subtitle}
        </div>
      </div>
    </div>
  );
}

function RacketCard({ racket, onRemove }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white shadow-sm">
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${racket.name}`}
        className="absolute right-4 top-4 z-10 grid h-8 w-8 place-items-center rounded-full bg-surface-container text-primary transition hover:bg-error-container hover:text-error"
      >
        ×
      </button>

      <div className="flex h-60 items-center justify-center overflow-hidden bg-surface-container-low p-6">
        {racket.image_url ? (
            <img
            src={racket.image_url}
            alt={racket.name}
            className="max-h-full max-w-full object-contain"
            />
        ) : (
          <span className="material-symbols-outlined text-5xl text-outline">
            sports_tennis
          </span>
        )}
      </div>

      <div className="p-5">
        <div className="text-xs font-bold uppercase tracking-wider text-secondary">
          {racket.brand_name || racket.brand}
        </div>

        <h3 className="mt-1 text-lg font-bold text-primary">
          {racket.name}
        </h3>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-outline-variant pt-4">
          <Spec
            label="Head Size"
            value={
              racket.head_size != null
                ? `${racket.head_size} sq in`
                : "—"
            }
          />

          <Spec
            label="Pattern"
            value={
              racket.string_pattern
                ? String(racket.string_pattern).replace("x", " × ")
                : "—"
            }
          />

          <Spec
            label="Unstrung Weight"
            value={
              racket.unstrung_weight_g != null
                ? `${racket.unstrung_weight_g} g`
                : "—"
            }
          />
        </div>

        <div className="mt-4 text-sm font-semibold text-primary">
          ✓ Selected
        </div>
      </div>
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div>
      <div className="text-[9px] font-bold uppercase tracking-wider text-outline">
        {label}
      </div>

      <div className="mt-1 text-xs font-bold text-primary">
        {value}
      </div>
    </div>
  );
}
function ConsultationOption({
  selected,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-primary bg-primary text-white shadow-md"
          : "border-surface-container bg-surface hover:border-primary"
      }`}
    >
      <div
        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 ${
          selected
            ? "border-secondary-container"
            : "border-outline"
        }`}
      >
        {selected && (
          <div className="h-2.5 w-2.5 rounded-full bg-secondary-container" />
        )}
      </div>

      <div>
        <div className="font-bold">
          {title}
        </div>

        <div
          className={`mt-1 text-sm ${
            selected
              ? "text-white/75"
              : "text-on-surface-variant"
          }`}
        >
          {description}
        </div>
      </div>
    </button>
  );
}
function SummaryRow({ label, value }) {
  return (
    <div className="mt-3 flex items-start justify-between gap-4 text-sm">
      <span className="text-white/65">
        {label}
      </span>

      <span className="max-w-[55%] text-right font-semibold text-white">
        {value}
      </span>
    </div>
  );
}

function formatBookingDate(date) {
  if (!date) return "";

  return new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
function ConfirmationItem({ icon, label, value }) {
  return (
    <div className="flex gap-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-surface-container-low text-primary">
        <span className="material-symbols-outlined">
          {icon}
        </span>
      </div>

      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-outline">
          {label}
        </div>

        <div className="mt-1 font-semibold text-primary">
          {value || "—"}
        </div>
      </div>
    </div>
  );
}