import { Doctor } from "../icons/doctor/doctor";
import type { BookingData } from "../modal/booking-modal";

interface DoctorStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DoctorStep = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}: DoctorStepProps) => {
  const doctors = [
    {
      name: "Dr. João Silva",
      crm: "CRM 12345-SP",
      rating: 4.9,
      reviews: 127,
      location: "Centro Médico São Paulo",
      experience: "15 anos de experiência",
    },
    {
      name: "Dra. Maria Santos",
      crm: "CRM 67890-SP",
      rating: 4.8,
      reviews: 98,
      location: "Hospital Santa Clara",
      experience: "12 anos de experiência",
    },
    {
      name: "Dr. Carlos Oliveira",
      crm: "CRM 11111-SP",
      rating: 4.9,
      reviews: 156,
      location: "Clínica Médica Central",
      experience: "20 anos de experiência",
    },
  ];

  const handleDoctorSelect = (doctor: string) => {
    onUpdate({ doctor });
  };

  return (
    <div className="doctor-step">
      <div className="step-header">
        <h2 className="step-title">Escolha o médico</h2>
        <p className="step-subtitle">Especialidade: {data.specialty}</p>
      </div>

      <div className="doctors-list">
        {doctors.map((doctor) => {
          const isSelected = data.doctor === doctor.name;

          return (
            <button
              key={doctor.name}
              onClick={() => handleDoctorSelect(doctor.name)}
              className={`doctor-card ${isSelected ? "selected" : ""}`}
            >
              <div className="doctor-content">
                <div className="doctor-avatar">
                  <Doctor />
                </div>
                <div className="doctor-info">
                  <div className="doctor-header">
                    <h3 className="doctor-name">{doctor.name}</h3>
                    <div className="doctor-rating">
                      <span className="star">⭐</span>
                      <span className="rating-value">{doctor.rating}</span>
                      <span className="rating-count">({doctor.reviews})</span>
                    </div>
                  </div>
                  <p className="doctor-crm">{doctor.crm}</p>
                  <p className="doctor-experience">{doctor.experience}</p>
                  <div className="doctor-location">
                    <span className="location-icon">📍</span>
                    {doctor.location}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="step-actions">
        <button onClick={onPrevious} className="btn-secondary">
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!data.doctor}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
