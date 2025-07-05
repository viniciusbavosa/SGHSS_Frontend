import type { BookingData } from "../modal/booking-modal";

interface SpecialtyStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
}

export const SpecialtyStep = ({
  data,
  onUpdate,
  onNext,
}: SpecialtyStepProps) => {
  const specialties = [
    { name: "Cardiologia", icon: "❤️", color: "red" },
    { name: "Neurologia", icon: "🧠", color: "purple" },
    { name: "Oftalmologia", icon: "👁️", color: "blue" },
    { name: "Ortopedia", icon: "🦴", color: "orange" },
    { name: "Pediatria", icon: "👶", color: "pink" },
    { name: "Clínica Geral", icon: "🩺", color: "green" },
  ];

  const handleSpecialtySelect = (specialty: string) => {
    onUpdate({ specialty });
  };

  return (
    <div className="specialty-step">
      <div className="step-header">
        <h2 className="step-title">Escolha a especialidade</h2>
        <p className="step-subtitle">
          Selecione a área médica para sua consulta
        </p>
      </div>

      <div className="specialties-grid">
        {specialties.map((specialty) => {
          const isSelected = data.specialty === specialty.name;

          return (
            <button
              key={specialty.name}
              onClick={() => handleSpecialtySelect(specialty.name)}
              className={`specialty-card ${isSelected ? "selected" : ""}`}
            >
              <div className="specialty-content">
                <div className={`specialty-icon ${specialty.color}`}>
                  {specialty.icon}
                </div>
                <span className="specialty-name">{specialty.name}</span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="step-actions">
        <button
          onClick={onNext}
          disabled={!data.specialty}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
