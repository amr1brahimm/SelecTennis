import { useState } from "react";

function RacketSelectorQuestion({
  question,
  value,
  onChange,
  rackets = [],
}) {
  const [searchTerm, setSearchTerm] = useState("");

 const selectedRacket =
  rackets.find((racket) => racket.racket_id === value) ?? null;

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredRackets =
    normalizedSearch.length > 0
      ? rackets
          .filter((racket) => {
            const searchableText = [
              racket.brand,
              racket.name,
              racket.model,
            ]
              .filter(Boolean)
              .join(" ")
              .toLowerCase();

            return searchableText.includes(normalizedSearch);
          })
          .slice(0, 8)
      : [];

  const handleSelect = (racket) => {
  onChange(racket.racket_id);
  setSearchTerm("");
};

  const handleChangeRacket = () => {
    onChange("");
    setSearchTerm("");
  };

  return (
    <div className="mt-10">
      {!selectedRacket ? (
        <>
          {/* SEARCH RACKET DATABASE */}
          <div className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
            <label
              htmlFor={`racket-search-${question.id}`}
              className="font-title-md text-base font-semibold text-primary"
            >
              Search Racket Database
            </label>

            <div className="relative mt-3">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-xl text-on-surface-variant">
                search
              </span>

              <input
                id={`racket-search-${question.id}`}
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by brand or racket model..."
                autoComplete="off"
                className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-4 pl-12 pr-4 text-sm text-on-surface outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* SEARCH RESULTS */}
            {normalizedSearch && (
              <div className="mt-3 overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
                {filteredRackets.length > 0 ? (
                  filteredRackets.map((racket) => (
                    <button
                      key={racket.racket_id}
                      type="button"
                      onClick={() => handleSelect(racket)}
                      className="group flex w-full items-center justify-between gap-4 border-b border-outline-variant/40 p-4 text-left transition last:border-b-0 hover:bg-surface-container-low"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-surface-container text-primary">
                          <span className="material-symbols-outlined text-xl">
                            sports_tennis
                          </span>
                        </div>

                        <div className="min-w-0">
                          <p className="font-title-md text-base font-semibold text-primary">
                            {racket.brand} {racket.name || racket.model}
                          </p>

                          {racket.version && (
                            <p className="mt-0.5 text-xs text-on-surface-variant">
                              {racket.version}
                            </p>
                          )}
                        </div>
                      </div>

                      <span className="material-symbols-outlined shrink-0 text-on-surface-variant transition group-hover:text-primary">
                        add_circle
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="p-5 text-center">
                    <span className="material-symbols-outlined text-2xl text-outline">
                      search_off
                    </span>

                    <p className="mt-2 text-sm font-semibold text-primary">
                      No rackets found
                    </p>

                    <p className="mt-1 text-xs text-on-surface-variant">
                      Try searching with a different brand or model name.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* EMPTY DATABASE STATE */}
          {rackets.length === 0 && (
            <div className="mt-4 flex items-start gap-3 rounded-xl bg-surface-container-low p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
                <span className="material-symbols-outlined text-lg">
                  database
                </span>
              </div>

              <div>
                <p className="font-title-md text-sm font-semibold text-primary">
                  Racket database
                </p>

                <p className="mt-0.5 text-sm text-on-surface-variant">
                  Racket search results will appear here once the racket
                  database is connected.
                </p>
              </div>
            </div>
          )}
        </>
      ) : (
        /* SELECTED RACKET */
        <div className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-secondary-container shadow-sm">
                  <span className="material-symbols-outlined text-2xl">
                    sports_tennis
                  </span>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-variant">
                    Current Racket
                  </p>

                  <h2 className="mt-1 font-headline-sm text-xl font-semibold text-primary">
                    {selectedRacket.brand}{" "}
                    {selectedRacket.name || selectedRacket.model}
                  </h2>

                  {selectedRacket.version && (
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {selectedRacket.version}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleChangeRacket}
                className="inline-flex items-center justify-center gap-1 rounded-lg bg-surface-container-lowest px-4 py-2 font-label-md text-xs font-semibold text-primary shadow-sm transition hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-base">
                  swap_horiz
                </span>
                Change Racket
              </button>
            </div>

            {/* RACKET SPECS */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Spec
                label="Head Size"
                value={formatSpec(
                  selectedRacket.headSize,
                  selectedRacket.head_size,
                  " sq in"
                )}
              />

              <Spec
                label="String Pattern"
                value={
                  selectedRacket.stringPattern ??
                  selectedRacket.string_pattern
                }
              />
                <Spec
                label="Stiffness"
                value={formatSpec(
                    selectedRacket.stiffness_ra,
                    null,
                    " RA"
                )}
                />

              <Spec
                label="Balance"
                value={formatSpec(
                    selectedRacket.balance_cm,
                    null,
                    " cm"
                )}
                />

                <Spec
                label="Unstrung Weight"
                value={formatSpec(
                    selectedRacket.unstrung_weight_g,
                    null,
                    " g"
                )}
                />

              <Spec
                label="Swingweight"
                value={
                  selectedRacket.swingweight ??
                  selectedRacket.swing_weight
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Spec({ label, value }) {
  return (
    <div className="rounded-lg bg-surface-container-lowest p-3">
      <span className="block font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
        {label}
      </span>

      <span className="mt-1 block font-title-md text-sm font-semibold text-primary">
        {value ?? "—"}
      </span>
    </div>
  );
}

function formatSpec(primaryValue, fallbackValue, suffix) {
  const value = primaryValue ?? fallbackValue;

  if (value === undefined || value === null || value === "") {
    return null;
  }

  return `${value}${suffix}`;
}

export default RacketSelectorQuestion;