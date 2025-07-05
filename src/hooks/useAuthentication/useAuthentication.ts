import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const mock_data = [
  {
    email: "joaodasilva@gmail.com",
    route: "/",
    senha: "",
    role: "user",
  },
  {
    email: "drpedropascal@vidaplus.com",
    route: "/doctor/dashboard/",
    senha: "",
    role: "doctor",
  },
  {
    email: "admin@admin.com",
    route: "/admin/dashboard",
    senha: "",
    role: "admin",
  },
];

export function useAuthentication() {
  const [credential, setCredential] = useState("");
  const [, setPassword] = useState("");

  const navigate = useNavigate({ from: "/login" });
  const handleAuthentication = () => {
    Object.values(mock_data).forEach((v) => {
      if (credential === v.email) {
        const mock_credential = credential.concat("-", v.role);
        sessionStorage.setItem("token", mock_credential);
        navigate({ to: v.route });
      }
    });
  };

  return {
    setCredential,
    setPassword,
    handleAuthentication,
  };
}
