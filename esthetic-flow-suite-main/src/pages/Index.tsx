
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ServiceCategoryTabs from "@/components/ServiceCategoryTabs";
import { servicosAPI, categoriasAPI } from "@/lib/api";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import TestimonialsSection from "@/components/TestimonialsSection";

const Index = () => {
  const [featuredServices, setFeaturedServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Buscar categorias
        const categoriesData = await categoriasAPI.listar();
        setCategories(categoriesData);
        
        // Buscar serviços em destaque
        const servicesData = await servicosAPI.listar();
        const featured = servicesData.filter(service => service.destaque).slice(0, 3);
        
        // Se não houver serviços em destaque, pegar os 3 primeiros
        if (featured.length === 0) {
          setFeaturedServices(servicesData.slice(0, 3));
        } else {
          setFeaturedServices(featured);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold"></div>
            <p className="mt-4 text-muted-foreground">Carregando...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <HeroSection />
        
        {/* Featured Services */}
        <section className="py-16 px-4 bg-beige-light">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Nossos Serviços</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Conheça alguns dos tratamentos estéticos que oferecemos para cuidar da sua beleza e bem-estar.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredServices.map(service => (
                <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gold/20 hover:shadow-lg transition-shadow">
                  <div className="h-56 overflow-hidden">
                    <img 
                      src={service.imagem_url || '/assets/marble-bg.png'} 
                      alt={service.titulo} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-medium mb-2">{service.titulo}</h3>
                    <p className="text-muted-foreground mb-4">{service.descricao}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-gold-dark font-semibold">
                          R$ {parseFloat(service.preco).toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-sm text-muted-foreground">{service.duracao} min</p>
                      </div>
                      <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
                        <Link to={`/services/${service.id}`}>
                          Detalhes
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white">
                <Link to="/services">
                  Ver Todos os Serviços
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* About Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Sobre o Realle Esthetic Center</h2>
                <p className="text-muted-foreground mb-4">
                  No Realle Esthetic Center, combinamos tecnologia de ponta com o toque humano para oferecer tratamentos estéticos personalizados que realçam sua beleza natural.
                </p>
                <p className="text-muted-foreground mb-6">
                  Nossa equipe de profissionais altamente qualificados está comprometida em proporcionar uma experiência exclusiva, em um ambiente luxuoso e acolhedor, onde cada detalhe é pensado para o seu conforto e bem-estar.
                </p>
                <Button asChild className="bg-gold hover:bg-gold-dark text-white">
                  <Link to="/about">
                    Conheça Nossa História
                  </Link>
                </Button>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="/lovable-uploads/e47daf19-7036-45e2-bad4-a16b33c470e5.png" 
                  alt="Realle Esthetic Center" 
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Before/After Results */}
        <section className="py-16 px-4 bg-beige-light">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">Resultados Reais</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Veja a transformação de nossos clientes com os tratamentos realizados em nossa clínica.
            </p>
            
            <BeforeAfterGallery />
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 px-4 marble-pattern">
          <div className="container mx-auto">
            <TestimonialsSection />
          </div>
        </section>
        
        {/* Schedule CTA */}
        <section className="py-16 px-4 bg-gold/10">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para Transformar sua Beleza?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Agende uma consulta hoje mesmo e descubra o tratamento ideal para suas necessidades.
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

export default Index;
