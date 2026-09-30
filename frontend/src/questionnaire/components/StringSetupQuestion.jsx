function StringSetupQuestion({ question, value, onChange }) {
  const setup = {
    configuration: value?.configuration ?? "full_bed",
    mains: value?.mains ?? "",
    crosses: value?.crosses ?? "",
    tension: value?.tension ?? "",
    tensionUnit: value?.tensionUnit ?? "lbs",
  };

  const updateSetup = (changes) => {
    onChange({
      ...setup,
      ...changes,
    });
  };

  const handleConfigurationChange = (configuration) => {
    if (configuration === "full_bed") {
      updateSetup({
        configuration,
        crosses: setup.mains,
      });
    } else {
      updateSetup({
        configuration,
      });
    }
  };

  const handleMainsChange = (event) => {
    const mains = event.target.value;

    updateSetup({
      mains,
      ...(setup.configuration === "full_bed"
        ? { crosses: mains }
        : {}),
    });
  };

  return (
    <div className="mt-10 space-y-5">
      {/* CONFIGURATION */}
      <div className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
        <p className="font-title-md text-base font-semibold text-primary">
          Configuration
        </p>

        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ConfigurationButton
            selected={setup.configuration === "full_bed"}
            title="Full Bed"
            description="Same string in mains and crosses"
            onClick={() => handleConfigurationChange("full_bed")}
          />

          <ConfigurationButton
            selected={setup.configuration === "hybrid"}
            title="Hybrid Setup"
            description="Different strings in mains and crosses"
            onClick={() => handleConfigurationChange("hybrid")}
          />
        </div>
      </div>

      {/* STRING INPUTS */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <StringField
          id={`mains-${question.id}`}
          label="Mains"
          value={setup.mains}
          onChange={handleMainsChange}
          placeholder="Search or enter string model..."
        />

        <StringField
          id={`crosses-${question.id}`}
          label="Crosses"
          value={setup.crosses}
          onChange={(event) =>
            updateSetup({
              crosses: event.target.value,
            })
          }
          placeholder="Search or enter string model..."
          disabled={setup.configuration === "full_bed"}
        />
      </div>

      {/* TENSION */}
      <div className="rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-6">
        <label
          htmlFor={`tension-${question.id}`}
          className="font-title-md text-base font-semibold text-primary"
        >
          String Tension
        </label>

        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <input
              id={`tension-${question.id}`}
              type="number"
              min="0"
              step="0.5"
              value={setup.tension}
              onChange={(event) =>
                updateSetup({
                  tension: event.target.value,
                })
              }
              placeholder="Enter tension"
              className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest px-4 py-4 text-base text-on-surface outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div
            className="flex rounded-xl bg-surface-container-high p-1"
            role="radiogroup"
            aria-label="Tension unit"
          >
            <UnitButton
              label="lbs"
              selected={setup.tensionUnit === "lbs"}
              onClick={() =>
                updateSetup({
                  tensionUnit: "lbs",
                })
              }
            />

            <UnitButton
              label="kg"
              selected={setup.tensionUnit === "kg"}
              onClick={() =>
                updateSetup({
                  tensionUnit: "kg",
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigurationButton({
  selected,
  title,
  description,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex items-center gap-3 rounded-xl p-4 text-left transition-all ${
        selected
          ? "bg-surface-container-lowest shadow-md ring-2 ring-primary"
          : "bg-surface-container-lowest shadow-sm hover:bg-surface-container-high"
      }`}
    >
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

      <div>
        <p className="font-title-md text-sm font-semibold text-primary">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-on-surface-variant">
          {description}
        </p>
      </div>
    </button>
  );
}

function StringField({
  id,
  label,
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div
      className={`rounded-xl bg-surface-container-low p-4 shadow-sm sm:p-5 ${
        disabled ? "opacity-70" : ""
      }`}
    >
      <label
        htmlFor={id}
        className="font-label-sm text-[10px] font-bold uppercase tracking-widest text-primary"
      >
        {label}
      </label>

      <div className="relative mt-3">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-lg text-on-surface-variant">
          search
        </span>

        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full rounded-xl border border-outline-variant bg-surface-container-lowest py-4 pl-11 pr-4 text-sm text-on-surface outline-none transition placeholder:text-outline focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed"
        />
      </div>

      {disabled && (
        <p className="mt-2 text-xs text-on-surface-variant">
          Same as mains for a full bed setup.
        </p>
      )}
    </div>
  );
}

function UnitButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`min-w-16 rounded-lg px-4 py-3 font-label-md text-sm font-semibold transition ${
        selected
          ? "bg-primary text-on-primary shadow-sm"
          : "text-on-surface-variant hover:text-primary"
      }`}
    >
      {label}
    </button>
  );
}

export default StringSetupQuestion;