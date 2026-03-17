import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Servicios from "./pages/Servicios";
import ServicioDetalle from "./pages/ServicioDetalle";
import Promos from "./pages/Promos";
import PromoDetalle from "./pages/PromoDetalle";
import Paquetes from "./pages/Paquetes";
import PaqueteDetalle from "./pages/PaqueteDetalle";
import Reservar from "./pages/Reservar";
import MiSolicitud from "./pages/MiSolicitud";
import Recomendador from "./pages/Recomendador";
import Resultados from "./pages/Resultados";
import Resenas from "./pages/Resenas";
import Contacto from "./pages/Contacto";
import FAQ from "./pages/FAQ";
import Politicas from "./pages/Politicas";
import Mas from "./pages/Mas";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:slug" element={<ServicioDetalle />} />
          <Route path="/promos" element={<Promos />} />
          <Route path="/promos/:slug" element={<PromoDetalle />} />
          <Route path="/paquetes" element={<Paquetes />} />
          <Route path="/paquetes/:slug" element={<PaqueteDetalle />} />
          <Route path="/reservar" element={<Reservar />} />
          <Route path="/mi-solicitud" element={<MiSolicitud />} />
          <Route path="/recomendador" element={<Recomendador />} />
          <Route path="/resultados" element={<Resultados />} />
          <Route path="/resenas" element={<Resenas />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/politicas" element={<Politicas />} />
          <Route path="/mas" element={<Mas />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
