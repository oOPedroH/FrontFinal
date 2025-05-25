import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addDays, format, isSameDay, isToday } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "@/types/client";
import { AppointmentWithDetails, ScheduleBlock } from "@/types/admin";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for appointments - in a real implementation, this would come from an API
const mockAppointments: AppointmentWithDetails[] = [
  {
    id: "1",
    clientId: "c1",
    serviceId: "s1",
    date: "2023-06-20",
    time: "14:00",
    status: "scheduled",
    client: {
      id: "c1",
      name: "Ana Silva",
      email: "ana@example.com",
      phone: "(11) 98765-4321"
    },
    service: {
      id: "s1",
      categoryId: "cat1",
      title: "Limpeza de Pele",
      description: "Limpeza facial profunda",
      price: "R$ 150,00",
      duration: "60 min",
      image: "/assets/marble-bg.png"
    }
  },
  {
    id: "2",
    clientId: "c2",
    serviceId: "s2",
    date: "2023-06-20",
    time: "16:30",
    status: "scheduled",
    client: {
      id: "c2",
      name: "Carlos Mendes",
      email: "carlos@example.com",
      phone: "(11) 98765-1234"
    },
    service: {
      id: "s2",
      categoryId: "cat2",
      title: "Massagem Relaxante",
      description: "Massagem corporal relaxante",
      price: "R$ 180,00",
      duration: "50 min",
      image: "/assets/marble-bg.png"
    }
  },
  // Current day appointment
  {
    id: "3",
    clientId: "c3",
    serviceId: "s3",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "10:00",
    status: "scheduled",
    client: {
      id: "c3",
      name: "Juliana Pereira",
      email: "juliana@example.com",
      phone: "(11) 97777-8888"
    },
    service: {
      id: "s3",
      categoryId: "cat3",
      title: "Manicure",
      description: "Tratamento para unhas",
      price: "R$ 80,00",
      duration: "45 min",
      image: "/assets/marble-bg.png"
    }
  },
  // Tomorrow appointment
  {
    id: "4",
    clientId: "c4",
    serviceId: "s1",
    date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
    time: "11:30",
    status: "scheduled",
    client: {
      id: "c4",
      name: "Roberto Alves",
      email: "roberto@example.com",
      phone: "(11) 91234-5678"
    },
    service: {
      id: "s1",
      categoryId: "cat1",
      title: "Limpeza de Pele",
      description: "Limpeza facial profunda",
      price: "R$ 150,00",
      duration: "60 min",
      image: "/assets/marble-bg.png"
    }
  },
  // Next week appointment
  {
    id: "5",
    clientId: "c5",
    serviceId: "s2",
    date: format(addDays(new Date(), 7), "yyyy-MM-dd"),
    time: "15:00",
    status: "scheduled",
    client: {
      id: "c5",
      name: "Fernanda Lima",
      email: "fernanda@example.com",
      phone: "(11) 92222-3333"
    },
    service: {
      id: "s2",
      categoryId: "cat2",
      title: "Massagem Relaxante",
      description: "Massagem corporal relaxante",
      price: "R$ 180,00",
      duration: "50 min",
      image: "/assets/marble-bg.png"
    }
  }
];

const mockBlockedTimes: ScheduleBlock[] = [
  {
    id: "b1",
    date: "2023-06-21",
    startTime: "09:00",
    endTime: "12:00",
    isBlocked: true,
    reason: "Manutenção de equipamentos"
  },
  {
    id: "b2",
    date: format(new Date(), "yyyy-MM-dd"), // Today
    startTime: "15:00",
    endTime: "17:00",
    isBlocked: true,
    reason: "Reunião da equipe"
  },
  // Future block
  {
    id: "b3",
    date: format(addDays(new Date(), 3), "yyyy-MM-dd"), // 3 days from now
    startTime: "13:00",
    endTime: "14:30",
    isBlocked: true,
    reason: "Treinamento"
  }
];

