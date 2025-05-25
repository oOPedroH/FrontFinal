
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BeforeAfterItem {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

const results: BeforeAfterItem[] = [
  {
    id: "1",
    title: "Tratamento Facial Rejuvenescedor",
    beforeImage: "/lovable-uploads/79cf9c41-c4bc-46a0-95cc-02a2a0071292.png",
    afterImage: "/lovable-uploads/79cf9c41-c4bc-46a0-95cc-02a2a0071292.png",
    description: "Resultado após 3 sessões de tratamento facial rejuvenescedor. Melhoria significativa na textura e firmeza da pele."
  },
  {
    id: "2",
    title: "Limpeza de Pele Profunda",
    beforeImage: "/lovable-uploads/8fc67829-9b9a-4f03-a77f-97ca6558ae19.png",
    afterImage: "/lovable-uploads/8fc67829-9b9a-4f03-a77f-97ca6558ae19.png",
    description: "Resultado após 1 sessão de limpeza de pele profunda. Redução notável na oleosidade e nos poros dilatados."
  },
  {
    id: "3",
    title: "Tratamento Corporal",
    beforeImage: "/lovable-uploads/5f5b886e-6541-42e7-a81c-48e716b33fae.png",
    afterImage: "/lovable-uploads/5f5b886e-6541-42e7-a81c-48e716b33fae.png",
    description: "Resultado após 5 sessões de tratamento corporal. Redução significativa na celulite e melhoria no contorno corporal."
  }
];

const BeforeAfterGallery = () => {
  const [activeTab, setActiveTab] = useState(results[0].id);

  return (
    <Card className="border-gold/20">
      <CardContent className="p-6">
        <Tabs defaultValue={results[0].id} value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {results.map((result) => (
              <TabsTrigger 
                key={result.id} 
                value={result.id}
                className="data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                {result.title}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {results.map((result) => (
            <TabsContent key={result.id} value={result.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Antes</h3>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={result.beforeImage}
                      alt={`Antes - ${result.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Depois</h3>
                  <div className="aspect-square overflow-hidden rounded-lg">
                    <img 
                      src={result.afterImage}
                      alt={`Depois - ${result.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:col-span-2 mt-4">
                  <p className="text-center text-muted-foreground">{result.description}</p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BeforeAfterGallery;
