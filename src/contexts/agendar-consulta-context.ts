import { createContext } from "react";

interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const ModalContext = createContext<ModalProps | undefined>(undefined);
