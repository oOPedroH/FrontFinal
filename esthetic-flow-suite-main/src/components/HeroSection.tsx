
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/lovable-uploads/e47daf19-7036-45e2-bad4-a16b33c470e5.png')"
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl">
          Transforme sua beleza com tratamentos estéticos de excelência
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
          Tratamentos faciais, corporais e estéticos realizados por profissionais altamente qualificados em um ambiente de luxo e conforto.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-gold hover:bg-gold-dark text-white">
            <Link to="/schedule">
              Agende seu Horário
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
            <Link to="/services">
              Conheça Nossos Serviços
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
