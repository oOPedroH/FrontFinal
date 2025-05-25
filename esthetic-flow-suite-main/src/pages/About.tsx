import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-beige-light py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Sobre Nós</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Conheça a história e a equipe por trás do Realle Esthetic Center.
            </p>
          </div>
        </section>
        
        {/* Our Story */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
                <p className="text-muted-foreground mb-4">
                  Fundado em 2018, o Realle Esthetic Center nasceu da paixão por transformar vidas através da beleza e do bem-estar. Nossa fundadora, Dra. Ana Realle, formada em dermatologia e estética avançada, visualizou um espaço onde tecnologia de ponta e atendimento humanizado se uniriam para oferecer resultados excepcionais.
                </p>
                <p className="text-muted-foreground mb-4">
                  Ao longo dos anos, construímos uma reputação sólida no mercado estético, graças ao nosso compromisso com a excelência, responsabilidade e ética profissional. Nossa clínica cresceu e evoluiu, mas mantivemos sempre nossa filosofia central: tratar cada cliente como único, respeitando sua individualidade e necessidades específicas.
                </p>
                <p className="text-muted-foreground">
                  Hoje, orgulhamo-nos de ser referência em tratamentos estéticos na região, oferecendo um ambiente sofisticado, acolhedor e seguro, onde nossos clientes podem vivenciar momentos de transformação e autocuidado.
                </p>
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
        
        {/* Our Values */}
        <section className="py-16 px-4 bg-beige-light">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nossos Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Excelência</h3>
                <p className="text-muted-foreground">
                  Buscamos constantemente aprimorar nossos serviços, técnicas e conhecimentos para oferecer o que há de melhor em estética.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Ética</h3>
                <p className="text-muted-foreground">
                  Trabalhamos com total transparência, honestidade e respeito aos limites e expectativas de cada cliente.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Inovação</h3>
                <p className="text-muted-foreground">
                  Mantemo-nos atualizados com as mais recentes tecnologias e tendências do mercado estético mundial.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Acolhimento</h3>
                <p className="text-muted-foreground">
                  Criamos um ambiente onde cada cliente se sente valorizado, respeitado e confortável.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Responsabilidade</h3>
                <p className="text-muted-foreground">
                  Assumimos o compromisso com a segurança e bem-estar de nossos clientes em todos os procedimentos.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-md border border-gold/20">
                <h3 className="text-xl font-semibold mb-4 text-gold-dark">Personalização</h3>
                <p className="text-muted-foreground">
                  Entendemos que cada pessoa é única e merece um tratamento personalizado para suas necessidades específicas.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Fundadora e Responsável Técnica</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="w-48 h-48 rounded-full overflow-hidden mb-4">
                <img 
                  src="/lovable-uploads/13589f10-da39-4261-917d-5ba8a26ba8fd.png" 
                  alt="Dra. Ana Realle" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-semibold text-center">Dra. Ana Carolina</h3>
              <p className="text-gold-dark mb-2 text-center">Fundadora e Diretora Clínica</p>
              <p className="text-center text-muted-foreground max-w-xl">
                Dermatologista e especialista em estética avançada com mais de 15 anos de experiência.
              </p>
            </div>
          </div>
        </section>
        
        {/* Our Space */}
        <section className="py-16 px-4 bg-beige-light">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Nosso Espaço</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/lovable-uploads/e47daf19-7036-45e2-bad4-a16b33c470e5.png" 
                  alt="Recepção" 
                  className="w-full h-64 object-cover" 
                />
                <p className="p-4 bg-white text-center font-medium">Recepção</p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/lovable-uploads/66738dc9-59d5-4248-90be-3a043f179f7d.png" 
                  alt="Sala de Tratamento" 
                  className="w-full h-64 object-cover" 
                />
                <p className="p-4 bg-white text-center font-medium">Sala de Tratamento</p>
              </div>
              
              <div className="rounded-lg overflow-hidden shadow-md">
                <img 
                  src="/lovable-uploads/8d9f19aa-566e-487d-8de0-7998b6a073f8.png" 
                  alt="Área de Relaxamento" 
                  className="w-full h-64 object-cover" 
                />
                <p className="p-4 bg-white text-center font-medium">Área de Relaxamento</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
