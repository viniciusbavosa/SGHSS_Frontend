import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";
import { useState } from "react";
import LogoIcon from "../../components/logo-icon/logo";
import { Doctor } from "../../components/icons/doctor/doctor";
import { Document } from "../../components/icons/document/document";
import { Statistic } from "../../components/icons/statistic/statistic";
import { Search } from "../../components/icons/search/search";
import { Calendar } from "../../components/icons/calendar/calendar";

export const Route = createFileRoute("/_app/historico-medico")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: Historico,
});

const historicoItems = [
  {
    id: 1,
    type: "consulta",
    doctor: "Dr. Carlos Mendes",
    specialty: "Cardiologia",
    date: "10/06/2023",
    time: "14:30",
    status: "Concluída",
    diagnosis: "Consulta de rotina - Pressão arterial normal",
    prescriptions: [
      "Losartana 50mg - 1x ao dia",
      "Ácido acetilsalicílico 100mg - 1x ao dia",
    ],
    icon: <Doctor />,
  },
  {
    id: 2,
    type: "exame",
    name: "Hemograma Completo",
    date: "05/06/2023",
    time: "08:00",
    status: "Resultado disponível",
    result: "Valores dentro da normalidade",
    lab: "Laboratório Central",
    icon: <Document />,
  },
  {
    id: 3,
    type: "consulta",
    doctor: "Dra. Ana Silva",
    specialty: "Endocrinologia",
    date: "28/05/2023",
    time: "16:00",
    status: "Concluída",
    diagnosis: "Controle de diabetes - Glicemia controlada",
    prescriptions: [
      "Metformina 850mg - 2x ao dia",
      "Glicazida 30mg - 1x ao dia",
    ],
    icon: <Doctor />,
  },
  {
    id: 4,
    type: "exame",
    name: "Eletrocardiograma",
    date: "20/05/2023",
    time: "10:30",
    status: "Resultado disponível",
    result: "Ritmo sinusal normal",
    lab: "Clínica do Coração",
    icon: <Statistic />,
  },
];

function Historico() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("todos");

  const filteredItems = historicoItems.filter((item) => {
    const matchesSearch =
      item.doctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "todos" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });
  return (
    <div className="historico-page">
      <div className="historico-header">
        <div className="header-left">
          <h1 className="page-title">Histórico Médico</h1>
        </div>
        <div className="logo__wrapper">
          <LogoIcon width="45" height="45" />
          <h1 className="auth__logo">VidaPlus</h1>
        </div>
      </div>

      <div className="historico-controls">
        <div className="search-container">
          <div className="search-icon">
            <Search />
          </div>
          <input
            type="text"
            placeholder="Buscar no histórico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filterType === "todos" ? "active" : ""}`}
            onClick={() => setFilterType("todos")}
          >
            Todos
          </button>
          <button
            className={`filter-btn ${
              filterType === "consulta" ? "active" : ""
            }`}
            onClick={() => setFilterType("consulta")}
          >
            Consultas
          </button>
          <button
            className={`filter-btn ${filterType === "exame" ? "active" : ""}`}
            onClick={() => setFilterType("exame")}
          >
            Exames
          </button>
        </div>
      </div>

      <div className="historico-list">
        {filteredItems.map((item) => (
          <div key={item.id} className={`historico-card ${item.type}`}>
            <div className="card-left">
              <div className="item-icon">
                <span>{item.icon}</span>
              </div>
              <div className="item-info">
                <div className="item-header">
                  <h3 className="item-title">
                    {item.type === "consulta" ? item.doctor : item.name}
                  </h3>
                  <span className="item-type-badge">
                    {item.type === "consulta" ? "Consulta" : "Exame"}
                  </span>
                </div>
                {item.specialty && (
                  <p className="item-specialty">{item.specialty}</p>
                )}
                {item.lab && <p className="item-lab">{item.lab}</p>}
                <div className="item-datetime">
                  <span className="datetime-icon">
                    <Calendar />
                  </span>
                  <span>
                    {item.date} • {item.time}
                  </span>
                </div>
                <div className="item-details">
                  {item.diagnosis && (
                    <div className="detail-section">
                      <strong>Diagnóstico:</strong>
                      <p>{item.diagnosis}</p>
                    </div>
                  )}
                  {item.result && (
                    <div className="detail-section">
                      <strong>Resultado:</strong>
                      <p>{item.result}</p>
                    </div>
                  )}
                  {item.prescriptions && (
                    <div className="detail-section">
                      <strong>Prescrições:</strong>
                      <ul>
                        {item.prescriptions.map((prescription, index) => (
                          <li key={index}>{prescription}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="card-right">
              <div className="status-badge completed">{item.status}</div>
              <button className="view-details-btn">Ver Detalhes</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
