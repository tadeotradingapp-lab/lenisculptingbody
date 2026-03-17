import { Layout } from "@/components/layout/Layout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "¿Cómo solicito una cita?", a: "Puedes solicitar tu cita directamente desde nuestra web. Selecciona el servicio, fecha y hora, y te confirmaremos por WhatsApp." },
  { q: "¿Cómo se confirma mi cita?", a: "Una vez enviada tu solicitud, te contactaremos por WhatsApp para confirmar disponibilidad y horario." },
  { q: "¿Puedo cancelar o cambiar mi cita?", a: "Sí, puedes cancelar o cambiar tu cita contactándonos por WhatsApp con al menos 24 horas de anticipación." },
  { q: "¿Cuántas sesiones necesito para ver resultados?", a: "Depende del tratamiento y cada persona. Generalmente se recomiendan entre 4 y 12 sesiones para resultados óptimos." },
  { q: "¿Los tratamientos son dolorosos?", a: "La mayoría de los tratamientos son cómodos. Algunos como la maderoterapia pueden generar molestia leve las primeras sesiones." },
  { q: "¿Puedo combinar tratamientos?", a: "Sí, muchos tratamientos se complementan entre sí. Consulta nuestros combos y paquetes para opciones optimizadas." },
  { q: "¿Hay contraindicaciones?", a: "Algunos tratamientos tienen contraindicaciones específicas (embarazo, marcapasos, etc.). Te informaremos antes de cada sesión." },
  { q: "¿Ofrecen paquetes o planes?", a: "Sí, tenemos paquetes de 6, 8 y 12 sesiones con descuentos progresivos. Consulta nuestra sección de paquetes." },
  { q: "¿Dónde están ubicados?", a: "Estamos en Alexander's Hair Salón, 1888 Polk St, Hollywood, FL 33020. Estacionamiento gratuito disponible." },
  { q: "¿Atienden en español?", a: "Sí, toda la atención es en español. También podemos atender en inglés si lo prefieres." },
];

export default function FAQ() {
  return (
    <Layout>
      <div className="container py-6 max-w-2xl">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Preguntas frecuentes</h1>
        <p className="text-muted-foreground mt-1 text-sm mb-6">Encuentra respuestas a las dudas más comunes.</p>
        <Accordion type="single" collapsible>
          {faqs.map((f, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-medium">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Layout>
  );
}
