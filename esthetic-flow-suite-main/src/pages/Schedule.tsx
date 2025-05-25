
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, isSameDay } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { ptBR } from "date-fns/locale";
import { servicosAPI, categoriasAPI, agendamentosAPI, clientesAPI } from "@/lib/api";

const Schedule = () => {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<"service" | "dateTime" | "personal">("service");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });
  
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [calendarKey, setCalendarKey] = useState<number>(0);
  
  // Carregar categorias e serviços
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [categoriesData, servicesData] = await Promise.all([
          categoriasAPI.listar(),
          servicosAPI.listar()
        ]);
        
        setCategories(categoriesData);
        setServices(servicesData);
        
        if (categoriesData.length > 0) {
          setSelectedCategory(categoriesData[0].id);
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        toast({
          title: "Erro",
          description: "Erro ao carregar dados. Tente novamente.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  
  // Calcular horários disponíveis
  useEffect(() => {
    if (selectedDate && selectedService) {
      const fetchAvailableTimes = async () => {
        try {
          const times = await agendamentosAPI.horariosDisponiveis(selectedDate, selectedService);
          setAvailableTimes(times);
        } catch (error) {
          console.error('Erro ao buscar horários:', error);
          setAvailableTimes([]);
        }
      };
      
      fetchAvailableTimes();
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, selectedService]);
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedService("");
  };
  
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPersonalInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNextStep = () => {
    if (step === "service" && selectedService) {
      setStep("dateTime");
      setCalendarKey(prev => prev + 1);
    } else if (step === "dateTime" && selectedDate && selectedTime) {
      setStep("personal");
    }
  };
  
  const handlePrevStep = () => {
    if (step === "dateTime") {
      setStep("service");
    } else if (step === "personal") {
      setStep("dateTime");
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime || !selectedService) return;
    
    try {
      // Primeiro, criar ou encontrar o cliente
      const clienteData = {
        nome: personalInfo.name,
        email: personalInfo.email,
        telefone: personalInfo.phone,
        observacoes: personalInfo.notes || null
      };
      
      const cliente = await clientesAPI.criar(clienteData);
      
      // Criar o agendamento
      const agendamentoData = {
        cliente_id: cliente.id,
        servico_id: selectedService,
        data: format(selectedDate, 'yyyy-MM-dd'),
        hora: selectedTime,
        status: 'agendado',
        observacoes: personalInfo.notes || null
      };
      
      await agendamentosAPI.criar(agendamentoData);
      
      toast({
        title: "Agendamento Realizado!",
        description: `Seu agendamento para ${format(selectedDate, 'dd/MM/yyyy')} às ${selectedTime} foi confirmado.`,
      });
      
      navigate("/");
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      toast({
        title: "Erro",
        description: "Erro ao realizar agendamento. Tente novamente.",
        variant: "destructive",
      });
    }
  };
  
  // Filtra os serviços com base na categoria selecionada
  const filteredServices = services.filter(service => service.categoria_id === selectedCategory);

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
        {/* Cabeçalho da Página */}
        <section className="bg-beige-light py-16 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Agende seu Horário</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Escolha o serviço, data, horário e preencha seus dados para agendar seu tratamento.
            </p>
          </div>
        </section>
        
        {/* Formulário de Agendamento */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-3xl">
            <Card className="border-gold/20">
              <CardContent className="p-8">
                <div className="flex justify-between mb-8">
                  <div className={`flex-1 text-center ${step === "service" ? "text-gold-dark" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${step === "service" ? "bg-gold text-white" : "bg-muted"}`}>
                      1
                    </div>
                    <p className="text-sm">Serviço</p>
                  </div>
                  <div className={`flex-1 text-center ${step === "dateTime" ? "text-gold-dark" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${step === "dateTime" ? "bg-gold text-white" : "bg-muted"}`}>
                      2
                    </div>
                    <p className="text-sm">Data e Horário</p>
                  </div>
                  <div className={`flex-1 text-center ${step === "personal" ? "text-gold-dark" : "text-muted-foreground"}`}>
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${step === "personal" ? "bg-gold text-white" : "bg-muted"}`}>
                      3
                    </div>
                    <p className="text-sm">Dados Pessoais</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit}>
                  {/* Etapa 1: Seleção de Serviço */}
                  {step === "service" && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label htmlFor="category">Categoria</Label>
                        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                          <SelectTrigger id="category" className="w-full">
                            <SelectValue placeholder="Selecione uma categoria" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.nome}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-3">
                        <Label>Serviço</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {filteredServices.map(service => (
                            <div 
                              key={service.id}
                              onClick={() => setSelectedService(service.id)}
                              className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                selectedService === service.id 
                                  ? "border-gold bg-gold/10" 
                                  : "border-input hover:border-gold/50"
                              }`}
                            >
                              <h3 className="font-medium">{service.titulo}</h3>
                              <div className="flex justify-between mt-2 text-sm">
                                <span className="text-gold-dark">
                                  R$ {parseFloat(service.preco).toFixed(2).replace('.', ',')}
                                </span>
                                <span className="text-muted-foreground">{service.duracao} min</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="pt-4 text-right">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!selectedService}
                          className="bg-gold hover:bg-gold-dark text-white"
                        >
                          Próximo
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Etapa 2: Seleção de Data e Hora */}
                  {step === "dateTime" && (
                    <div className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-3">
                          <Label>Data</Label>
                          <div className="border border-input rounded-lg p-4">
                            <Calendar
                              key={calendarKey}
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => {
                                setSelectedDate(date);
                                setSelectedTime("");
                              }}
                              className="mx-auto pointer-events-auto"
                              locale={ptBR}
                              disabled={(date) => {
                                const day = date.getDay();
                                return day === 0 || date < new Date();
                              }}
                              fromDate={new Date()}
                            />
                          </div>
                          <div className="text-sm text-center text-muted-foreground mt-2">
                            Clique em uma data para ver os horários disponíveis
                          </div>
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <Label>Horário</Label>
                          <div className="grid grid-cols-2 gap-3">
                            {availableTimes.length > 0 ? (
                              availableTimes.map(time => (
                                <Button
                                  key={time}
                                  type="button"
                                  variant="outline"
                                  className={`${
                                    selectedTime === time 
                                      ? "border-gold bg-gold/10 hover:bg-gold/20" 
                                      : "border-input"
                                  }`}
                                  onClick={() => setSelectedTime(time)}
                                >
                                  {time}
                                </Button>
                              ))
                            ) : (
                              <div className="col-span-2 text-center py-8 text-muted-foreground">
                                {selectedDate 
                                  ? "Nenhum horário disponível para esta data." 
                                  : "Selecione uma data para ver os horários disponíveis."}
                              </div>
                            )}
                          </div>
                          {selectedDate && selectedTime && (
                            <p className="mt-4 text-muted-foreground text-sm">
                              Você selecionou: {format(selectedDate, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })} às {selectedTime}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                        >
                          Voltar
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          disabled={!selectedDate || !selectedTime}
                          className="bg-gold hover:bg-gold-dark text-white"
                        >
                          Próximo
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Etapa 3: Informações Pessoais */}
                  {step === "personal" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <Label htmlFor="name">Nome Completo</Label>
                          <Input
                            id="name"
                            name="name"
                            value={personalInfo.name}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-3">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="notes">Observações (opcional)</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={personalInfo.notes}
                          onChange={handlePersonalInfoChange}
                          placeholder="Informe qualquer detalhe importante que devemos saber"
                          rows={4}
                        />
                      </div>
                      
                      <div className="bg-beige-light p-4 rounded-lg">
                        <h3 className="font-medium mb-2">Resumo do Agendamento</h3>
                        <div className="space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">Serviço:</span>{" "}
                            {services.find(s => s.id === selectedService)?.titulo}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Data:</span>{" "}
                            {selectedDate && format(selectedDate, "dd/MM/yyyy")}
                          </p>
                          <p>
                            <span className="text-muted-foreground">Horário:</span>{" "}
                            {selectedTime}
                          </p>
                        </div>
                      </div>
                      
                      <div className="pt-4 flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handlePrevStep}
                        >
                          Voltar
                        </Button>
                        <Button
                          type="submit"
                          className="bg-gold hover:bg-gold-dark text-white"
                          disabled={!personalInfo.name || !personalInfo.email || !personalInfo.phone}
                        >
                          Confirmar Agendamento
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Schedule;
