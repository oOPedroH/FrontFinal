
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-2xl font-medium mb-6">Página Não Encontrada</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            A página que você está procurando não existe ou foi movida para outro endereço.
          </p>
          <Button asChild className="bg-gold hover:bg-gold-dark text-white">
            <Link to="/">
              Voltar para Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
