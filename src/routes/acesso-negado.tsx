import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "../components/button/button";

export const Route = createFileRoute("/acesso-negado")({
  component: ActiveSession,
});

function ActiveSession() {
  const navigate = useNavigate({ from: "/acesso-negado" });
  const handleLogout = () => {
    sessionStorage.clear();
    navigate({
      to: "/login",
    });
  };
  return (
    <div>
      <h1>Você já está logado</h1>
      <Button text="Sair" onClick={handleLogout} />
    </div>
  );
}
