import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useModalContext } from "../../hooks/useModalContext/useModalContext";
import { Calendar } from "../icons/calendar/calendar";
import { Dashboard } from "../icons/dashboard/dashboard";
import { Document } from "../icons/document/document";
import { Video } from "../icons/video/video";
import { Avatar } from "../icons/avatar/avatar";
import { Exames } from "../icons/exames/exames";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  const modal = useModalContext();

  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Dashboard />,
      to: "/dashboard",
    },
    {
      id: "consultas",
      label: "Consultas",
      icon: <Calendar />,
      to: "/consultas",
    },
    {
      id: "exames",
      label: "Exames",
      icon: <Exames />,
      to: "/exames",
    },
    {
      id: "historico",
      label: "Histórico",
      icon: <Document />,
      to: "/historico-medico",
    },
    {
      id: "teleconsulta",
      label: "Teleconsulta",
      icon: <Video />,
      to: "/teleconsultas",
    },
  ];

  const handleNavigate = (item_id: string, url: string) => {
    setActiveItem(item_id);
    navigate({ to: url });
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate({ reloadDocument: true });
  };

  const handleAppointment = () => {
    navigate({ to: "/consultas" });
    modal.setIsModalOpen(true);
  };

  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="avatar">
          <div className="avatar-circle">
            <span className="avatar-icon">
              <Avatar />
            </span>
          </div>
        </div>
        <div className="user-info">
          <h3 className="user-name">João da Silva</h3>
          <button className="config-link">Configurações</button>
          <button className="config-link" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
            onClick={() => handleNavigate(item.id, item.to)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="schedule-btn" onClick={handleAppointment}>
          Agendar Consulta
        </button>
      </div>
    </div>
  );
}
