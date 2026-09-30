function MultiSelectQuestion({ question, value, onChange }) {
  const selectedValues = value?.selected ?? [];
  const details = value?.details ?? "";

  const handleOptionClick = (option) => {
    let nextSelected;

    if (option.exclusive) {
      // Clicking the exclusive option clears everything else.
      nextSelected = selectedValues.includes(option.value)
        ? []
        : [option.value];
    } else {
      // Selecting a normal option automatically removes
      // any exclusive option such as "None".
      const exclusiveValues = question.options
        .filter((item) => item.exclusive)
        .map((item) => item.value);

      const withoutExclusive = selectedValues.filter(
        (item) => !exclusiveValues.includes(item)
      );

      if (withoutExclusive.includes(option.value)) {
        nextSelected = withoutExclusive.filter(
          (item) => item !== option.value
        );
      } else {
        nextSelected = [...withoutExclusive, option.value];
      }
    }

    onChange({
      selected: nextSelected,
      details,
    });
  };

  const handleDetailsChange = (event) => {
    onChange({
      selected: selectedValues,
      details: event.target.value,
    });
  };

  const normalOptions = question.options.filter(
    (option) => !option.exclusive
  );

  const exclusiveOptions = question.options.filter(
    (option) => option.exclusive
  );

  return (
    <div className="mt-10">
      {/* STANDARD MULTI-SELECT GRID */}
      <div
        className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
        aria-label={question.title}
      >
        {normalOptions.map((option) => {
          const selected = selectedValues.includes(option.value);

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleOptionClick(option)}
              aria-pressed={selected}
              className={`group flex min-h-28 items-center justify-between gap-4 rounded-xl p-4 text-left transition-all duration-200 ${
                selected
                  ? "bg-surface-container-low shadow-md ring-2 ring-primary"
                  : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-low hover:shadow-md"
              }`}
            >
              <div className="flex min-w-0 items-center gap-3">
                {option.icon && (
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      selected
                        ? "bg-primary text-secondary-container"
                        : "bg-surface-container text-on-surface-variant group-hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {option.icon}
                    </span>
                  </div>
                )}

                <span
                  className={`font-title-md text-base text-primary ${
                    selected ? "font-bold" : "font-semibold"
                  }`}
                >
                  {option.label}
                </span>
              </div>

              <div
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-colors ${
                  selected
                    ? "bg-primary text-secondary-container"
                    : "bg-surface-container-high text-transparent"
                }`}
              >
                <span className="material-symbols-outlined text-base">
                  check
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* EXCLUSIVE OPTION — NONE / NOTHING */}
      {exclusiveOptions.map((option) => {
        const selected = selectedValues.includes(option.value);

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleOptionClick(option)}
            aria-pressed={selected}
            className={`group mt-3 flex w-full items-center justify-between gap-4 rounded-xl p-4 text-left transition-all duration-200 ${
              selected
                ? "bg-surface-container-low shadow-md ring-2 ring-primary"
                : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-low hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-3">
              {option.icon && (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selected
                      ? "bg-primary text-secondary-container"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {option.icon}
                  </span>
                </div>
              )}

              <span
                className={`font-title-md text-base text-primary ${
                  selected ? "font-bold" : "font-semibold"
                }`}
              >
                {option.label}
              </span>
            </div>

            <div
              className={`flex h-6 w-6 items-center justify-center rounded-md ${
                selected
                  ? "bg-primary text-secondary-container"
                  : "bg-surface-container-high text-transparent"
              }`}
            >
              <span className="material-symbols-outlined text-base">
                check
              </span>
            </div>
          </button>
        );
      })}

      {/* OPTIONAL DETAILS */}
      {question.allowDetails && (
        <div className="mt-6 rounded-xl bg-surface-container-low p-4 sm:p-5">
          <div className="mb-3">
            <label
              htmlFor={`details-${question.id}`}
              className="font-title-md text-base font-semibold text-primary"
            >
              Additional details
              {question.detailsOptional && (
                <span className="ml-2 font-body-sm text-xs font-normal text-on-surface-variant">
                  Optional
                </span>
              )}
            </label>

            <p className="mt-1 text-sm text-on-surface-variant">
              Add anything else you think may be relevant.
            </p>
          </div>

          <textarea
            id={`details-${question.id}`}
            value={details}
            onChange={handleDetailsChange}
            rows={4}
            placeholder="Add additional details..."
            className="w-full resize-none rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-sm text-on-surface outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}
    </div>
  );
}

export default MultiSelectQuestion;