import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { Card } from "../components/card/card";
import { Input } from "../components/input/input";
import { Button } from "../components/button/button";
import LogoIcon from "../components/logo-icon/logo";
import { useAuthentication } from "../hooks/useAuthentication/useAuthentication";
import { IsAuthenticated } from "../auth/isAuthenticated";
import { Spacer } from "../components/spacer/spacer";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    if (IsAuthenticated()) {
      throw redirect({ to: "/acesso-negado" });
    }
  },
  component: Authentication,
});

function Authentication() {
  const component_text = {
    logo: "VidaPlus",
    title: "Bem-vindo ao SGHSS",
    forgotPassword: "Esqueceu a senha?",
    signup: "Cadastre-se",
  };

  const { setCredential, setPassword, handleAuthentication } =
    useAuthentication();
  return (
    <>
      <section className="auth__wrapper">
        <Card className="auth__card">
          <div className="logo__wrapper">
            <LogoIcon width="45" height="45" />
            <h1 className="auth__logo">{component_text["logo"]}</h1>
          </div>
          <h2 className="auth__title">{component_text["title"]}</h2>
          <Input
            className="email__field"
            name="emailOuCpf"
            title="Digite um e-mail"
            placeholder="Email"
            onChange={(e) => setCredential(e.target.value)}
          />
          <Input
            className="password__field"
            name="senha"
            type="password"
            placeholder="Senha"
            minLength={4}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button text="Entrar" onClick={handleAuthentication} />
          <Link to="/" className="auth__recovery">
            {component_text["forgotPassword"]}
          </Link>
          <Spacer />
          <Link to="/" className="auth__signup">
            {component_text["signup"]}
          </Link>
        </Card>

        <article className="helper">
          <ul>
            <p>Teste o sistema com as credenciais abaixo!</p>
            <li className="pacient_credential">
              Paciente:{" "}
              <span className="credential">
                <i>joaodasilva@gmail.com</i>
              </span>
            </li>
            <li className="doctor_credential">
              Médico:{" "}
              <span className="credential">
                <i>drpedropascal@vidaplus.com</i>
              </span>
            </li>
            <li className="admin_credential">
              Administrador:{" "}
              <span className="credential">
                <i>admin@admin.com</i>
              </span>
            </li>
          </ul>
        </article>
      </section>
    </>
  );
}
