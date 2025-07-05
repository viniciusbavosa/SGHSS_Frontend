import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Dashboard } from "../icons/dashboard/dashboard";
import { Pacient } from "../icons/pacient/pacient";
import { Report } from "../icons/report/report";
import { Doctor } from "../icons/doctor/doctor";

export default function DoctorSidebar() {
  const [activeItem] = useState("dashboard");

  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Dashboard />,
      to: "/dashboard",
    },
    {
      id: "pacientes",
      label: "Pacientes",
      icon: <Pacient />,
      to: "/pacientes",
    },
    {
      id: "prontuarios",
      label: "Prontuarios",
      icon: <Report />,
      to: "/exames",
    },
  ];

  const handleLogout = () => {
    sessionStorage.clear();
    navigate({ reloadDocument: true });
  };
  return (
    <div className="sidebar">
      <div className="user-profile">
        <div className="avatar">
          <div className="avatar-circle">
            <span className="avatar-icon">
              <Doctor />
            </span>
          </div>
        </div>
        <div className="user-info">
          <h3 className="user-name">Bem-vindo, Dr. Pedro</h3>
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
            title={
              item.id === "pacientes" || item.id === "prontuarios"
                ? "Área em desenvolvimento"
                : "Dashboard"
            }
            id={`${item.id}`}
            className={`nav-item ${activeItem === item.id ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
