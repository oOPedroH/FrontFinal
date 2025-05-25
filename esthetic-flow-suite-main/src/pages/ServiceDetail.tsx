
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { services } from "@/utils/mockData";
import { Service } from "@/types/services";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const ServiceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Service | null>(null);

  useEffect(() => {
    if (id) {
      const foundService = services.find(s => s.id === id);
      setService(foundService || null);
    }
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Serviço não encontrado.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Service Header */}
        <section className="bg-beige-light py-12 px-4">
          <div className="container mx-auto">
            <Link to="/services" className="inline-flex items-center text-gold-dark mb-6 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para Serviços
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-auto"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-4">{service.title}</h1>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <Card className="bg-white/50 border-gold/20">
                    <CardContent className="p-4 flex flex-col items-center">
                      <p className="text-sm text-muted-foreground">Preço</p>
                      <p className="text-xl font-semibold text-gold-dark">{service.price}</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-white/50 border-gold/20">
                    <CardContent className="p-4 flex flex-col items-center">
                      <p className="text-sm text-muted-foreground">Duração</p>
                      <p className="text-xl font-semibold">{service.duration}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <p className="text-muted-foreground mb-8">
                  {service.fullDescription || service.description}
                </p>
                
                <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white">
                  <Link to="/schedule">
                    Agendar Agora
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Benefícios do Tratamento</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4">Resultados Rápidos</h3>
                  <p className="text-muted-foreground">
                    Nossos tratamentos são desenvolvidos para proporcionar resultados visíveis já nas primeiras sessões.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4">Tecnologia Avançada</h3>
                  <p className="text-muted-foreground">
                    Utilizamos equipamentos de última geração, garantindo eficácia e segurança em todos os procedimentos.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-gold/20">
                <CardContent className="p-6">
                  <h3 className="text-xl font-medium mb-4">Profissionais Especializados</h3>
                  <p className="text-muted-foreground">
                    Nossa equipe é formada por profissionais altamente qualificados e em constante atualização.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Related Services */}
        <section className="py-12 px-4 bg-beige-light">
          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-6">Tratamentos Relacionados</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services
                .filter(s => s.categoryId === service.categoryId && s.id !== service.id)
                .slice(0, 3)
                .map(relatedService => (
                  <Card key={relatedService.id} className="border-gold/20 overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={relatedService.image} 
                        alt={relatedService.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2">{relatedService.title}</h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{relatedService.description}</p>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-gold-dark font-medium">{relatedService.price}</p>
                        </div>
                        <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                          <Link to={`/services/${relatedService.id}`}>
                            Ver Detalhes
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </section>
        
        {/* Schedule CTA */}
        <section className="py-12 px-4">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Pronto para Começar seu Tratamento?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consulta e receba uma avaliação personalizada para suas necessidades.
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

export default ServiceDetail;
