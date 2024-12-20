import { Routes, Route, Navigate } from "react-router-dom";
import { RedirectLogin, RedirectPanel } from "./components/ProtectedRoute";
import { Dashboard } from "./layouts";
import { Login } from "./pages/auth";

function App() {
  return (
    <Routes>
        {/* REDIRIGE AL  SI HAY UN USUARIO LOGUEADO */}
      <Route element={<RedirectPanel/>}>
          <Route path="login" element={<Login />} />
      </Route>
              
      {/* PARA ACCEDER DEBE DE EXISTIR UN UNSUARIO LOGUEADO */}
      <Route element={<RedirectLogin />}> 
          <Route path="/recetas/*" element={<Dashboard/>} />
      </Route>
      
      {/* RUTAS DE ERRORES */}
      <Route path="*" element={<Navigate to="/recetas" replace />} />
    </Routes>
  );
}

export default App;
