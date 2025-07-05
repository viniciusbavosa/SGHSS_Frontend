import { createFileRoute } from "@tanstack/react-router";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Check } from "../../components/icons/check/check";
import { Clock } from "../../components/icons/clock/clock";
import { Document } from "../../components/icons/document/document";
import LogoIcon from "../../components/logo-icon/logo";
import { useState, type ReactNode } from "react";
import { Report } from "../../components/icons/report/report";
import { Blood } from "../../components/icons/blood/blood";
import { Search } from "../../components/icons/search/search";
import { Brain } from "../../components/icons/brain/brain";
import { Statistic } from "../../components/icons/statistic/statistic";
import { Ultrasom } from "../../components/icons/ultrasom/ultra";

export const Route = createFileRoute("/_app/exames")({
  component: Exames,
});

const examesData = [
  {
    id: 1,
    nome: "Hemograma Completo",
    tipo: "Sangue",
    medico: "Dr. Carlos Mendes",
    data: "15/07/2025",
    horario: "08:00",
    status: "Agendado",
    laboratorio: "Laboratório Central",
    observacoes: "Jejum de 12 horas necessário",
    icon: <Blood />,
  },
  {
    id: 2,
    nome: "Eletrocardiograma",
    tipo: "Cardiológico",
    medico: "Dra. Ana Silva",
    data: "12/07/2025",
    horario: "14:30",
    status: "Concluído",
    laboratorio: "Clínica do Coração",
    resultado: "Ritmo sinusal normal. Sem alterações significativas.",
    icon: <Statistic />,
  },
  {
    id: 3,
    nome: "Ressonância Magnética",
    tipo: "Imagem",
    medico: "Dr. Roberto Santos",
    data: "20/07/2025",
    horario: "16:00",
    status: "Agendado",
    laboratorio: "Centro de Diagnóstico",
    observacoes: "Retirar objetos metálicos. Contraste será utilizado.",
    icon: <Brain />,
  },
  {
    id: 4,
    nome: "Ultrassom Abdominal",
    tipo: "Imagem",
    medico: "Dra. Maria Santos",
    data: "10/07/2025",
    horario: "10:00",
    status: "Pendente",
    laboratorio: "Clínica Vida",
    observacoes: "Jejum de 8 horas e bexiga cheia",
    icon: <Ultrasom />,
  },
  {
    id: 5,
    nome: "Glicemia de Jejum",
    tipo: "Sangue",
    medico: "Dr. Fernando Lima",
    data: "08/07/2025",
    horario: "07:30",
    status: "Concluído",
    laboratorio: "Laboratório Central",
    resultado: "Glicemia: 95 mg/dL - Valor normal",
    icon: <Blood />,
  },
];

const estatisticas = {
  total: examesData.length,
  agendados: examesData.filter((e) => e.status === "Agendado").length,
  concluidos: examesData.filter((e) => e.status === "Concluído").length,
  pendentes: examesData.filter((e) => e.status === "Pendente").length,
};

