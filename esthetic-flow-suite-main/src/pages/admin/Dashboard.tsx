import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { DashboardStats, AppointmentWithDetails } from "@/types/admin";
import { dashboardAPI } from "@/lib/api";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<AppointmentWithDetails[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const estatisticas = await dashboardAPI.estatisticas();
        setStats({
          totalAppointments: estatisticas.agendamentosConcluidos + estatisticas.agendamentosHoje + estatisticas.proximosAgendamentos + estatisticas.agendamentosCancelados,
          upcomingAppointments: estatisticas.proximosAgendamentos,
          todayAppointments: estatisticas.agendamentosHoje,
          cancelledAppointments: estatisticas.agendamentosCancelados,
          totalClients: estatisticas.totalClientes,
        });
        const agendamentos = await dashboardAPI.agendamentosRecentes(5);
        setRecentAppointments(
          agendamentos.map((apt: any) => ({
            id: apt.id,
            date: apt.data,
            time: apt.hora,
            status:
              apt.status === 'agendado'
                ? 'scheduled'
                : apt.status === 'concluido'
                ? 'completed'
                : apt.status === 'cancelado'
                ? 'cancelled'
                : apt.status,
            client: {
              id: apt.cliente?.id || '',
              name: apt.cliente?.nome || '',
              email: apt.cliente?.email || '',
              phone: apt.cliente?.telefone || '',
            },
            service: {
              id: apt.servico?.id || '',
              title: apt.servico?.titulo || '',
              price: apt.servico?.preco || '',
            },
          }))
        );
      } catch (error: any) {
        toast({
          title: "Erro ao carregar dados do dashboard",
          description: error.message || "Ocorreu um erro ao buscar os dados.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [toast]);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button 
            onClick={() => navigate('/admin/calendar')}
            className="bg-gold hover:bg-gold-dark text-white"
          >
            Ver Agenda
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-l-4 border-l-gold">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Agendamentos</p>
                  <h3 className="text-2xl font-bold">{loading || !stats ? "-" : stats.totalAppointments}</h3>
                </div>
                <Calendar className="h-8 w-8 text-gold opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Agendamentos Futuros</p>
                  <h3 className="text-2xl font-bold">{loading || !stats ? "-" : stats.upcomingAppointments}</h3>
                </div>
                <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Agendamentos Hoje</p>
                  <h3 className="text-2xl font-bold">{loading || !stats ? "-" : stats.todayAppointments}</h3>
                </div>
                <Clock className="h-8 w-8 text-green-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Clientes</p>
                  <h3 className="text-2xl font-bold">{loading || !stats ? "-" : stats.totalClients}</h3>
                </div>
                <Users className="h-8 w-8 text-purple-500 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Appointments */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Agendamentos Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center text-muted-foreground py-8">Carregando...</div>
              ) : recentAppointments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">Nenhum agendamento recente encontrado.</div>
              ) : (
                recentAppointments.map((apt) => (
                  <div key={apt.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
                    <div>
                      <p className="font-medium">{apt.client?.name || "-"}</p>
                      <p className="text-sm text-muted-foreground">{apt.service?.title || "-"}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{apt.date ? `${apt.date.split('-').reverse().join('/')} ${apt.time ? ', ' + apt.time : ''}` : '-'}</p>
                      <p className={`text-sm ${apt.status === 'scheduled' ? 'text-amber-500' : apt.status === 'completed' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {apt.status === 'scheduled' ? 'Aguardando' : apt.status === 'completed' ? 'Confirmado' : 'Cancelado'}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-4 text-center">
              <Button 
                variant="outline" 
                onClick={() => navigate('/admin/calendar')}
                className="border-gold text-gold hover:bg-gold/10"
              >
                Ver Todos os Agendamentos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
