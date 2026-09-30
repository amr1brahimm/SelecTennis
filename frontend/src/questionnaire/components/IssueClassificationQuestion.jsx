function IssueClassificationQuestion({
  question,
  value = {},
  onChange,
  issueType,
  affectedAreas = [],
}) {
  const classifications = [
    { value: "injury", label: "Injury" },
    { value: "discomfort", label: "Discomfort" },
    { value: "both", label: "Both" },
  ];

  const handleClassification = (area, classification) => {
    onChange({
      ...value,
      [area]: classification,
    });
  };

  // If Q8 already tells us all affected areas are the same type,
  // simply confirm what those areas represent.
  if (issueType === "injury" || issueType === "discomfort") {
    return (
      <div className="mt-10 space-y-3">
        {affectedAreas.map((area) => (
          <div
            key={area}
            className="rounded-xl bg-surface-container-low p-4"
          >
            <p className="font-title-md font-semibold capitalize text-primary">
              {area}
            </p>

            <p className="mt-1 text-sm text-on-surface-variant">
              {issueType === "injury"
                ? "This area will be treated as an injury in your recommendation."
                : "This area will be treated as discomfort in your recommendation."}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // If they selected Both, classify every affected area individually.
  return (
    <div className="mt-10 space-y-4">
      {affectedAreas.map((area) => (
        <div
          key={area}
          className="rounded-xl bg-surface-container-low p-4 sm:p-5"
        >
          <p className="font-title-md font-semibold capitalize text-primary">
            {area}
          </p>

          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {classifications.map((option) => {
              const selected = value?.[area] === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() =>
                    handleClassification(area, option.value)
                  }
                  className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                    selected
                      ? "border-primary bg-primary text-secondary-container"
                      : "border-outline-variant bg-surface-container-lowest text-primary hover:bg-surface-container"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default IssueClassificationQuestion;