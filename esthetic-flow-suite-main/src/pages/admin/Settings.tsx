
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const [generalSettings, setGeneralSettings] = useState({
    businessName: "Realle Estética",
    email: "contato@realle.com.br",
    phone: "(11) 99999-9999",
    address: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
    workingHours: "Segunda a Sexta: 09:00 - 19:00\nSábado: 09:00 - 14:00",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    appointmentReminders: true,
    marketingEmails: false,
  });

  const handleGeneralSettingsChange = (field: string, value: string) => {
    setGeneralSettings({
      ...generalSettings,
      [field]: value
    });
  };

  const handleNotificationToggle = (field: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: !notificationSettings[field as keyof typeof notificationSettings]
    });
  };

  const handleSaveSettings = (type: string) => {
    // Aqui seria a lógica para salvar as configurações no Supabase
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${type} foram atualizadas com sucesso.`,
    });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Configurações</h1>
        
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general">Geral</TabsTrigger>
            <TabsTrigger value="notifications">Notificações</TabsTrigger>
            <TabsTrigger value="system">Sistema</TabsTrigger>
          </TabsList>
          
          {/* Configurações Gerais */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>Informações do Estabelecimento</CardTitle>
                <CardDescription>
                  Estas informações aparecerão no site e nos e-mails enviados aos clientes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Nome do Estabelecimento</Label>
                  <Input 
                    id="businessName" 
                    value={generalSettings.businessName} 
                    onChange={(e) => handleGeneralSettingsChange("businessName", e.target.value)} 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={generalSettings.email} 
                      onChange={(e) => handleGeneralSettingsChange("email", e.target.value)} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input 
                      id="phone" 
                      value={generalSettings.phone} 
                      onChange={(e) => handleGeneralSettingsChange("phone", e.target.value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input 
                    id="address" 
                    value={generalSettings.address} 
                    onChange={(e) => handleGeneralSettingsChange("address", e.target.value)} 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="workingHours">Horário de Funcionamento</Label>
                  <Textarea 
                    id="workingHours" 
                    rows={3} 
                    value={generalSettings.workingHours} 
                    onChange={(e) => handleGeneralSettingsChange("workingHours", e.target.value)} 
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-gold hover:bg-gold-dark text-white"
                    onClick={() => handleSaveSettings("gerais")}
                  >
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configurações de Notificações */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Configure como e quando você deseja receber notificações.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por E-mail</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novos agendamentos por e-mail.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle("emailNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Notificações por SMS</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba notificações sobre novos agendamentos por SMS.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle("smsNotifications")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Lembretes de Agendamento</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba lembretes sobre agendamentos próximos.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.appointmentReminders}
                    onCheckedChange={() => handleNotificationToggle("appointmentReminders")}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">E-mails de Marketing</h3>
                    <p className="text-sm text-muted-foreground">
                      Receba novidades e promoções do estabelecimento.
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={() => handleNotificationToggle("marketingEmails")}
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-gold hover:bg-gold-dark text-white"
                    onClick={() => handleSaveSettings("notificação")}
                  >
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Configurações do Sistema */}
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
                <CardDescription>
                  Defina as configurações de funcionamento do sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="intervaloAgenda">Intervalo entre Agendamentos (minutos)</Label>
                  <Input 
                    id="intervaloAgenda" 
                    type="number" 
                    defaultValue="30" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Define o intervalo mínimo entre agendamentos consecutivos.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="diasAntecedencia">Dias de Antecedência Permitidos</Label>
                  <Input 
                    id="diasAntecedencia" 
                    type="number" 
                    defaultValue="30" 
                  />
                  <p className="text-sm text-muted-foreground">
                    Número máximo de dias no futuro para permitir agendamentos.
                  </p>
                </div>
                
                <div className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-medium">Modo de Manutenção</h3>
                    <p className="text-sm text-muted-foreground">
                      Desativa temporariamente o agendamento online para clientes.
                    </p>
                  </div>
                  <Switch defaultChecked={false} />
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-gold hover:bg-gold-dark text-white"
                    onClick={() => handleSaveSettings("sistema")}
                  >
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default Settings;
