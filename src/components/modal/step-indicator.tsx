interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const steps = [
    "Especialidade",
    "Médico",
    "Data e Hora",
    "Dados Pessoais",
    "Confirmação",
  ];

  return (
    <div className="step-indicator">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;

        return (
          <div key={stepNumber} className="step-item">
            <div className="step-content">
              <div
                className={`step-circle ${
                  isCompleted ? "completed" : isCurrent ? "current" : "pending"
                }`}
              >
                {isCompleted ? "✓" : stepNumber}
              </div>
              <span
                className={`step-label ${
                  isCurrent || isCompleted ? "active" : ""
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`step-connector ${isCompleted ? "completed" : ""}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
