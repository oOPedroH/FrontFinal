
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "./ServiceCard";
import { ServiceCategory, Service } from "@/types/services";

interface ServiceCategoryTabsProps {
  categories: ServiceCategory[];
  services: Service[];
}

const ServiceCategoryTabs = ({ categories, services }: ServiceCategoryTabsProps) => {
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  return (
    <Tabs defaultValue={categories[0].id} onValueChange={setActiveCategory}>
      <TabsList className="w-full justify-start overflow-auto mb-8 pb-2">
        {categories.map((category) => (
          <TabsTrigger 
            key={category.id} 
            value={category.id}
            className="data-[state=active]:bg-gold data-[state=active]:text-white"
          >
            {category.name}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {categories.map((category) => (
        <TabsContent key={category.id} value={category.id}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services
              .filter(service => service.categoryId === category.id)
              .map(service => (
                <ServiceCard
                  key={service.id}
                  id={service.id}
                  title={service.title}
                  description={service.description}
                  price={service.price}
                  duration={service.duration}
                  image={service.image}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default ServiceCategoryTabs;
