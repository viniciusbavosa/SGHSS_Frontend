import type { BookingData } from "../modal/booking-modal";

interface ConfirmationStepProps {
  data: BookingData;
  onPrevious: () => void;
  onClose: () => void;
}

export const ConfirmationStep = ({
  data,
  onPrevious,
  onClose,
}: ConfirmationStepProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirm = () => {
    console.log("Booking confirmed:", data);
    onClose();
  };

  return (
    <div className="confirmation-step">
      <div className="step-header">
        <div className="success-icon">✅</div>
        <h2 className="step-title">Confirme seu agendamento</h2>
        <p className="step-subtitle">
          Revise os dados antes de confirmar sua consulta
        </p>
      </div>

      <div className="booking-summary">
        <div className="summary-item">
          <div className="summary-icon">👨‍⚕️</div>
          <div className="summary-content">
            <h4 className="summary-title">Médico</h4>
            <p className="summary-text">{data.doctor}</p>
            <p className="summary-subtext">{data.specialty}</p>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">📅</div>
          <div className="summary-content">
            <h4 className="summary-title">Data</h4>
            <p className="summary-text">{formatDate(data.date)}</p>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">🕒</div>
          <div className="summary-content">
            <h4 className="summary-title">Horário</h4>
            <p className="summary-text">{data.time}</p>
          </div>
        </div>

        <div className="summary-item">
          <div className="summary-icon">👤</div>
          <div className="summary-content">
            <h4 className="summary-title">Paciente</h4>
            <p className="summary-text">{data.name}</p>
            <p className="summary-subtext">{data.email}</p>
            <p className="summary-subtext">{data.phone}</p>
          </div>
        </div>
      </div>

      <div className="confirmation-notice">
        <p className="notice-text">
          Após a confirmação, você receberá um e-mail com os detalhes da
          consulta e instruções para comparecimento.
        </p>
      </div>

      <div className="step-actions">
        <button onClick={onPrevious} className="btn-secondary">
          Voltar
        </button>
        <button onClick={handleConfirm} className="btn-confirm">
          Confirmar Agendamento
        </button>
      </div>
    </div>
  );
};
