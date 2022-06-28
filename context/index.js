import { AuthProvider } from "./authContext";
import { CardsProvider } from "./cardsContext";

export const AppProvider = ({ children, ...props }) => {
  return (
    <AuthProvider>
      <CardsProvider {...props}>{children}</CardsProvider>
    </AuthProvider>
  );
};
