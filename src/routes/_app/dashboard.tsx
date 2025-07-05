import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { IsAuthenticated } from "../../auth/isAuthenticated";
import LogoIcon from "../../components/logo-icon/logo";
import { Doctor } from "../../components/icons/doctor/doctor";
import { Clock } from "../../components/icons/clock/clock";
import { Location } from "../../components/icons/location/location";
import { Check } from "../../components/icons/check/check";
import { Document } from "../../components/icons/document/document";
import { Calendar } from "../../components/icons/calendar/calendar";
import { Video } from "../../components/icons/video/video";

export const Route = createFileRoute("/_app/dashboard")({
  beforeLoad: async () => {
    if (!IsAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }

    const role = sessionStorage.getItem("token")?.split("-")[1];
    console.log(role);
  },

  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate({ from: "/dashboard" });
  const handleConsulta = () => {
    navigate({ to: "/consultas" });
  };

  const handleExame = () => {
    navigate({ to: "/exames" });
  };

  const handleHistorico = () => {
    navigate({ to: "/historico-medico" });
  };

  const handleTeleconsulta = () => {
    navigate({ to: "/teleconsultas" });
  };
  return (
    <>
      <section className="dashboard__wrapper">
        <header className="dashboard__header">
          <h1 className="dashboard__title">Dashboard</h1>
          <div className="logo__wrapper">
            <LogoIcon width="45" height="45" />
            <h1 className="auth__logo">VidaPlus</h1>
          </div>
        </header>

        <div className="dashboard-grid">
          <div className="card card-large">
            <div className="card-header">
              <h2 className="card-title">Próxima consulta</h2>
              <button className="add-btn" onClick={handleConsulta}>
                +
              </button>
            </div>
            <div className="card-content">
              <div className="appointment-info">
                <div className="info-item">
                  <span className="info-icon">
                    <Doctor />
                  </span>
                  <span className="info-text">Dra. Natalia Fonsenca</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <Clock />
                  </span>
                  <span className="info-text">15/07/2025 - 14:30</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <Location />
                  </span>
                  <span className="info-text">
                    Avenida Augusto Garcia, 195, Centro - Consultório 302
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Exames</h2>
              <button className="add-btn" onClick={handleExame}>
                +
              </button>
            </div>
            <div className="card-content">
              <div className="exam-item pending">
                <span className="exam-name">Hemograma</span>
                <span className="exam-status">
                  <Clock />
                </span>
              </div>
              <div className="exam-item completed">
                <span className="exam-name">Colesterol</span>
                <span className="exam-status">
                  <Check />
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Histórico Médico</h2>
            </div>
            <div className="card-content">
              <div className="history-info">
                <div className="history-item">
                  <span className="history-icon">
                    <Document />
                  </span>
                  <span className="history-text">Últimos 3 consultas</span>
                </div>
                <button className="view-all-btn" onClick={handleHistorico}>
                  Ver tudo
                </button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Última Consulta</h2>
            </div>
            <div className="card-content">
              <div className="last-appointment">
                <div className="info-item">
                  <span className="info-icon">
                    <Doctor />
                  </span>
                  <span className="info-text">Dr. Carlos Mendes</span>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <Calendar />
                  </span>
                  <span className="info-text">10/06/2023</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Teleconsulta</h2>
            </div>
            <div className="card-content">
              <div className="teleconsult-info">
                <div className="info-item">
                  <span className="info-icon">
                    <Video />
                  </span>
                  <span className="info-text">Consultas online</span>
                </div>
                <button
                  className="schedule-call-btn"
                  onClick={handleTeleconsulta}
                >
                  Agendar Chamada
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