const AppointmentCalendar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // Default to today
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()); // Track the current month view
  const [dateAppointments, setDateAppointments] = useState<AppointmentWithDetails[]>([]);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  const [isAppointmentDialogOpen, setIsAppointmentDialogOpen] = useState(false);
  const [isNewAppointmentDialogOpen, setIsNewAppointmentDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentWithDetails | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [blockTimeForm, setBlockTimeForm] = useState({
    startTime: "09:00",
    endTime: "10:00",
    reason: ""
  });

  // Helper function to format dates with day names
  const formatDateWithDayName = (date: Date) => {
    return format(date, "EEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  // Navigate to previous day
  const goToPreviousDay = () => {
    const prevDay = addDays(selectedDate, -1);
    setSelectedDate(prevDay);
  };

  // Navigate to next day
  const goToNextDay = () => {
    const nextDay = addDays(selectedDate, 1);
    setSelectedDate(nextDay);
  };

  // Go to today
  const goToToday = () => {
    setSelectedDate(new Date());
    setCurrentMonth(new Date());
  };

  // Updates the appointments when the date changes
  const updateAppointmentsForDate = useCallback((date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const filtered = mockAppointments.filter(apt => apt.date === formattedDate);
    setDateAppointments(filtered);
  }, []);

  // When the date changes, filter the appointments for that date
  useEffect(() => {
    updateAppointmentsForDate(selectedDate);
    
    // Check if there's a pre-selected client (coming from clients page)
    if (location.state?.selectedClientId) {
      // Would open new appointment modal with pre-selected client
      // Future implementation
    }
  }, [selectedDate, updateAppointmentsForDate, location.state]);

  // Custom day component that properly handles the props
  const CustomDay = ({ date, ...props }: { date: Date } & React.HTMLAttributes<HTMLButtonElement>) => {
    const isSelected = isSameDay(date, selectedDate);
    const isTodayDate = isToday(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    const hasAppointment = mockAppointments.some(apt => apt.date === formattedDate);
    const isBlocked = mockBlockedTimes.some(block => block.date === formattedDate);

    return (
      <div className="relative flex flex-col items-center">
        <button
          {...props}
          className={`
            w-8 h-8 rounded-full flex items-center justify-center
            ${isSelected ? "bg-gold text-white font-bold shadow" : ""}
            ${isTodayDate && !isSelected ? "border border-gold" : ""}
            hover:bg-gold/20 transition
          `}
          onClick={() => setSelectedDate(date)}
          type="button"
        >
          {date.getDate()}
        </button>
        <div className="flex gap-1 mt-0.5 h-3">
          {hasAppointment && (
            <span className="w-2 h-2 rounded-full bg-gold block" title="Agendamento"></span>
          )}
          {isBlocked && (
            <span className="w-2 h-2 rounded-full bg-red-500 block" title="Bloqueio"></span>
          )}
        </div>
      </div>
    );
  };

  const handleBlockTime = () => {
    // Logic to save blocked time to Supabase/database
    toast({
      title: "Horário Bloqueado",
      description: `O horário das ${blockTimeForm.startTime} às ${blockTimeForm.endTime} foi bloqueado com sucesso para ${format(selectedDate, 'dd/MM/yyyy')}.`,
    });
    setIsBlockTimeDialogOpen(false);
    setBlockTimeForm({ startTime: "09:00", endTime: "10:00", reason: "" });
  };

  const handleAppointmentAction = (action: 'confirm' | 'cancel' | 'reschedule') => {
    if (!selectedAppointment) return;
    
    const actionMessages = {
      confirm: "Agendamento confirmado com sucesso!",
      cancel: "Agendamento cancelado com sucesso!",
      reschedule: "Agendamento remarcado com sucesso!"
    };
    
    toast({
      title: "Ação Realizada",
      description: actionMessages[action],
    });
    
    setIsAppointmentDialogOpen(false);
    setSelectedAppointment(null);
  };

  const openAppointmentDetails = (appointment: AppointmentWithDetails) => {
    setSelectedAppointment(appointment);
    setIsAppointmentDialogOpen(true);
  };

  const openNewAppointment = (time: string) => {
    setSelectedTime(time);
    setIsNewAppointmentDialogOpen(true);
  };

  // List of time slots for the schedule
  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  // Function to check if a time slot has an appointment
  const getAppointmentForTimeSlot = (time: string) => {
    return dateAppointments.find(apt => apt.time === time);
  };

  // Function to check if a time slot is blocked
  const isTimeBlocked = (date: Date, time: string) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    return mockBlockedTimes.some(block => 
      block.date === formattedDate && 
      block.startTime <= time && 
      block.endTime > time
    );
  };

  // Function to create a new appointment
  const handleCreateAppointment = () => {
    // Implementation for creating appointment - would connect to Supabase in real app
    toast({
      title: "Agendamento Criado",
      description: `Novo agendamento criado com sucesso para ${format(selectedDate, "dd/MM/yyyy")} às ${selectedTime}.`,
    });
    
    // Add to mockAppointments in a real implementation
    const newAppointment: AppointmentWithDetails = {
      id: `${Date.now()}`,
      clientId: "c1", // In a real app, this would come from the form
      serviceId: "s1", // In a real app, this would come from the form
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedTime || "",
      status: "scheduled",
      client: {
        id: "c1",
        name: "Ana Silva", // In a real app, this would come from the form
        email: "ana@example.com",
        phone: "(11) 98765-4321"
      },
      service: {
        id: "s1",
        categoryId: "cat1",
        title: "Limpeza de Pele", // In a real app, this would come from the form
        description: "Limpeza facial profunda",
        price: "R$ 150,00",
        duration: "60 min",
        image: "/assets/marble-bg.png"
      }
    };
    
    // Update local state with the new appointment
    setDateAppointments(prev => [...prev, newAppointment]);
    
    setIsNewAppointmentDialogOpen(false);
    setSelectedTime(null);
  };
  
  // Function to render date badge for the calendar
  const renderDateBadge = (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    const appointmentsOnDate = mockAppointments.filter(apt => apt.date === formattedDate);
    
    if (appointmentsOnDate.length > 0) {
      return (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-gold rounded-full" />
      );
    }
    
    // Check for blocked times on this date
    const blockedOnDate = mockBlockedTimes.some(block => block.date === formattedDate);
    if (blockedOnDate) {
      return (
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full" />
      );
    }
    
    return null;
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Agenda</h1>
          <div className="flex space-x-2">
            <Button 
              onClick={() => setIsBlockTimeDialogOpen(true)}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              Bloquear Horário
            </Button>
            <Button 
              onClick={goToToday}
              variant="outline"
              className={isToday(selectedDate) ? "bg-muted" : ""}
            >
              Hoje
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Calendar */}
          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Calendário de Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                month={currentMonth}
                onMonthChange={setCurrentMonth}
                locale={ptBR}
                className="rounded-md border pointer-events-auto"
                components={{
                  IconLeft: () => <ChevronLeft className="h-4 w-4" />,
                  IconRight: () => <ChevronRight className="h-4 w-4" />,
                  Day: CustomDay
                }}
              />
              <div className="mt-4 text-sm text-center text-muted-foreground">
                Datas com pontos dourados têm agendamentos<br />
                Datas com pontos vermelhos têm horários bloqueados
              </div>
            </CardContent>
          </Card>

          {/* Daily Schedule */}
          <Card className="md:col-span-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1">
                <CardTitle>
                  {formatDateWithDayName(selectedDate)}
                  {isToday(selectedDate) && (
                    <span className="ml-2 text-sm text-muted-foreground">(Hoje)</span>
                  )}
                </CardTitle>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToPreviousDay}
                  aria-label="Dia anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={goToNextDay}
                  aria-label="Próximo dia"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {timeSlots.map(time => {
                  const appointment = getAppointmentForTimeSlot(time);
                  const isBlocked = isTimeBlocked(selectedDate, time);
                  
                  return (
                    <div 
                      key={time} 
                      className={`p-3 rounded-md flex justify-between items-center ${
                        appointment ? "bg-gold/10 border border-gold/20" : 
                        isBlocked ? "bg-red-100 border border-red-200" : "bg-muted/50"
                      }`}
                    >
                      <div className="font-medium">{time}</div>
                      
                      {appointment ? (
                        <div className="flex items-center">
                          <div className="mr-4 text-right">
                            <div className="font-medium">{appointment.client.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.service.title}</div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => openAppointmentDetails(appointment)}
                          >
                            Detalhes
                          </Button>
                        </div>
                      ) : isBlocked ? (
                        <div className="text-red-500 text-sm">Horário Bloqueado</div>
                      ) : (
                        <div className="flex items-center">
                          <div className="text-green-500 text-sm mr-2">Disponível</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gold text-gold hover:bg-gold/10"
                            onClick={() => openNewAppointment(time)}
                          >
                            Agendar
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Block Time Dialog */}
      <Dialog open={isBlockTimeDialogOpen} onOpenChange={setIsBlockTimeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bloquear Horário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Horário Inicial</label>
                <Select 
                  value={blockTimeForm.startTime} 
                  onValueChange={(value) => setBlockTimeForm({...blockTimeForm, startTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Horário Final</label>
                <Select 
                  value={blockTimeForm.endTime} 
                  onValueChange={(value) => setBlockTimeForm({...blockTimeForm, endTime: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map(time => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Motivo (opcional)</label>
              <Textarea 
                value={blockTimeForm.reason} 
                onChange={(e) => setBlockTimeForm({...blockTimeForm, reason: e.target.value})}
                placeholder="Informe o motivo para o bloqueio deste horário"
              />
            </div>

            <div className="pt-4">
              <p className="text-sm text-muted-foreground flex items-center">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Data selecionada: {format(selectedDate, "dd/MM/yyyy")}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBlockTimeDialogOpen(false)}>Cancelar</Button>
            <Button 
              onClick={handleBlockTime}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              Bloquear Horário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Appointment Details Dialog */}
      <Dialog open={isAppointmentDialogOpen} onOpenChange={setIsAppointmentDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Agendamento</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                  <p className="font-medium">{selectedAppointment.client.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contato</h3>
                  <p className="font-medium">{selectedAppointment.client.phone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Serviço</h3>
                  <p className="font-medium">{selectedAppointment.service.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Duração</h3>
                  <p className="font-medium">{selectedAppointment.service.duration}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                  <p className="font-medium">
                    {format(new Date(selectedAppointment.date), "dd/MM/yyyy")}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Horário</h3>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div className="mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    selectedAppointment.status === 'scheduled' ? 'bg-amber-100 text-amber-800' : 
                    selectedAppointment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {selectedAppointment.status === 'scheduled' ? 'Agendado' : 
                     selectedAppointment.status === 'completed' ? 'Concluído' : 
                     selectedAppointment.status === 'cancelled' ? 'Cancelado' : 'Não Compareceu'}
                  </span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button 
              variant="outline" 
              onClick={() => handleAppointmentAction('cancel')}
              className="w-full sm:w-auto"
            >
              Cancelar Agendamento
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleAppointmentAction('reschedule')}
              className="w-full sm:w-auto"
            >
              Remarcar
            </Button>
            <Button 
              onClick={() => handleAppointmentAction('confirm')}
              className="w-full sm:w-auto bg-gold hover:bg-gold-dark text-white"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New Appointment Dialog */}
      <Dialog open={isNewAppointmentDialogOpen} onOpenChange={setIsNewAppointmentDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Novo Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Cliente</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Ana Silva</SelectItem>
                  <SelectItem value="2">Carlos Mendes</SelectItem>
                  <SelectItem value="3">Mariana Costa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Serviço</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um serviço" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="s1">Limpeza de Pele</SelectItem>
                  <SelectItem value="s2">Massagem Relaxante</SelectItem>
                  <SelectItem value="s3">Manicure</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Data</label>
                <Input 
                  type="text" 
                  value={format(selectedDate, "dd/MM/yyyy")} 
                  disabled
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Horário</label>
                <Input 
                  type="text" 
                  value={selectedTime || ""} 
                  disabled
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Observações</label>
              <Textarea 
                placeholder="Informações adicionais sobre o agendamento"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsNewAppointmentDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleCreateAppointment}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              Confirmar Agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AppointmentCalendar;
