import * as React from "react";

interface ICartDrawerContext {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const CartDrawerContext = React.createContext<ICartDrawerContext>({
  isDrawerOpen: false,
  setIsDrawerOpen: () => {}
})