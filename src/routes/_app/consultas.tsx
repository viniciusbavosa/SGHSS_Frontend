import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";
import { useState } from "react";
import { BookingModal } from "../../components/modal/booking-modal";
import LogoIcon from "../../components/logo-icon/logo";
import { Button } from "../../components/button/button";
import { useModalContext } from "../../hooks/useModalContext/useModalContext";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Search } from "../../components/icons/search/search";

const consultas = [
  {
    id: 1,
    doctor: "Dra. Ana Silva",
    specialty: "Cardiologia",
    initials: "DAS",
    date: "15/07/2023",
    time: "14:30",
    location: "Consultório 201",
    status: "Confirmada",
    statusColor: "confirmed",
  },
  {
    id: 2,
    doctor: "Dr. Roberto Mendes",
    specialty: "Ortopedia",
    initials: "DRM",
    date: "22/07/2023",
    time: "10:15",
    location: "Consultório 105",
    status: "Pendente",
    statusColor: "pending",
  },
];

export const Route = createFileRoute("/_app/consultas")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [searchTerm, setSearchTerm] = useState("");

  const modal = useModalContext();

  const filteredConsultas = consultas.filter(
    (consulta) =>
      consulta.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consulta.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="consultas-page">
        <div className="consultas-header">
          <div className="header-left">
            <h1 className="page-title">Minhas Consultas</h1>
          </div>
          <div className="logo__wrapper">
            <LogoIcon width="45" height="45" />
            <h1 className="auth__logo">VidaPlus</h1>
          </div>
        </div>

        <div className="consultas-controls">
          <div className="search-container">
            <div className="search-icon">
              <Search />
            </div>
            <input
              type="text"
              placeholder="Buscar consultas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="bttn__wrapper">
            <Button text="Buscar" className="buscar-btn" />
            <Button
              text="Agendar"
              className="agendar-btn"
              onClick={() => modal.setIsModalOpen(true)}
            />
          </div>
        </div>

        <div className="consultas-list">
          {filteredConsultas.map((consulta) => (
            <div key={consulta.id} className="consulta-card">
              <div className="consulta-left">
                <div className="doctor-avatar">
                  <span className="doctor-initials">{consulta.initials}</span>
                </div>
                <div className="consulta-info">
                  <h3 className="doctor-name">{consulta.doctor}</h3>
                  <p className="doctor-specialty">{consulta.specialty}</p>
                  <div className="consulta-details">
                    <div className="detail-item">
                      <span className="detail-icon">
                        <Calendar />
                      </span>
                      <span className="detail-text">
                        {consulta.date} • {consulta.time}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-text">{consulta.location}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="consulta-right">
                <div className={`status-badge ${consulta.statusColor}`}>
                  {consulta.status}
                </div>
                <button className="cancelar-btn">Cancelar Consulta</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal
        isOpen={modal.isModalOpen}
        onClose={() => modal.setIsModalOpen(false)}
      />
    </>
  );
}
