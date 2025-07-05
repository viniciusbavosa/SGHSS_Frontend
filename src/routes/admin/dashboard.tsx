import { createFileRoute, redirect } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";
import LogoIcon from "../../components/logo-icon/logo";
import { Doctor } from "../../components/icons/doctor/doctor";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Money } from "../../components/icons/money/money";
import { Pacient } from "../../components/icons/pacient/pacient";
import { Refresh } from "../../components/icons/refresh/refresh";
import { Report } from "../../components/icons/report/report";
import { Icon } from "@iconify/react/dist/iconify.js";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: AdminDashboard,
});

const estatisticasGerais = {
  totalPacientes: 1247,
  totalMedicos: 23,
  consultasHoje: 47,
  faturamentoMes: "R$ 125.430",
};

const medicosMaisAtivos = [
  {
    nome: "Dr. Carlos Mendes",
    especialidade: "Cardiologia",
    consultas: 89,
    avatar: "CM",
  },
  {
    nome: "Dra. Ana Silva",
    especialidade: "Endocrinologia",
    consultas: 76,
    avatar: "AS",
  },
  {
    nome: "Dr. Roberto Santos",
    especialidade: "Ortopedia",
    consultas: 65,
    avatar: "RS",
  },
];

const consultasRecentes = [
  {
    id: 1,
    paciente: "João da Silva",
    medico: "Dr. Carlos Mendes",
    horario: "14:30",
    status: "Concluída",
    tipo: "Presencial",
  },
  {
    id: 2,
    paciente: "Maria Santos",
    medico: "Dra. Ana Silva",
    horario: "15:00",
    status: "Em andamento",
    tipo: "Teleconsulta",
  },
  {
    id: 3,
    paciente: "Pedro Costa",
    medico: "Dr. Roberto Santos",
    horario: "15:30",
    status: "Agendada",
    tipo: "Presencial",
  },
];

const alertas = [
  {
    id: 1,
    tipo: "warning",
    titulo: "Sistema de backup",
    mensagem: "Backup automático será executado às 23:00",
    tempo: "há 1 hora",
  },
  {
    id: 2,
    tipo: "info",
    titulo: "Novo médico cadastrado",
    mensagem: "Dr. Fernando Lima foi adicionado ao sistema",
    tempo: "há 3 horas",
  },
  {
    id: 3,
    tipo: "error",
    titulo: "Falha na integração",
    mensagem: "Erro na sincronização com laboratório externo",
    tempo: "há 5 horas",
  },
];

export function AdminDashboard() {
  return (
    <div className="admin-dashboard">
      <header className="dashboard__header">
        <div className="description__wrapper">
          <h1 className="dashboard__title">Dashboard Administrativo</h1>
          <p className="welcome-text">Painel de controle</p>
        </div>
        <div className="logo__wrapper">
          <LogoIcon width="45" height="45" />
          <h1 className="auth__logo">VidaPlus</h1>
        </div>
      </header>

      <div className="stats-grid">
        <div className="stat-card pacientes">
          <div className="admin__icon">
            <Pacient />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">
              {estatisticasGerais.totalPacientes.toLocaleString()}
            </h3>
            <p className="stat-label">Total de Pacientes</p>
            <span className="stat-change positive">+12% este mês</span>
          </div>
        </div>
        <div className="stat-card medicos">
          <div className="admin__icon">
            <Doctor />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticasGerais.totalMedicos}</h3>
            <p className="stat-label">Médicos Ativos</p>
            <span className="stat-change positive">+2 novos</span>
          </div>
        </div>
        <div className="stat-card consultas">
          <div className="admin__icon">
            <Calendar />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticasGerais.consultasHoje}</h3>
            <p className="stat-label">Consultas Hoje</p>
            <span className="stat-change neutral">+5% vs ontem</span>
          </div>
        </div>
        <div className="stat-card faturamento">
          <div className="admin__icon">
            <Money />
          </div>
          <div className="stat-content">
            <h3 className="stat-number">{estatisticasGerais.faturamentoMes}</h3>
            <p className="stat-label">Faturamento do Mês</p>
            <span className="stat-change positive">+18% vs mês anterior</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card consultas-card">
          <div className="card-header">
            <h2 className="card-title">Consultas em Tempo Real</h2>
            <button className="refresh-btn">
              <Refresh />
            </button>
          </div>
          <div className="card-content">
            <div className="consultas-list">
              {consultasRecentes.map((consulta) => (
                <div key={consulta.id} className="consulta-item">
                  <div className="consulta-info">
                    <div className="consulta-main">
                      <h4 className="paciente-nome">{consulta.paciente}</h4>
                      <p className="medico-nome">{consulta.medico}</p>
                    </div>
                    <div className="consulta-details">
                      <span className="consulta-horario">
                        {consulta.horario}
                      </span>
                      <span
                        className={`tipo-badge ${consulta.tipo.toLowerCase()}`}
                      >
                        {consulta.tipo}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`status-indicator ${consulta.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {consulta.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Médicos Mais Ativos</h2>
          </div>
          <div className="card-content">
            <div className="medicos-ranking">
              {medicosMaisAtivos.map((medico, index) => (
                <div key={index} className="medico-item">
                  <div className="ranking-position">{index + 1}</div>
                  <div className="medico-avatar">
                    <span>{medico.avatar}</span>
                  </div>
                  <div className="medico-info">
                    <h4 className="medico-nome">{medico.nome}</h4>
                    <p className="medico-especialidade">
                      {medico.especialidade}
                    </p>
                  </div>
                  <div className="consultas-count">
                    <span className="count-number">{medico.consultas}</span>
                    <span className="count-label">consultas</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Gestão Rápida</h2>
          </div>
          <div className="card-content">
            <div className="admin-actions">
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Doctor />
                </span>
                <span>Gerenciar Médicos</span>
              </button>
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Pacient />
                </span>
                <span>Gerenciar Pacientes</span>
              </button>
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Report />
                </span>
                <span>Relatórios</span>
              </button>
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Icon icon={"icon-park-outline:config"} />
                </span>
                <span>Configurações</span>
              </button>
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Icon icon={"solar:card-outline"} />
                </span>
                <span>Financeiro</span>
              </button>
              <button className="admin-action-btn">
                <span className="action-icon">
                  <Icon icon={"solar:lock-outline"} />
                </span>
                <span>Segurança</span>
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Alertas do Sistema</h2>
          </div>
          <div className="card-content">
            <div className="alertas-list">
              {alertas.map((alerta) => (
                <div key={alerta.id} className={`alerta-item ${alerta.tipo}`}>
                  <div className="alerta-icon">
                    {alerta.tipo === "warning" && (
                      <Icon
                        icon={"material-symbols-light:warning-outline-rounded"}
                      />
                    )}
                    {alerta.tipo === "info" && <Icon icon={"gg:info"} />}
                    {alerta.tipo === "error" && (
                      <Icon icon={"iconamoon:close-duotone"} />
                    )}
                  </div>
                  <div className="alerta-content">
                    <h4 className="alerta-titulo">{alerta.titulo}</h4>
                    <p className="alerta-mensagem">{alerta.mensagem}</p>
                    <span className="alerta-tempo">{alerta.tempo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
