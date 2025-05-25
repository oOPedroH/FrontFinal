import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Mensagem Enviada!",
        description: "Agradecemos seu contato. Retornaremos em breve.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-beige-light py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Entre em Contato</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Estamos à disposição para esclarecer dúvidas, receber sugestões ou agendar sua consulta.
            </p>
          </div>
        </section>
        
        {/* Contact Form and Info */}
        <section className="py-16 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card className="border-gold/20">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold mb-6">Envie-nos uma Mensagem</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Assunto</Label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      className="bg-gold hover:bg-gold-dark text-white w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              {/* Contact Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Informações de Contato</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Endereço</h3>
                      <p className="text-muted-foreground">
                        Rua das Flores, 123<br />
                        Bairro Jardim - São Paulo/SP<br />
                        CEP: 01000-000
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Telefone</h3>
                      <p className="text-muted-foreground">(11) 99999-9999</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">E-mail</h3>
                      <p className="text-muted-foreground">contato@reallecenter.com.br</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Horário de Funcionamento</h3>
                      <p className="text-muted-foreground">
                        Segunda a Sexta: 9h às 19h<br />
                        Sábados: 9h às 16h<br />
                        Domingos e Feriados: Fechado
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Redes Sociais</h2>
                  <div className="flex space-x-6">
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
                
                {/* Google Maps Placeholder */}
                <div className="aspect-video bg-beige-light rounded-lg flex items-center justify-center border border-gold/20">
                  <p className="text-muted-foreground">Mapa do Google</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