export function Exames() {
  const [activeTab, setActiveTab] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExames = examesData.filter((exame) => {
    const matchesSearch =
      exame.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exame.medico.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exame.tipo.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "todos") return matchesSearch;
    return (
      matchesSearch && exame.status.toLowerCase() === activeTab.toLowerCase()
    );
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "agendado":
        return "agendado";
      case "concluído":
        return "concluido";
      case "pendente":
        return "pendente";
      default:
        return "pendente";
    }
  };

  const getActionButton = (
    exame:
      | {
          id: number;
          nome: string;
          tipo: string;
          medico: string;
          data: string;
          horario: string;
          status: string;
          laboratorio: string;
          observacoes: string;
          icon: ReactNode;
          resultado?: undefined;
        }
      | {
          id: number;
          nome: string;
          tipo: string;
          medico: string;
          data: string;
          horario: string;
          status: string;
          laboratorio: string;
          resultado: string;
          icon: ReactNode;
          observacoes?: undefined;
        }
  ) => {
    switch (exame.status.toLowerCase()) {
      case "concluído":
        return (
          <button className="action-btn download">Baixar Resultado</button>
        );
      case "agendado":
        return <button className="action-btn cancel">Cancelar</button>;
      case "pendente":
        return <button className="action-btn">Agendar</button>;
      default:
        return null;
    }
  };

  return (
    <div className="exames-page">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Meus Exames</h1>
        <div className="logo__wrapper">
          <LogoIcon width="45" height="45" />
          <h1 className="auth__logo">VidaPlus</h1>
        </div>
      </header>

      <div className="exames-stats">
        <div className="stat-card">
          <div className="icon-bg">
            <Document />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.total}</h3>
            <p className="stat-label">Total de Exames</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-bg">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.agendados}</h3>
            <p className="stat-label">Agendados</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-bg">
            <Check />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.concluidos}</h3>
            <p className="stat-label">Concluídos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="icon-bg">
            <Clock />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.pendentes}</h3>
            <p className="stat-label">Pendentes</p>
          </div>
        </div>
      </div>

      <div className="exames-tabs">
        <button
          className={`tab-btn ${activeTab === "todos" ? "active" : ""}`}
          onClick={() => setActiveTab("todos")}
        >
          <span className="tab-icon">
            <Report />
          </span>
          Todos
        </button>
        <button
          className={`tab-btn ${activeTab === "agendado" ? "active" : ""}`}
          onClick={() => setActiveTab("agendado")}
        >
          <span className="tab-icon">
            <Calendar />
          </span>
          Agendados
        </button>
        <button
          className={`tab-btn ${activeTab === "concluído" ? "active" : ""}`}
          onClick={() => setActiveTab("concluído")}
        >
          <span className="tab-icon">
            <Check />
          </span>
          Concluídos
        </button>
        <button
          className={`tab-btn ${activeTab === "pendente" ? "active" : ""}`}
          onClick={() => setActiveTab("pendente")}
        >
          <span className="tab-icon">
            <Clock />
          </span>
          Pendentes
        </button>
      </div>

      <div className="exames-controls">
        <div className="search-container">
          <div className="search-icon">
            <Search />
          </div>
          <input
            type="text"
            placeholder="Buscar exames..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="solicitar-btn">Solicitar Exame</button>
      </div>

      <div className="exames-list">
        {filteredExames.length > 0 ? (
          filteredExames.map((exame) => (
            <div
              key={exame.id}
              className={`exame-card ${getStatusColor(exame.status)}`}
            >
              <div className="card-left">
                <div className="icon-bg">
                  <span>{exame.icon}</span>
                </div>
                <div className="exame-info">
                  <div className="exame-header">
                    <h3 className="exame-title">{exame.nome}</h3>
                    <span className="exame-type-badge">{exame.tipo}</span>
                  </div>
                  <p className="medico-solicitante">
                    Solicitado por: {exame.medico}
                  </p>
                  <div className="exame-datetime">
                    <span className="datetime-icon">
                      <Calendar />
                    </span>
                    <span>
                      {exame.data} • {exame.horario}
                    </span>
                  </div>
                  <div className="exame-details">
                    <div className="detail-section">
                      <strong>Local:</strong>
                      <p>{exame.laboratorio}</p>
                    </div>
                    {exame.observacoes && (
                      <div className="detail-section">
                        <strong>Observações:</strong>
                        <p>{exame.observacoes}</p>
                      </div>
                    )}
                    {exame.resultado && (
                      <div className="detail-section">
                        <strong>Resultado:</strong>
                        <p>{exame.resultado}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="card-right">
                <div className={`status-badge ${getStatusColor(exame.status)}`}>
                  {exame.status}
                </div>
                {getActionButton(exame)}
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔬</div>
            <h3>Nenhum exame encontrado</h3>
            <p>Não há exames que correspondam aos filtros selecionados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
