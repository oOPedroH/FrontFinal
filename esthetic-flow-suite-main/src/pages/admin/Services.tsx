
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Service, ServiceCategory } from "@/types/services";
import { serviceCategories, services } from "@/utils/mockData";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Image, Upload, Edit, Trash } from "lucide-react";
import ServiceImageUpload from "@/components/admin/ServiceImageUpload";

const Services = () => {
  const { toast } = useToast();
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [serviceForm, setServiceForm] = useState<Partial<Service>>({
    categoryId: "",
    title: "",
    description: "",
    fullDescription: "",
    price: "",
    duration: "",
    image: "/assets/marble-bg.png"
  });
  const [categoryForm, setCategoryForm] = useState<Partial<ServiceCategory>>({
    name: "",
    description: ""
  });
  const [editingService, setEditingService] = useState<string | null>(null);

  const handleServiceSubmit = () => {
    // Here would be the logic to save the service to Supabase
    toast({
      title: editingService ? "Serviço Atualizado" : "Serviço Adicionado",
      description: `O serviço "${serviceForm.title}" foi ${editingService ? "atualizado" : "adicionado"} com sucesso.`,
    });
    setIsServiceDialogOpen(false);
    resetServiceForm();
  };

  const handleCategorySubmit = () => {
    // Here would be the logic to save the category to Supabase
    toast({
      title: "Categoria Adicionada",
      description: `A categoria "${categoryForm.name}" foi adicionada com sucesso.`,
    });
    setIsCategoryDialogOpen(false);
    setCategoryForm({ name: "", description: "" });
  };

  const handleServiceChange = (field: keyof Service, value: string) => {
    setServiceForm(prev => ({ ...prev, [field]: value }));
  };

  const handleCategoryChange = (field: keyof ServiceCategory, value: string) => {
    setCategoryForm(prev => ({ ...prev, [field]: value }));
  };

  const resetServiceForm = () => {
    setServiceForm({
      categoryId: "",
      title: "",
      description: "",
      fullDescription: "",
      price: "",
      duration: "",
      image: "/assets/marble-bg.png"
    });
    setEditingService(null);
  };

  const editService = (service: Service) => {
    setServiceForm({
      categoryId: service.categoryId,
      title: service.title,
      description: service.description,
      fullDescription: service.fullDescription || "",
      price: service.price,
      duration: service.duration,
      image: service.image
    });
    setEditingService(service.id);
    setIsServiceDialogOpen(true);
  };

  const deleteService = (serviceId: string) => {
    // Here would be the logic to delete the service from Supabase
    toast({
      title: "Serviço Removido",
      description: "O serviço foi removido com sucesso.",
    });
  };

  const filteredServices = activeTab === "all" 
    ? services 
    : services.filter(service => service.categoryId === activeTab);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gerenciamento de Serviços</h1>
          <div className="flex gap-2">
            <Button 
              onClick={() => setIsCategoryDialogOpen(true)}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              Nova Categoria
            </Button>
            <Button 
              onClick={() => setIsServiceDialogOpen(true)}
              className="bg-gold hover:bg-gold-dark text-white"
            >
              Novo Serviço
            </Button>
          </div>
        </div>

        {/* Services Tabs and List */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            {serviceCategories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="overflow-hidden">
                  <div className="relative h-40">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <Button 
                        size="icon" 
                        variant="outline" 
                        className="bg-white h-8 w-8"
                        onClick={() => editService(service)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button 
                            size="icon" 
                            variant="outline" 
                            className="bg-white h-8 w-8"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          <div className="space-y-3">
                            <h4 className="font-medium">Confirmar exclusão</h4>
                            <p className="text-sm text-muted-foreground">
                              Tem certeza que deseja excluir o serviço "{service.title}"? Esta ação não pode ser desfeita.
                            </p>
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">Cancelar</Button>
                              <Button 
                                size="sm" 
                                onClick={() => deleteService(service.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                              >
                                Excluir
                              </Button>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg">{service.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {service.description}
                    </p>
                    <div className="flex justify-between mt-2 text-sm">
                      <span className="font-medium text-gold-dark">{service.price}</span>
                      <span>{service.duration}</span>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Categoria: {serviceCategories.find(c => c.id === service.categoryId)?.name}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Service Dialog */}
      <Dialog open={isServiceDialogOpen} onOpenChange={(open) => {
        if (!open) resetServiceForm();
        setIsServiceDialogOpen(open);
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Editar Serviço" : "Adicionar Novo Serviço"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-6 md:col-span-1">
              <div className="space-y-2">
                <Label htmlFor="title">Nome do Serviço</Label>
                <Input 
                  id="title" 
                  value={serviceForm.title} 
                  onChange={(e) => handleServiceChange("title", e.target.value)}
                  placeholder="Ex: Limpeza de Pele"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={serviceForm.categoryId} 
                  onValueChange={(value) => handleServiceChange("categoryId", value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecionar categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceCategories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrição Curta</Label>
                <Textarea 
                  id="description" 
                  value={serviceForm.description} 
                  onChange={(e) => handleServiceChange("description", e.target.value)}
                  placeholder="Breve descrição do serviço"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullDescription">Descrição Completa</Label>
                <Textarea 
                  id="fullDescription" 
                  value={serviceForm.fullDescription} 
                  onChange={(e) => handleServiceChange("fullDescription", e.target.value)}
                  placeholder="Descrição detalhada do serviço"
                  rows={4}
                />
              </div>
            </div>
            
            <div className="space-y-6 md:col-span-1">
              <ServiceImageUpload 
                currentImage={serviceForm.image || ""}
                onImageChange={(imageUrl) => handleServiceChange("image", imageUrl)}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input 
                    id="price" 
                    value={serviceForm.price} 
                    onChange={(e) => handleServiceChange("price", e.target.value)}
                    placeholder="R$ 0,00"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Duração</Label>
                  <Input 
                    id="duration" 
                    value={serviceForm.duration} 
                    onChange={(e) => handleServiceChange("duration", e.target.value)}
                    placeholder="Ex: 60 min"
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsServiceDialogOpen(false)}>Cancelar</Button>
            <Button 
              onClick={handleServiceSubmit}
              className="bg-gold hover:bg-gold-dark text-white"
              disabled={!serviceForm.title || !serviceForm.categoryId || !serviceForm.price || !serviceForm.duration}
            >
              {editingService ? "Salvar Alterações" : "Adicionar Serviço"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar Nova Categoria</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="categoryName">Nome da Categoria</Label>
              <Input 
                id="categoryName" 
                value={categoryForm.name} 
                onChange={(e) => handleCategoryChange("name", e.target.value)}
                placeholder="Ex: Estética Facial"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="categoryDescription">Descrição (opcional)</Label>
              <Textarea 
                id="categoryDescription" 
                value={categoryForm.description} 
                onChange={(e) => handleCategoryChange("description", e.target.value)}
                placeholder="Breve descrição da categoria"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>Cancelar</Button>
            <Button 
              onClick={handleCategorySubmit}
              className="bg-gold hover:bg-gold-dark text-white"
              disabled={!categoryForm.name}
            >
              Adicionar Categoria
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default Services;
