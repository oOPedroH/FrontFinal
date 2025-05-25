import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-beige-dark text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img 
              src="/lovable-uploads/e561a5e4-04f6-4e4b-99e7-a3c38136abf3.png" 
              alt="Realle Esthetic Center" 
              className="h-16 w-auto mb-4" 
            />
            <p className="text-sm mt-4">
              Transformando beleza em confiança e bem-estar através de tratamentos estéticos de excelência.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-gold-dark transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-gold-dark transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-gold-dark transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-gold-dark transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/schedule" className="text-sm hover:text-gold-dark transition-colors">
                  Agendar
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <p className="text-sm">Rua das Flores, 123</p>
            <p className="text-sm">Bairro Jardim - São Paulo/SP</p>
            <p className="text-sm mt-2">contato@reallecenter.com.br</p>
            <p className="text-sm">(11) 99999-9999</p>
            
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/realleesthetic/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com/realleesthetic/" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-dark transition-colors">
                Facebook
              </a>
              <a href="#" className="text-gold hover:text-gold-dark transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gold/30 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Realle Esthetic Center. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
