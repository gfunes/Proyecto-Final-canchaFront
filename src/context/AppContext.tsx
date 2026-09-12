import { createContext, useContext, useState, ReactNode } from "react";

// 1. Estructura de los datos del usuario
export interface UsuarioSesion {
  nombre: string;
  rol: string; // "admin", "cliente", etc.
}

// 2. Tipado del contexto
export interface AppContextType {
  usuarioLogueado: UsuarioSesion | null;
   loadingSession : boolean
  setUsuarioLogueado: React.Dispatch<React.SetStateAction<UsuarioSesion | null>>;
  loginBackend: (email: string, pass: string) => Promise<Usuario | null>; 
  logoutbackend:() => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

// 3. Componente Provider que maneja el estado
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Inicializa desde sessionStorage para no perder la sesión al recargar la página (F5)
  const [usuarioLogueado, setUsuarioLogueado] = useState<UsuarioSesion | null>(() => {
    const sesionGuardada = sessionStorage.getItem("usuarioLogueado");
    return sesionGuardada ? JSON.parse(sesionGuardada) : null;
  });

  return (
    <AppContext.Provider value={{ usuarioLogueado, setUsuarioLogueado }}>
      {children}
    </AppContext.Provider>
  );
};

// 4. Hook personalizado para consumir el contexto
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  }
  return context;
}