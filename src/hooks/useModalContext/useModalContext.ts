import { useContext } from "react";
import { ModalContext } from "../../contexts/agendar-consulta-context";

export function useModalContext() {
  const modal = useContext(ModalContext);

  if (!modal) throw new Error("useModalContext must have a context");

  return modal;
}
