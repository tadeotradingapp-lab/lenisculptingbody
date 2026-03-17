import { Layout } from "@/components/layout/Layout";
import { PackageCard } from "@/components/PackageCard";
import { packages } from "@/data/packages";

export default function Paquetes() {
  return (
    <Layout>
      <div className="container py-6">
        <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground">Paquetes de sesiones</h1>
        <p className="text-muted-foreground mt-1 text-sm">Más sesiones, mejores resultados, mayor ahorro.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {packages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
        </div>
      </div>
    </Layout>
  );
}
