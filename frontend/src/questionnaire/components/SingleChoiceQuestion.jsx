function SingleChoiceQuestion({ question, value, onChange }) {
  return (
    <div
      className="mt-10 space-y-2"
      role="radiogroup"
      aria-label={question.title}
    >
      {question.options.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.value)}
            className={`group relative flex w-full items-center justify-between rounded-xl p-4 text-left transition-all duration-200 ${
              selected
                ? "bg-surface-container-low shadow-md ring-2 ring-primary-container"
                : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-low hover:shadow-md"
            }`}
          >
            <div className="flex min-w-0 items-center gap-4">
              {/* RADIO */}
              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                  selected
                    ? "bg-primary shadow-sm"
                    : "bg-surface-container-high group-hover:bg-surface-container-highest"
                }`}
              >
                <div
                  className={`h-2.5 w-2.5 rounded-full ${
                    selected ? "bg-secondary-container" : "bg-transparent"
                  }`}
                />
              </div>

              {/* TEXT */}
              <div className="flex min-w-0 flex-col">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-title-lg text-lg text-primary ${
                      selected ? "font-bold" : "font-semibold"
                    }`}
                  >
                    {option.label}
                  </span>

                  {selected && (
                    <span className="rounded-full bg-secondary-container px-2 py-0.5 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-secondary-fixed">
                      Selected
                    </span>
                  )}
                </div>

                {option.description && (
                  <span
                    className={`mt-0.5 text-sm ${
                      selected
                        ? "text-on-surface"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {option.description}
                  </span>
                )}
              </div>
            </div>

            {/* CHECK */}
            {selected && (
              <span className="material-symbols-outlined shrink-0 pl-4 text-lg text-primary">
                check_circle
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SingleChoiceQuestion;