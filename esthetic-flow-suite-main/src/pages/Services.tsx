
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { serviceCategories, services } from "@/utils/mockData";
import ServiceCategoryTabs from "@/components/ServiceCategoryTabs";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-beige-light py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça todos os tratamentos estéticos disponíveis em nossa clínica, realizados por profissionais altamente qualificados com produtos de primeira linha.
            </p>
          </div>
        </section>
        
        {/* Services Categories */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <ServiceCategoryTabs categories={serviceCategories} services={services} />
          </div>
        </section>
        
        {/* Schedule CTA */}
        <section className="py-12 px-4 bg-gold/10">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Encontrou o tratamento ideal para você?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende agora mesmo sua consulta e comece sua jornada de transformação.
            </p>
            <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white">
              <Link to="/schedule">
                Agendar Consulta
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
