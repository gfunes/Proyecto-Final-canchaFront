import Administrador from "./components/pages/Administrador"
import Formulario from "./components/pages/Formulario"
import FormCancha from "./components/pages/FormCancha"
import Inicio from "./components/pages/Inicio"
import Login from "./components/pages/Login"
import Footer from "./components/shared/Footer"
import Menu from "./components/shared/Menu"
import Error404 from "./components/pages/Error404"
import { BrowserRouter, Routes, Route } from "react-router";
import RegistroUsuario from "./components/pages/RegistroUsuario"
import AdmReservas from "./components/pages/AdmReservas"
import AdmCanchas from "./components/pages/AdmCanchas"
import { useEffect, useState } from "react";
import { AppContext } from "./context/AppContext";


function App() {
const usuarioSessionStorage = JSON.parse(
    sessionStorage.getItem("usuarioKey") || "false",
  );
  const [usuarioLogueado, setUsuarioLogueado] = useState<boolean>(usuarioSessionStorage);

   useEffect(() => {
    sessionStorage.setItem("usuarioKey", JSON.stringify(usuarioLogueado));
  }, [usuarioLogueado]);


  return (
    <AppContext.Provider 
    value={{
      usuarioLogueado,
      setUsuarioLogueado
    }}>
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Menu />
        <main className="container grow mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Inicio></Inicio>}/>
            <Route path="/login" element={<Login></Login>}/>
            <Route path="/administrador" element={<Administrador></Administrador>}/>
            <Route path="/reservas" element={<AdmReservas></AdmReservas>}/>
            <Route path="/canchas" element={<AdmCanchas></AdmCanchas>}/>
            <Route path="/administrador/crear" element={<Formulario titulo={'Crear Producto'}></Formulario>}/>
            <Route path="/administrador/editar/:id" element={<Formulario titulo={'Editar Producto'}></Formulario>}/> */}
            <Route path="/canchas/crear" element={<FormCancha titulo={'Crear cancha'}></FormCancha>}/>
            <Route path="/canchas/editar/:id" element={<FormCancha titulo={'Editar cancha'}></FormCancha>}/> */}
            
            <Route path="/registrate" element={<RegistroUsuario/>} />
            <Route path="*" element={<Error404></Error404>}/>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
     </AppContext.Provider>
   );
}
export default App
