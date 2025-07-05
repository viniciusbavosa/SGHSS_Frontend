import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import LogoIcon from "../../components/logo-icon/logo";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Clock } from "../../components/icons/clock/clock";
import { Video } from "../../components/icons/video/video";
import { Document } from "../../components/icons/document/document";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Route = createFileRoute("/_app/teleconsultas")({
  component: Teleconsulta,
});

const availableSlots = [
  {
    id: 1,
    doctor: "Dra. Ana Silva",
    specialty: "Cardiologia",
    date: "15/07/2025",
    time: "14:30",
    available: true,
  },
  {
    id: 2,
    doctor: "Dr. Roberto Mendes",
    specialty: "Ortopedia",
    date: "16/07/2025",
    time: "10:00",
    available: true,
  },
  {
    id: 3,
    doctor: "Dra. Maria Santos",
    specialty: "Endocrinologia",
    date: "17/07/2025",
    time: "16:00",
    available: true,
  },
  {
    id: 4,
    doctor: "Dr. João Costa",
    specialty: "Neurologia",
    date: "18/07/2025",
    time: "09:30",
    available: false,
  },
];

const scheduledCalls = [
  {
    id: 1,
    doctor: "Dra. Ana Silva",
    specialty: "Cardiologia",
    date: "15/07/2025",
    time: "14:30",
    status: "Confirmada",
    meetingLink: "https://meet.vidaplus.com/room/abc123",
    notes: "Consulta de acompanhamento pós-cirúrgico",
  },
  {
    id: 2,
    doctor: "Dr. Carlos Mendes",
    specialty: "Clínico Geral",
    date: "20/07/2025",
    time: "10:00",
    status: "Pendente",
    meetingLink: null,
    notes: "Consulta de rotina - renovação de receitas",
  },
];
function Teleconsulta() {
  const [activeTab, setActiveTab] = useState("agendar");
  return (
    <div className="teleconsulta-page">
      <div className="teleconsulta-header">
        <div className="header-left">
          <h1 className="page-title">Teleconsulta</h1>
        </div>
        <div className="logo__wrapper">
          <LogoIcon width="45" height="45" />
          <h1 className="auth__logo">VidaPlus</h1>
        </div>
      </div>

      <div className="teleconsulta-tabs">
        <button
          className={`tab-btn ${activeTab === "agendar" ? "active" : ""}`}
          onClick={() => setActiveTab("agendar")}
        >
          <span className="tab-icon">
            <Calendar />
          </span>
          Agendar Consulta
        </button>
        <button
          className={`tab-btn ${activeTab === "minhas" ? "active" : ""}`}
          onClick={() => setActiveTab("minhas")}
        >
          <span className="tab-icon">
            <Video />
          </span>
          Minhas Teleconsultas
        </button>
      </div>

      {activeTab === "agendar" && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Horários Disponíveis</h2>
            <p>Selecione um horário disponível para sua teleconsulta</p>
          </div>

          <div className="available-slots">
            {availableSlots.map((slot) => (
              <div
                key={slot.id}
                className={`slot-card ${!slot.available ? "unavailable" : ""}`}
              >
                <div className="slot-info">
                  <div className="doctor-info">
                    <div className="doctor-avatar">
                      <span className="doctor-initials">
                        {slot.doctor
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h3 className="doctor-name">{slot.doctor}</h3>
                      <p className="doctor-specialty">{slot.specialty}</p>
                    </div>
                  </div>
                  <div className="slot-datetime">
                    <div className="datetime-item">
                      <span className="datetime-icon">
                        <Calendar />
                      </span>
                      <span>{slot.date}</span>
                    </div>
                    <div className="datetime-item">
                      <span className="datetime-icon">
                        <Clock />
                      </span>
                      <span>{slot.time}</span>
                    </div>
                  </div>
                </div>
                <div className="slot-actions">
                  {slot.available ? (
                    <>
                      <div className="availability-badge available">
                        Disponível
                      </div>
                      <button className="schedule-slot-btn">Agendar</button>
                    </>
                  ) : (
                    <>
                      <div className="availability-badge unavailable">
                        Indisponível
                      </div>
                      <button className="schedule-slot-btn" disabled>
                        Ocupado
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "minhas" && (
        <div className="tab-content">
          <div className="section-header">
            <h2>Suas Teleconsultas</h2>
            <p>Gerencie suas consultas online agendadas</p>
          </div>

          <div className="scheduled-calls">
            {scheduledCalls.map((call) => (
              <div key={call.id} className="call-card">
                <div className="call-info">
                  <div className="call-header">
                    <div className="doctor-info">
                      <div className="doctor-avatar">
                        <span className="doctor-initials">
                          {call.doctor
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h3 className="doctor-name">{call.doctor}</h3>
                        <p className="doctor-specialty">{call.specialty}</p>
                      </div>
                    </div>
                    <div
                      className={`call-status-badge ${call.status.toLowerCase()}`}
                    >
                      {call.status}
                    </div>
                  </div>

                  <div className="call-details">
                    <div className="detail-row">
                      <span className="detail-icon">
                        <Calendar />
                      </span>
                      <span className="detail-text">
                        {call.date} • {call.time}
                      </span>
                    </div>
                    {call.notes && (
                      <div className="detail-row">
                        <span className="detail-icon">
                          <Document />
                        </span>
                        <span className="detail-text">{call.notes}</span>
                      </div>
                    )}
                    {call.meetingLink && (
                      <div className="detail-row">
                        <span className="detail-icon">
                          <Icon icon={"mdi-light:link"} />
                        </span>
                        <span className="detail-text">
                          Link da reunião disponível
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="call-actions">
                  {call.status === "Confirmada" && call.meetingLink ? (
                    <button className="join-call-btn">Entrar na Chamada</button>
                  ) : (
                    <button className="join-call-btn" disabled>
                      Aguardando Confirmação
                    </button>
                  )}
                  <button className="cancel-call-btn">Cancelar</button>
                </div>
              </div>
            ))}
          </div>

          <div className="teleconsulta-info">
            <div className="info-card">
              <div className="info-icon">💡</div>
              <div className="info-content">
                <h3>Como funciona a Teleconsulta?</h3>
                <ul>
                  <li>
                    Agende sua consulta online com o médico de sua preferência
                  </li>
                  <li>
                    Receba o link da videochamada por email após a confirmação
                  </li>
                  <li>Entre na chamada no horário agendado</li>
                  <li>Tenha sua consulta médica no conforto de casa</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
