function NumericQuestion({ question, value, onChange }) {
  const numericValue = value ?? "";

  const hasValue = numericValue !== "";
  const parsedValue = Number(numericValue);

  const isValid =
    hasValue &&
    !Number.isNaN(parsedValue) &&
    parsedValue >= question.min &&
    parsedValue <= question.max;

  const handleChange = (event) => {
    const nextValue = event.target.value;

    if (nextValue === "") {
      onChange("");
      return;
    }

    onChange(nextValue);
  };

  return (
    <div className="mt-10">
      {/* NUMERIC INPUT CARD */}
      <div className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <label
            htmlFor={`numeric-${question.id}`}
            className="font-title-md text-base font-semibold text-primary"
          >
            {question.unit}
          </label>

          <span className="rounded-full bg-surface-container-high px-3 py-1 font-label-sm text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
            Scale {question.min.toFixed(2)}–{question.max.toFixed(2)}
          </span>
        </div>

        <div className="rounded-xl bg-surface-container-lowest p-5 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-end gap-2">
              <input
                id={`numeric-${question.id}`}
                type="number"
                min={question.min}
                max={question.max}
                step={question.step}
                value={numericValue}
                onChange={handleChange}
                placeholder="0.00"
                className="w-40 border-0 bg-transparent font-headline-lg text-4xl font-semibold text-primary outline-none placeholder:text-outline-variant"
              />

              <span className="mb-1 font-label-md text-sm font-semibold text-on-surface-variant">
                {question.unit}
              </span>
            </div>

            {isValid && (
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-secondary-container px-3 py-1.5 font-label-md text-xs font-bold text-on-secondary-fixed sm:self-auto">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                Valid UTR
              </div>
            )}
          </div>

          {hasValue && !isValid && (
            <p className="mt-3 flex items-center gap-1.5 text-sm text-error">
              <span className="material-symbols-outlined text-base">
                error
              </span>
              Enter a value between {question.min.toFixed(2)} and{" "}
              {question.max.toFixed(2)}.
            </p>
          )}
        </div>

        {/* SCALE REFERENCE */}
        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          <ScaleReference
            label="Recreational"
            range="1.00–4.99"
          />

          <ScaleReference
            label="Club"
            range="5.00–7.99"
          />

          <ScaleReference
            label="Advanced"
            range="8.00–10.99"
          />

          <ScaleReference
            label="Elite / Pro"
            range="11.00+"
          />
        </div>
      </div>

      {/* OPTIONAL QUESTION MESSAGE */}
      {question.optional && (
        <div className="mt-4 flex items-start gap-3 rounded-xl bg-surface-container-low p-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-surface-container-high text-primary">
            <span className="material-symbols-outlined text-lg">info</span>
          </div>

          <div>
            <p className="font-title-md text-sm font-semibold text-primary">
              Don&apos;t know your UTR?
            </p>

            <p className="mt-0.5 text-sm text-on-surface-variant">
              No problem. This question is optional and can be skipped.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function ScaleReference({ label, range }) {
  return (
    <div className="rounded-lg bg-surface-container-lowest p-3 text-center">
      <span className="block font-label-md text-xs font-semibold text-primary">
        {label}
      </span>

      <span className="mt-0.5 block text-xs text-on-surface-variant">
        {range}
      </span>
    </div>
  );
}

export default NumericQuestion;