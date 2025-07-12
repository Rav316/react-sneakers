import * as React from "react";

interface IModalContext {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = React.createContext<IModalContext>({
  isModalOpen: false,
  setIsModalOpen: () => {}
})
