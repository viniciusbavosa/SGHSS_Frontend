import type { BookingData } from "../modal/booking-modal";

interface PersonalInfoStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const PersonalInfoStep = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}: PersonalInfoStepProps) => {
  const handleInputChange = (field: keyof BookingData, value: string) => {
    onUpdate({ [field]: value });
  };

  const isFormValid = data.name && data.email && data.phone && data.cpf;

  return (
    <div className="personal-info-step">
      <div className="step-header">
        <h2 className="step-title">Dados pessoais</h2>
        <p className="step-subtitle">
          Preencha suas informações para finalizar o agendamento
        </p>
      </div>

      <div className="form-fields">
        <div className="form-field">
          <label htmlFor="name" className="form-label">
            <span className="label-icon">👤</span>
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            placeholder="Digite seu nome completo"
            value={data.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="email" className="form-label">
            <span className="label-icon">📧</span>
            E-mail
          </label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={data.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone" className="form-label">
            <span className="label-icon">📞</span>
            Telefone
          </label>
          <input
            id="phone"
            type="tel"
            placeholder="(11) 99999-9999"
            value={data.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-field">
          <label htmlFor="cpf" className="form-label">
            <span className="label-icon">💳</span>
            CPF
          </label>
          <input
            id="cpf"
            type="text"
            placeholder="000.000.000-00"
            value={data.cpf}
            onChange={(e) => handleInputChange("cpf", e.target.value)}
            className="form-input"
          />
        </div>
      </div>

      <div className="info-notice">
        <p className="notice-text">
          <strong>Importante:</strong> Seus dados são protegidos e utilizados
          apenas para fins de agendamento médico.
        </p>
      </div>

      <div className="step-actions">
        <button onClick={onPrevious} className="btn-secondary">
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!isFormValid}
          className="btn-primary"
        >
          Finalizar
        </button>
      </div>
    </div>
  );
};
