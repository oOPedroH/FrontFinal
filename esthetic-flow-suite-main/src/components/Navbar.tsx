
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/e561a5e4-04f6-4e4b-99e7-a3c38136abf3.png" 
              alt="Realle Esthetic Center" 
              className="h-12 w-auto" 
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-gold-dark transition-colors">
              Home
            </Link>
            <Link to="/services" className="text-foreground hover:text-gold-dark transition-colors">
              Serviços
            </Link>
            <Link to="/about" className="text-foreground hover:text-gold-dark transition-colors">
              Sobre Nós
            </Link>
            <Link to="/contact" className="text-foreground hover:text-gold-dark transition-colors">
              Contato
            </Link>
            <Link to="/schedule" className="text-foreground hover:text-gold-dark transition-colors">
              Agendar
            </Link>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              <Link to="/login">
                Área do Cliente
              </Link>
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 animate-fade-in">
          <div className="flex flex-col space-y-4 p-4">
            <Link 
              to="/" 
              className="text-foreground hover:text-gold-dark transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/services" 
              className="text-foreground hover:text-gold-dark transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Serviços
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-gold-dark transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-gold-dark transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contato
            </Link>
            <Link 
              to="/schedule" 
              className="text-foreground hover:text-gold-dark transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Agendar
            </Link>
            <Button asChild variant="outline" className="border-gold text-gold hover:bg-gold hover:text-white">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                Área do Cliente
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
