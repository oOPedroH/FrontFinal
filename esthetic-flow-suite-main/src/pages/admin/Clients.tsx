import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Client } from "@/types/client";
import { clientesAPI } from "@/lib/api";

// Tipo para os dados do banco
interface ClienteDB {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  nascimento: string | null;
  endereco: string | null;
  observacoes: string | null;
  criado_em: string | null;
  atualizado_em: string | null;
}

const Clients = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [isClientDialogOpen, setIsClientDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [clientForm, setClientForm] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
    birthdate: "",
    address: "",
    notes: ""
  });
  const [editingClientId, setEditingClientId] = useState<string | null>(null);

  // Carregar clientes ao iniciar
  const loadClients = async () => {
    try {
      setIsLoading(true);
      const data = await clientesAPI.listar();
      // Mapear os dados do banco para o formato do frontend
      const mappedClients = data.map((cliente: ClienteDB) => ({
        id: cliente.id,
        name: cliente.nome,
        email: cliente.email,
        phone: cliente.telefone,
        birthdate: cliente.nascimento || "",
        address: cliente.endereco || "",
        notes: cliente.observacoes || ""
      }));
      setClients(mappedClients);
    } catch (error) {
      console.error('Erro ao carregar clientes:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de clientes. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Carregar clientes quando o componente montar
  useEffect(() => {
    loadClients();
  }, []);

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone.includes(searchTerm)
  );

  const validateForm = () => {
    if (!clientForm.name?.trim()) {
      toast({
        title: "Erro",
        description: "O nome é obrigatório.",
        variant: "destructive",
      });
      return false;
    }
    if (!clientForm.email?.trim()) {
      toast({
        title: "Erro",
        description: "O e-mail é obrigatório.",
        variant: "destructive",
      });
      return false;
    }
    if (!clientForm.phone?.trim()) {
      toast({
        title: "Erro",
        description: "O telefone é obrigatório.",
        variant: "destructive",
      });
      return false;
    }
    // Validar formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(clientForm.email)) {
      toast({
        title: "Erro",
        description: "E-mail inválido.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleClientSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      // Mapear os dados do frontend para o formato do banco
      const clienteData = {
        nome: clientForm.name.trim(),
        email: clientForm.email.trim(),
        telefone: clientForm.phone.trim(),
        nascimento: clientForm.birthdate || null,
        endereco: clientForm.address?.trim() || null,
        observacoes: clientForm.notes?.trim() || null
      };

      if (editingClientId) {
        await clientesAPI.atualizar(editingClientId, clienteData);
      } else {
        await clientesAPI.criar(clienteData);
      }
      
      toast({
        title: editingClientId ? "Cliente Atualizado" : "Cliente Adicionado",
        description: `${clientForm.name} foi ${editingClientId ? "atualizado" : "adicionado"} com sucesso.`,
      });
      
      setIsClientDialogOpen(false);
      resetClientForm();
      loadClients(); // Recarregar a lista de clientes
    } catch (error: any) {
      console.error('Erro ao salvar cliente:', error);
      toast({
        title: "Erro",
        description: error.message || "Não foi possível salvar o cliente. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientChange = (field: keyof Client, value: string) => {
    setClientForm(prev => ({ ...prev, [field]: value }));
  };

  const resetClientForm = () => {
    setClientForm({
      name: "",
      email: "",
      phone: "",
      birthdate: "",
      address: "",
      notes: ""
    });
    setEditingClientId(null);
  };

  const editClient = (client: Client) => {
    setClientForm({
      name: client.name,
      email: client.email,
      phone: client.phone,
      birthdate: client.birthdate || "",
      address: client.address || "",
      notes: client.notes || ""
    });
    setEditingClientId(client.id);
    setIsClientDialogOpen(true);
  };

  // Função para criar novo agendamento para o cliente
  const createAppointmentForClient = (clientId: string) => {
    navigate('/admin/calendar', { state: { selectedClientId: clientId } });
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Clientes</h1>
          <Button 
            onClick={() => setIsClientDialogOpen(true)}
            className="bg-gold hover:bg-gold-dark text-white"
            disabled={isLoading}
          >
            Novo Cliente
          </Button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Client List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {isLoading ? (
                <div className="p-8 text-center text-muted-foreground">
                  Carregando...
                </div>
              ) : filteredClients.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  Nenhum cliente encontrado.
                </div>
              ) : (
                filteredClients.map(client => (
                  <div 
                    key={client.id}
                    className="p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => editClient(client)}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <div className="text-sm text-muted-foreground flex flex-col md:flex-row md:gap-4">
                          <span>{client.email}</span>
                          <span>{client.phone}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            createAppointmentForClient(client.id);
                          }}
                        >
                          Novo Agendamento
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gold text-gold hover:bg-gold/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            editClient(client);
                          }}
                        >
                          Editar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Client Dialog */}
      <Dialog open={isClientDialogOpen} onOpenChange={(open) => {
        if (!open) resetClientForm();
        setIsClientDialogOpen(open);
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingClientId ? "Editar Cliente" : "Adicionar Novo Cliente"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome Completo *</Label>
                <Input 
                  id="name" 
                  value={clientForm.name} 
                  onChange={(e) => handleClientChange("name", e.target.value)}
                  placeholder="Digite o nome completo"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="birthdate">Data de Nascimento</Label>
                <Input 
                  id="birthdate" 
                  type="date" 
                  value={clientForm.birthdate} 
                  onChange={(e) => handleClientChange("birthdate", e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={clientForm.email} 
                  onChange={(e) => handleClientChange("email", e.target.value)}
                  placeholder="Digite o e-mail"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone *</Label>
                <Input 
                  id="phone" 
                  value={clientForm.phone} 
                  onChange={(e) => handleClientChange("phone", e.target.value)}
                  placeholder="(00) 00000-0000"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Input 
                id="address" 
                value={clientForm.address} 
                onChange={(e) => handleClientChange("address", e.target.value)}
                placeholder="Digite o endereço completo"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea 
                id="notes" 
                value={clientForm.notes} 
                onChange={(e) => handleClientChange("notes", e.target.value)}
                placeholder="Digite observações sobre o cliente"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsClientDialogOpen(false)}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleClientSubmit}
              className="bg-gold hover:bg-gold-dark text-white"
              disabled={isLoading || !clientForm.name || !clientForm.email || !clientForm.phone}
            >
              {isLoading ? "Salvando..." : editingClientId ? "Salvar Alterações" : "Adicionar Cliente"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Clients;
