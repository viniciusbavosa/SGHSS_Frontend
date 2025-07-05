import { useState } from "react";
import type { BookingData } from "../modal/booking-modal";

interface DateTimeStepProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const DateTimeStep = ({
  data,
  onUpdate,
  onNext,
  onPrevious,
}: DateTimeStepProps) => {
  const [selectedDate, setSelectedDate] = useState(data.date);
  const [selectedTime, setSelectedTime] = useState(data.time);

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        month: date.toLocaleDateString("pt-BR", { month: "short" }),
        weekday: date.toLocaleDateString("pt-BR", { weekday: "short" }),
      });
    }
    return dates;
  };

  const availableTimes = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
  ];

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    onUpdate({ date });
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onUpdate({ time });
  };

  return (
    <div className="datetime-step">
      <div className="step-header">
        <h2 className="step-title">Escolha data e horário</h2>
        <p className="step-subtitle">
          {data.doctor} - {data.specialty}
        </p>
      </div>

      <div className="date-section">
        <div className="section-header">
          <span className="section-icon">📅</span>
          <h3 className="section-title">Selecione a data</h3>
        </div>
        <div className="dates-grid">
          {getAvailableDates().map((dateObj) => (
            <button
              key={dateObj.date}
              onClick={() => handleDateSelect(dateObj.date)}
              className={`date-card ${
                selectedDate === dateObj.date ? "selected" : ""
              }`}
            >
              <div className="date-weekday">{dateObj.weekday}</div>
              <div className="date-day">{dateObj.day}</div>
              <div className="date-month">{dateObj.month}</div>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && (
        <div className="time-section">
          <div className="section-header">
            <span className="section-icon">🕒</span>
            <h3 className="section-title">Selecione o horário</h3>
          </div>
          <div className="times-grid">
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => handleTimeSelect(time)}
                className={`time-card ${
                  selectedTime === time ? "selected" : ""
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="step-actions">
        <button onClick={onPrevious} className="btn-secondary">
          Voltar
        </button>
        <button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          className="btn-primary"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};
