
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Appointment } from "@/types/client";

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
  type: 'appointment' | 'system' | 'alert';
  relatedId?: string;  // appointment ID, client ID, etc.
}

interface NotificationCenterProps {
  onAppointmentClick?: (appointmentId: string) => void;
}

const NotificationCenter = ({ onAppointmentClick }: NotificationCenterProps) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Novo Agendamento",
      message: "Ana Silva agendou Limpeza de Pele para hoje às 14:00.",
      time: "10 minutos atrás",
      unread: true,
      type: 'appointment',
      relatedId: 'apt-1'
    },
    {
      id: "2",
      title: "Lembrete",
      message: "Você tem 3 agendamentos amanhã.",
      time: "1 hora atrás",
      unread: false,
      type: 'system'
    },
  ]);

  // Simulate new notification arriving
  useEffect(() => {
    // This would be replaced with real-time updates from Supabase
    const simulateNewAppointment = setTimeout(() => {
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        title: "Novo Agendamento",
        message: "Mariana Costa agendou Drenagem Linfática para amanhã às 10:00.",
        time: "agora mesmo",
        unread: true,
        type: 'appointment',
        relatedId: 'apt-3'
      };
      
      setNotifications(prev => [newNotification, ...prev]);
      
      // Show toast alert
      toast({
        title: "Novo Agendamento",
        description: "Mariana Costa agendou Drenagem Linfática para amanhã às 10:00.",
      });
    }, 5000);  // Show after 5 seconds
    
    return () => clearTimeout(simulateNewAppointment);
  }, [toast]);

  const handleNotificationClick = (notification: Notification) => {
    // Mark as read
    setNotifications(prev => prev.map(n => 
      n.id === notification.id ? { ...n, unread: false } : n
    ));
    
    // If it's an appointment notification and we have a handler
    if (notification.type === 'appointment' && notification.relatedId && onAppointmentClick) {
      onAppointmentClick(notification.relatedId);
    }
    
    setIsOpen(false);
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    toast({
      title: "Notificações",
      description: "Todas as notificações foram marcadas como lidas.",
    });
  };
  
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => setIsOpen(true)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
        )}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle>Notificações</DialogTitle>
              {unreadCount > 0 && (
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={markAllAsRead}
                >
                  Marcar todas como lidas
                </Button>
              )}
            </div>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Não há notificações no momento.
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${notification.unread ? 'bg-muted' : ''} cursor-pointer hover:bg-muted/80`}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      {notification.title}
                      {notification.unread && (
                        <span className="h-2 w-2 rounded-full bg-red-500"></span>
                      )}
                    </h4>
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                  <p className="text-sm">{notification.message}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NotificationCenter;
