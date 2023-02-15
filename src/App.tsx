import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import RenderOnAnonymous from './Components/Sesion/RenderOnAnonymous';
import RenderOnAuthenticated from './Components/Sesion/RenderOnAuthenticated';
import Documentos from './Pages/Documentos';
import ImportarLiquidacion from './Pages/ImportarLiquidacion';
import Inicio from './Pages/Inicio';
import Liquidacion from './Pages/Liquidacion';
import Login from './Pages/Login';
import LoginVerificacion from './Pages/LoginVerificacion';
import PrimerLogin from './Pages/PrimerLogin';
import Privacidad from './Pages/Privacidad';
import Recupero from './Pages/Recupero';
import RecuperoClave from './Pages/RecuperoClave';
import TipoLiquidacion from './Pages/TipoLiquidacion';
import VerLiquidaciones from './Pages/VerLiquidaciones';

function App() {

  return (
    <div>
       <BrowserRouter>
        <Header />
        <Routes>
          <Route path = "/" element = {<RenderOnAuthenticated><Inicio /></RenderOnAuthenticated>}/>
          <Route path = "/login" element = {<RenderOnAnonymous><Login /></RenderOnAnonymous>}/>
          <Route path = "/login/verificacion" element = {<RenderOnAuthenticated><LoginVerificacion /></RenderOnAuthenticated>}/>
          <Route path = "/login/CambiarClave" element = {<RenderOnAuthenticated><PrimerLogin /></RenderOnAuthenticated>}/>
          <Route path = "/recupero" element = {<RenderOnAnonymous><Recupero /></RenderOnAnonymous>}/>
          <Route path = "/recupero/:token" element = {<RenderOnAnonymous><RecuperoClave /></RenderOnAnonymous>}/>
          <Route path = "/documentos" element = {<RenderOnAuthenticated><Documentos /></RenderOnAuthenticated>}/>
          <Route path = "/importar" element = {<RenderOnAuthenticated><ImportarLiquidacion /></RenderOnAuthenticated>} />
          <Route path = "/VerLiquidaciones" element = {<RenderOnAuthenticated><VerLiquidaciones /></RenderOnAuthenticated>} />
          <Route path = "/liquidacion/:liqui" element = {<RenderOnAuthenticated><Liquidacion /></RenderOnAuthenticated>} />
          <Route path = "/tipoLiquidacion" element = {<RenderOnAuthenticated><TipoLiquidacion /></RenderOnAuthenticated>} />
          <Route path="/privacidad" element={<RenderOnAuthenticated><Privacidad /></RenderOnAuthenticated>}/>
          <Route path = "*" element={<Navigate to="/" />} />
        </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
