import { Link } from "react-router-dom";
import { business } from "@/data/business";

export function Footer() {
  return (
    <footer className="hidden md:block bg-foreground text-background py-12 mt-16">
      <div className="container">
        <div className="grid grid-cols-4 gap-8">
          <div>
            <span className="font-accent text-2xl text-primary">Leni</span>
            <span className="font-display font-semibold ml-1">Sculpting Body</span>
            <p className="text-sm text-background/60 mt-3">Tratamientos corporales y faciales personalizados en Hollywood, FL.</p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Explorar</h4>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <Link to="/servicios" className="hover:text-background transition-colors">Servicios</Link>
              <Link to="/promos" className="hover:text-background transition-colors">Promociones</Link>
              <Link to="/paquetes" className="hover:text-background transition-colors">Paquetes</Link>
              <Link to="/resultados" className="hover:text-background transition-colors">Resultados</Link>
              <Link to="/resenas" className="hover:text-background transition-colors">Reseñas</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Información</h4>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <Link to="/contacto" className="hover:text-background transition-colors">Contacto</Link>
              <Link to="/faq" className="hover:text-background transition-colors">Preguntas frecuentes</Link>
              <Link to="/politicas" className="hover:text-background transition-colors">Políticas</Link>
              <Link to="/recomendador" className="hover:text-background transition-colors">Recomendador</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-3 text-sm">Contacto</h4>
            <div className="flex flex-col gap-2 text-sm text-background/60">
              <p>{business.address}</p>
              <p>{business.city}, {business.state} {business.zip}</p>
              <p>{business.phone}</p>
              <a href={business.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">{business.instagram}</a>
            </div>
          </div>
        </div>
        <div className="border-t border-background/10 mt-8 pt-6 text-center text-xs text-background/40">
          <p>© {new Date().getFullYear()} {business.name}. Todos los derechos reservados.</p>
          <p className="mt-1">Resultados pueden variar según cada persona.</p>
        </div>
      </div>
    </footer>
  );
}
