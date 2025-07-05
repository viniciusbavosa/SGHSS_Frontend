import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";
import LogoIcon from "../../components/logo-icon/logo";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Pacient } from "../../components/icons/pacient/pacient";
import { Video } from "../../components/icons/video/video";
import { Exames } from "../../components/icons/exames/exames";
import { Statistic } from "../../components/icons/statistic/statistic";
import { Document } from "../../components/icons/document/document";
import { Notification } from "../../components/icons/notification/notification";
import { Star } from "../../components/icons/star/star";

export const Route = createFileRoute("/doctor/dashboard")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: MedicoDashboard,
});

function MedicoDashboard() {
  const consultasHoje = [
    {
      id: 1,
      paciente: "João da Silva",
      horario: "09:00",
      tipo: "Consulta de rotina",
      status: "Confirmada",
      avatar: "JS",
    },
    {
      id: 2,
      paciente: "Maria Santos",
      horario: "10:30",
      tipo: "Retorno",
      status: "Confirmada",
      avatar: "MS",
    },
    {
      id: 3,
      paciente: "Carlos Oliveira",
      horario: "14:00",
      tipo: "Primeira consulta",
      status: "Pendente",
      avatar: "CO",
    },
    {
      id: 4,
      paciente: "Ana Costa",
      horario: "15:30",
      tipo: "Teleconsulta",
      status: "Confirmada",
      avatar: "AC",
    },
  ];

  const proximosExames = [
    {
      id: 1,
      paciente: "Pedro Almeida",
      exame: "Eletrocardiograma",
      data: "02/07/2025",
      horario: "08:00",
    },
    {
      id: 2,
      paciente: "Lucia Ferreira",
      exame: "Ecocardiograma",
      data: "03/07/2025",
      horario: "14:30",
    },
  ];

  const estatisticas = {
    consultasHoje: 4,
    pacientesAtendidos: 127,
    teleconsultas: 23,
    avaliacaoMedia: 4.8,
  };

  return (
    <div className="medico-dashboard">
      <header className="dashboard__header">
        <h1 className="dashboard__title">Dashboard</h1>
        <div className="logo__wrapper">
          <LogoIcon width="45" height="45" />
          <h1 className="auth__logo">VidaPlus</h1>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.consultasHoje}</h3>
            <p className="stat-label">Consultas Hoje</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Pacient />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.pacientesAtendidos}</h3>
            <p className="stat-label">Pacientes Atendidos</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Video />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.teleconsultas}</h3>
            <p className="stat-label">Teleconsultas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <Star />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticas.avaliacaoMedia}</h3>
            <p className="stat-label">Avaliação Média</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card agenda-card">
          <div className="card-header">
            <h2 className="card-title">Agenda de Hoje</h2>
            <button className="add-btn">+</button>
          </div>
          <div className="card-content">
            <div className="consultas-list">
              {consultasHoje.map((consulta) => (
                <div key={consulta.id} className="consulta-item">
                  <div className="consulta-left">
                    <div className="patient-avatar">
                      <span>{consulta.avatar}</span>
                    </div>
                    <div className="consulta-info">
                      <h4 className="patient-name">{consulta.paciente}</h4>
                      <p className="consulta-tipo">{consulta.tipo}</p>
                    </div>
                  </div>
                  <div className="consulta-right">
                    <span className="consulta-horario">{consulta.horario}</span>
                    <span
                      className={`status-badge ${consulta.status.toLowerCase()}`}
                    >
                      {consulta.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Próximos Exames</h2>
          </div>
          <div className="card-content">
            <div className="exames-list">
              {proximosExames.map((exame) => (
                <div key={exame.id} className="exame-item">
                  <div className="exame-info">
                    <h4 className="patient-name">{exame.paciente}</h4>
                    <p className="exame-tipo">{exame.exame}</p>
                    <span className="exame-data">
                      {exame.data} • {exame.horario}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ações Rápidas</h2>
          </div>
          <div className="card-content">
            <div className="quick-actions">
              <button className="action-btn">
                <span className="action-icon">
                  <Document />
                </span>
                <span>Nova Prescrição</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">
                  <Exames />
                </span>
                <span>Solicitar Exame</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">
                  <Video />
                </span>
                <span>Teleconsulta</span>
              </button>
              <button className="action-btn">
                <span className="action-icon">
                  <Statistic />
                </span>
                <span>Relatórios</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Notificações</h2>
          </div>
          <div className="card-content">
            <div className="notifications-list">
              <div className="notification-item">
                <div className="notification-icon">
                  <Notification />
                </div>
                <div className="notification-content">
                  <p>Resultado de exame disponível</p>
                  <span className="notification-time">há 2 horas</span>
                </div>
              </div>
              <div className="notification-item">
                <div className="notification-icon">
                  <Calendar />
                </div>
                <div className="notification-content">
                  <p>Consulta reagendada</p>
                  <span className="notification-time">há 4 horas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
