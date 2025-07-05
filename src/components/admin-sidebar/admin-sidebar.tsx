import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Dashboard } from "../icons/dashboard/dashboard";
import { Avatar } from "../icons/avatar/avatar";
import { Report } from "../icons/report/report";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function AdminSidebar() {
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
      id: "cadastros",
      label: "Cadastros",
      icon: <Icon icon={"mage:users"} />,
      to: "/cadastros",
    },
    {
      id: "internacoes",
      label: "Internações",
      icon: <Icon icon={"mingcute:bed-fill"} />,
      to: "/internacoes",
    },
    {
      id: "relatorios",
      label: "Relatórios",
      icon: <Report />,
      to: "/relatorios",
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
              <Avatar />
            </span>
          </div>
        </div>
        <div className="user-info">
          <h3 className="user-name">Administrador</h3>
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
              item.id === "cadastros" ||
              item.id === "internacoes" ||
              item.id === "relatorios"
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
