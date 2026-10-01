import { useEffect, useState } from "react";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import { apiUrl } from "../config/api.js";

export default function AccountPage({
  onNavigate,
  onRecommendation,
  onLogout,
}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(apiUrl("/profile"), {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Could not load profile.");
        }

        setUser(data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (onLogout) {
      onLogout();
    }
  };
  const openEditor = () => {
  setEditError("");

  setEditForm({
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    phone_number: user.phone_number || "",
    date_of_birth: user.date_of_birth || "",
    gender: user.gender || "",
    height_cm: user.height_cm || "",
    weight_kg: user.weight_kg || "",
  });

  setEditing(true);
};
const saveProfile = async () => {
  try {
    setSaving(true);
    setEditError("");

    const token = localStorage.getItem("token");

    const response = await fetch(apiUrl("/profile"), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Could not update profile."
      );
    }

    setUser(data.user);
    localStorage.setItem("user", JSON.stringify(data.user));

    setEditing(false);
    setEditForm(null);
  } catch (err) {
    setEditError(err.message);
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface">
        <div className="text-center">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">
            progress_activity
          </span>
          <p className="mt-3 font-semibold text-primary">
            Loading your account...
          </p>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="grid min-h-screen place-items-center bg-surface p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-sm">
          <span className="material-symbols-outlined text-4xl text-primary">
            error
          </span>

          <h1 className="mt-3 text-xl font-bold text-primary">
            Couldn&apos;t load your account
          </h1>

          <p className="mt-2 text-sm text-on-surface-variant">
            {error || "Please try again."}
          </p>

          <button
            type="button"
            onClick={() => onNavigate?.("home")}
            className="mt-6 rounded-full bg-primary px-6 py-3 font-bold text-white"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const fullName = `${user.first_name} ${user.last_name}`;

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <SiteHeader active="account" onNavigate={onNavigate} />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* PROFILE BANNER */}
        <section className="relative overflow-hidden rounded-[2rem] bg-primary px-6 py-8 text-white shadow-sm sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-secondary-container/10" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div className="flex items-center gap-5">
              <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-secondary-container text-2xl font-bold text-primary sm:h-24 sm:w-24 sm:text-3xl">
                {initials}
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary-container">
                  My Account
                </p>

                <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
                  {fullName}
                </h1>

                <p className="mt-2 text-sm text-white/70">
                  {user.email}
                </p>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                  Manage your profile, recommendations, and racket demo
                  bookings.
                </p>
              </div>
            </div>

         <button
            type="button"
            onClick={openEditor}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow-sm transition hover:bg-surface-container-low"
            >
            <span className="material-symbols-outlined text-lg">
                edit
            </span>
            Edit Profile
            </button>
          </div>
        </section>

        {/* TOP CARDS */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* PERSONAL INFORMATION */}
          <div
            id="personal-information"
            className="rounded-3xl bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-primary">
                  Personal Information
                </h2>

                <p className="mt-1 text-sm text-on-surface-variant">
                  Your account and player profile details.
                </p>
              </div>

              <span className="material-symbols-outlined text-2xl text-primary">
                person
              </span>
            </div>

            <div className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Info label="First Name" value={user.first_name} />
              <Info label="Last Name" value={user.last_name} />
              <Info label="Email" value={user.email} />
              <Info label="Phone Number" value={user.phone_number} />
              <Info
                label="Date of Birth"
                value={formatDate(user.date_of_birth)}
              />
              <Info label="Gender" value={formatGender(user.gender)} />
              <Info
                label="Height"
                value={
                  user.height_cm ? `${user.height_cm} cm` : "Not provided"
                }
              />
              <Info
                label="Weight"
                value={
                  user.weight_kg ? `${user.weight_kg} kg` : "Not provided"
                }
              />
            </div>

            <button
            type="button"
            onClick={openEditor}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-surface-container px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-surface-container-high"
            >
            <span className="material-symbols-outlined text-lg">
                edit
            </span>
            Edit Information
            </button>
          </div>

          {/* MY BOOKINGS */}
          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary">
                  My Bookings
                </h2>

                <p className="mt-1 text-sm text-on-surface-variant">
                  Your racket demos and optional services.
                </p>
              </div>

              <span className="material-symbols-outlined text-2xl text-primary">
                calendar_month
              </span>
            </div>

            {/* EMPTY STATE FOR NOW */}
            <div className="mt-8 flex min-h-[230px] flex-col items-center justify-center rounded-2xl bg-surface-container-low p-6 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-full bg-white text-primary shadow-sm">
                <span className="material-symbols-outlined text-2xl">
                  event_available
                </span>
              </div>

              <h3 className="mt-4 font-bold text-primary">
                No bookings yet
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-on-surface-variant">
                When you book a racket demo or optional service, it will
                appear here.
              </p>

              <button
                type="button"
                onClick={() => onNavigate?.("booking")}
                className="mt-5 rounded-full bg-secondary-container px-6 py-3 text-sm font-bold text-primary shadow-sm transition hover:brightness-95"
              >
                Book a Demo
              </button>
            </div>
          </div>
        </section>

        {/* QUESTIONNAIRE HISTORY */}
        <section className="mt-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold text-primary">
                Questionnaire History
              </h2>

              <p className="mt-1 text-sm text-on-surface-variant">
                Your completed racket recommendation assessments will appear
                here.
              </p>
            </div>

            <button
              type="button"
              onClick={onRecommendation}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
            >
              New Assessment
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </button>
          </div>

          {/* EMPTY STATE FOR NOW */}
          <div className="mt-7 flex min-h-[190px] flex-col items-center justify-center rounded-2xl border border-dashed border-outline-variant bg-surface-container-low/50 p-6 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-surface-container-highest text-primary">
              <span className="material-symbols-outlined">
                assignment
              </span>
            </div>

            <h3 className="mt-4 font-bold text-primary">
              No completed assessments yet
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-on-surface-variant">
              Complete the recommendation questionnaire and your assessment
              history will be available here.
            </p>
          </div>
        </section>

        {editing && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
      
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Edit Profile
          </h2>
          <p className="mt-1 text-sm text-on-surface-variant">
            Update your personal and player information.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditing(false)}
          className="grid h-10 w-10 place-items-center rounded-full bg-surface-container text-primary"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <EditField
            label="First Name"
            value={editForm?.first_name}
            onChange={(value) =>
                setEditForm({ ...editForm, first_name: value })
            }
            />

            <EditField
            label="Last Name"
            value={editForm?.last_name}
            onChange={(value) =>
                setEditForm({ ...editForm, last_name: value })
            }
            />

            <EditField
            label="Phone Number"
            value={editForm?.phone_number}
            onChange={(value) =>
                setEditForm({ ...editForm, phone_number: value })
            }
            />

            <EditField
            label="Date of Birth"
            type="date"
            value={editForm?.date_of_birth}
            onChange={(value) =>
                setEditForm({ ...editForm, date_of_birth: value })
            }
            />

            <EditField
            label="Gender"
            value={editForm?.gender}
            onChange={(value) =>
                setEditForm({ ...editForm, gender: value })
            }
            />

            <EditField
            label="Height (cm)"
            type="number"
            value={editForm?.height_cm}
            onChange={(value) =>
                setEditForm({ ...editForm, height_cm: value })
            }
            />

            <EditField
            label="Weight (kg)"
            type="number"
            value={editForm?.weight_kg}
            onChange={(value) =>
                setEditForm({ ...editForm, weight_kg: value })
            }
            />
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
          Email
        </p>

        <div className="mt-2 rounded-xl bg-surface-container-low px-4 py-3 text-sm text-on-surface-variant">
          {user.email}
        </div>

        <p className="mt-1 text-xs text-on-surface-variant">
          Email cannot be changed here.
        </p>
      </div>

      {editError && (
        <div className="mt-5 rounded-xl bg-error-container p-4 text-sm text-error">
          {editError}
        </div>
      )}

      <div className="mt-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="rounded-full bg-surface-container px-6 py-3 text-sm font-bold text-primary"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={saveProfile}
          disabled={saving}
          className="rounded-full bg-secondary-container px-7 py-3 text-sm font-bold text-primary disabled:opacity-50"
          
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  </div>
)}

        {/* LOG OUT */}
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold text-error transition hover:bg-error-container"
          >
            <span className="material-symbols-outlined text-lg">
              logout
            </span>
            Log Out
          </button>
        </div>
      </main>

      <SiteFooter onNavigate={onNavigate} />
    </div>
  );
}
function EditField({
  label,
  value,
  type = "text",
  onChange,
}) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>

      <input
        type={type}
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-xl border border-outline-variant bg-white px-4 py-3 text-sm text-primary outline-none focus:border-primary"
      />
    </label>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-variant">
        {label}
      </div>

      <div className="mt-1.5 text-sm font-semibold text-primary">
        {value || "Not provided"}
      </div>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "Not provided";

  const [year, month, day] = value.split("-");

  if (!year || !month || !day) return value;

  return `${day}/${month}/${year}`;
}

function formatGender(value) {
  if (!value) return "Not provided";

  return value.charAt(0).toUpperCase() + value.slice(1);
}