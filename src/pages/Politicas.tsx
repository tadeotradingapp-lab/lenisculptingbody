import { Layout } from "@/components/layout/Layout";

export default function Politicas() {
  return (
    <Layout showStickyCTA={false}>
      <div className="container py-6 max-w-2xl prose prose-sm">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Políticas</h1>

        <section className="mt-8">
          <h2 className="font-display font-semibold text-lg text-foreground">Política de cancelación</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Puedes cancelar o reprogramar tu cita sin cargo con al menos 24 horas de anticipación. 
            Cancelaciones con menos de 24 horas podrán estar sujetas a restricciones para futuras reservas. 
            Si no te presentas sin avisar (no-show), nos reservamos el derecho de requerir confirmación adicional para próximas citas.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display font-semibold text-lg text-foreground">Política de privacidad</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Tus datos personales (nombre, teléfono, email) se utilizan únicamente para gestionar tus citas y comunicarnos contigo. 
            No compartimos tu información con terceros. Puedes solicitar la eliminación de tus datos en cualquier momento contactándonos por WhatsApp.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display font-semibold text-lg text-foreground">Consentimiento de fotografías</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Las fotos de antes y después se toman únicamente con tu consentimiento expreso. 
            Si autorizas el uso de tus fotos, estas podrán ser utilizadas en nuestro portfolio y redes sociales sin mostrar tu rostro ni datos personales. 
            Puedes retirar tu consentimiento en cualquier momento.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="font-display font-semibold text-lg text-foreground">Disclaimer de resultados</h2>
          <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
            Los resultados de los tratamientos pueden variar según cada persona. 
            Las fotos y testimonios mostrados en esta web representan experiencias individuales y no garantizan resultados idénticos. 
            Nuestros tratamientos son estéticos y no sustituyen tratamientos médicos. 
            Consulta con un profesional de la salud si tienes condiciones médicas específicas.
          </p>
        </section>
      </div>
    </Layout>
  );
}
