import { preferenceScaleOptions } from "../questions";

function PreferenceScaleQuestion({
  question,
  value,
  onChange,
}) {
  return (
    <div
      className="mt-10"
      role="radiogroup"
      aria-label={question.title}
    >
      <div className="grid grid-cols-1 gap-3">
        {preferenceScaleOptions.map((option, index) => {
          const selected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.value)}
              className={`group relative flex w-full items-center gap-4 rounded-xl p-4 text-left transition-all duration-200 sm:p-5 ${
                selected
                  ? "bg-surface-container-low shadow-md ring-2 ring-primary"
                  : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-low hover:shadow-md"
              }`}
            >
              {/* NUMBER */}
              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl font-label-lg text-sm font-bold transition-colors ${
                  selected
                    ? "bg-primary text-secondary-container"
                    : "bg-surface-container text-primary group-hover:bg-surface-container-high"
                }`}
              >
                {option.value}
              </div>

              {/* LABEL */}
              <div className="min-w-0 flex-1">
                <span
                  className={`block font-title-md text-base text-primary ${
                    selected ? "font-bold" : "font-semibold"
                  }`}
                >
                  {option.label}
                </span>

                <span className="mt-1 block text-xs text-on-surface-variant">
                  {getScaleDescription(index)}
                </span>
              </div>

              {/* SELECTION INDICATOR */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                  selected
                    ? "bg-primary"
                    : "bg-surface-container-high"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    selected
                      ? "bg-secondary-container"
                      : "bg-transparent"
                  }`}
                />
              </div>

              {/* SELECTED BADGE */}
              {selected && (
                <span className="hidden rounded-full bg-secondary-container px-2.5 py-1 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-secondary-fixed sm:inline-flex">
                  Selected
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SCALE GUIDE */}
      <div className="mt-4 flex items-center justify-between px-1">
        <span className="font-label-sm text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Lower importance
        </span>

        <div className="mx-4 h-px flex-1 bg-outline-variant" />

        <span className="font-label-sm text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant">
          Higher importance
        </span>
      </div>
    </div>
  );
}

function getScaleDescription(index) {
  const descriptions = [
    "This is not an important factor in your racket preference.",
    "This matters slightly, but other characteristics are more important.",
    "This is a meaningful part of what you want from your racket.",
    "This is one of the more important characteristics for you.",
    "This is a major priority in what you want from your racket.",
  ];

  return descriptions[index];
}

export default PreferenceScaleQuestion;