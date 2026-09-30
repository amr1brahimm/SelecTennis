function PrimarySecondaryQuestion({ question, value, onChange }) {
  const primary = value?.primary ?? "";
  const secondary = value?.secondary ?? "";

  const handlePrimaryChange = (optionValue) => {
    onChange({
      primary: optionValue,
      // If this option was secondary, remove it from secondary.
      secondary:
        secondary === optionValue ? "" : secondary,
    });
  };

  const handleSecondaryChange = (optionValue) => {
    // Primary and secondary cannot be the same.
    if (optionValue === primary) return;

    onChange({
      primary,
      // Clicking the selected secondary option again removes it.
      secondary:
        secondary === optionValue ? "" : optionValue,
    });
  };

  return (
    <div className="mt-10 space-y-6">
      {/* PRIMARY SELECTION */}
      <SelectionSection
        title="Primary Instinct"
        description="Choose the option that best represents your natural first response."
        required
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {question.options.map((option) => (
            <ChoiceCard
              key={option.value}
              option={option}
              selected={primary === option.value}
              onClick={() => handlePrimaryChange(option.value)}
              type="primary"
            />
          ))}
        </div>
      </SelectionSection>

      {/* SECONDARY SELECTION */}
      <SelectionSection
        title="Secondary Instinct"
        description="Optional — choose another response that also describes your game."
      >
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {question.options.map((option) => {
            const unavailable = primary === option.value;

            return (
              <ChoiceCard
                key={option.value}
                option={option}
                selected={secondary === option.value}
                disabled={unavailable}
                onClick={() =>
                  handleSecondaryChange(option.value)
                }
                type="secondary"
              />
            );
          })}
        </div>

        {secondary && (
          <button
            type="button"
            onClick={() =>
              onChange({
                primary,
                secondary: "",
              })
            }
            className="mt-3 inline-flex items-center gap-1 rounded-lg px-3 py-2 font-label-md text-xs font-semibold text-on-surface-variant transition hover:bg-surface-container hover:text-primary"
          >
            <span className="material-symbols-outlined text-base">
              close
            </span>
            Clear secondary choice
          </button>
        )}
      </SelectionSection>
    </div>
  );
}

function SelectionSection({
  title,
  description,
  required = false,
  children,
}) {
  return (
    <section className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-title-md text-base font-semibold text-primary">
              {title}
            </h2>

            {required ? (
              <span className="rounded-full bg-primary px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase tracking-wider text-secondary-container">
                Required
              </span>
            ) : (
              <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                Optional
              </span>
            )}
          </div>

          <p className="mt-1 text-sm text-on-surface-variant">
            {description}
          </p>
        </div>
      </div>

      {children}
    </section>
  );
}

function ChoiceCard({
  option,
  selected,
  disabled = false,
  onClick,
  type,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={`group relative flex min-h-24 w-full items-center justify-between gap-4 rounded-xl p-4 text-left transition-all duration-200 ${
        selected
          ? "bg-surface-container-lowest shadow-md ring-2 ring-primary"
          : disabled
            ? "cursor-not-allowed bg-surface-container opacity-45"
            : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-high hover:shadow-md"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {/* SELECTION INDICATOR */}
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
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

        <span
          className={`font-title-md text-base text-primary ${
            selected ? "font-bold" : "font-semibold"
          }`}
        >
          {option.label}
        </span>
      </div>

      {selected && (
        <span className="shrink-0 rounded-full bg-secondary-container px-2 py-1 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-secondary-fixed">
          {type === "primary" ? "Primary" : "Secondary"}
        </span>
      )}

      {disabled && (
        <span className="hidden shrink-0 font-label-sm text-[10px] font-semibold uppercase tracking-wider text-on-surface-variant sm:block">
          Primary choice
        </span>
      )}
    </button>
  );
}

export default PrimarySecondaryQuestion;